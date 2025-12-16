import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/generative-ai'; // CORRECTED IMPORT

import UserModel from './models/user.js';
import PlaceModel from './models/places.js';
import BookingModel from './models/Booking.js';

// ---------------------- Setup ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const server = express();
const jwtSecret = 'hebfrwbvwvhniobvoitgrvnruie';

// Initialize Google AI
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ FATAL ERROR: GEMINI_API_KEY is not defined in .env file.");
    process.exit(1); // Stop the server if the key is missing
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------- Middleware -----------------
server.use(cookieParser());
server.use(cors({ credentials: true, origin: "http://localhost:5174" }));
server.use(express.json());
server.use('/uploads', express.static(__dirname + '/uploads'));

// ---------------------- Nodemailer Setup -----------
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ---------------------- DB Connection --------------
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Error connecting to MongoDB:", err));

// ---------------------- Helpers --------------------
function getUserFromToken(req) {
    const { token } = req.cookies;
    if (!token) return null;
    try {
        return jwt.verify(token, jwtSecret);
    } catch {
        return null;
    }
}

// ---------------------- Routes ---------------------
server.get('/test', (req, res) => res.json('Helloooo'));

// ---- Auth ----
server.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });
        res.json(user);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(422).json({
                error: "This email address is already in use. Please log in or use a different email."
            });
        }
        console.error("❌ Register error:", err);
        res.status(500).json({ error: "Registration failed due to a server error." });
    }
});


server.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDoc = await UserModel.findOne({ email });
        if (!userDoc) return res.status(404).json({ error: "User not found" });

        const passOk = await bcrypt.compare(password, userDoc.password);
        if (!passOk) return res.status(422).json('pass not ok');

        jwt.sign(
            { email: userDoc.email, id: userDoc._id, name: userDoc.name },
            jwtSecret,
            {},
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false,
                }).json(userDoc);
            }
        );
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Failed to login" });
    }
});

server.get('/profile', (req, res) => {
    const user = getUserFromToken(req);
    res.json(user || null);
});

server.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 0,
    }).json(true);
});

// ---- File Uploads ----
server.post('/upload-by-link', async (req, res) => {
    try {
        const { link } = req.body;
        const newName = Date.now() + '.jpg';
        await imageDownloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
        });
        res.json(newName);
    } catch (err) {
        console.error("❌ Upload by link error:", err);
        res.status(500).json({ error: "Failed to upload" });
    }
});

const photosMiddleware = multer({ dest: 'uploads/' });
server.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    try {
        for (let i = 0; i < req.files.length; i++) {
            const { path: filePath, originalname } = req.files[i];
            const ext = path.extname(originalname);
            const newPath = filePath + ext;
            fs.renameSync(filePath, newPath);
            uploadedFiles.push(path.basename(newPath));
        }
        res.json(uploadedFiles);
    } catch (err) {
        console.error("❌ Upload error:", err);
        res.status(500).json({ error: "Failed to upload files" });
    }
});

// ---- Places ----
server.post('/places', async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Invalid or expired token' });

    try {
        const placeDoc = await PlaceModel.create({
            owner: user.id,
            ...req.body,
            photos: req.body.addedPhotos,
        });
        res.json(placeDoc);
    } catch (err) {
        console.error("❌ Error creating place:", err);
        res.status(500).json({ error: "Failed to create place" });
    }
});

server.get('/user-places', async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Invalid or expired token' });

    try {
        const places = await PlaceModel.find({ owner: user.id });
        res.json(places);
    } catch (err) {
        console.error("❌ Error fetching places:", err);
        res.status(500).json({ error: "Failed to fetch places" });
    }
});

server.get('/places/:id', async (req, res) => {
    try {
        const place = await PlaceModel.findById(req.params.id);
        res.json(place);
    } catch (err) {
        console.error("❌ Error fetching place:", err);
        res.status(500).json({ error: "Failed to fetch place" });
    }
});

server.put('/places', async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Invalid or expired token' });

    try {
        const placeDoc = await PlaceModel.findById(req.body.id);
        if (user.id !== placeDoc.owner.toString()) {
            return res.status(403).json({ error: "You are not allowed to update this place" });
        }
        placeDoc.set({
            ...req.body,
            photos: req.body.addedPhotos,
        });
        await placeDoc.save();
        res.json(placeDoc);
    } catch (err) {
        console.error("Update failed ❌", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

server.get('/places', async (req, res) => {
    try {
        const { destination } = req.query;

        if (destination && destination.trim() !== '') {
            console.log(`🔍 Searching for destination: "${destination}"`);
            const filter = {
                $or: [
                    { title: { $regex: destination, $options: 'i' } },
                    { address: { $regex: destination, $options: 'i' } }
                ]
            };
            const places = await PlaceModel.find(filter);
            return res.json(places);
        }

        console.log('🔍 No search term, fetching all places.');
        const places = await PlaceModel.find();
        return res.json(places);

    } catch (err) {
        console.error("❌ Error fetching places:", err);
        res.status(500).json({ error: "Failed to fetch places" });
    }
});

// ---- Bookings ----
server.post('/bookings', async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Invalid or expired token' });

    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

    try {
        const existingBooking = await BookingModel.findOne({
            place: place,
            user: user.id,
            $or: [
                { checkIn: { $lt: checkOut, $gte: checkIn } },
                { checkOut: { $lte: checkOut, $gt: checkIn } }
            ]
        });

        if (existingBooking) {
            console.log('🚫 Duplicate booking attempt prevented.');
            return res.status(409).json({ error: 'You have already booked this place for these dates.' });
        }

        const bookingDoc = await BookingModel.create({
            place, user: user.id, checkIn, checkOut, numberOfGuests, name, phone, price
        });

        try {
            const placeDoc = await PlaceModel.findById(place).populate('owner');
            const guestDoc = await UserModel.findById(user.id);

            if (!placeDoc || !guestDoc || !placeDoc.owner) {
                console.error('Could not find place, guest, or owner for email confirmation.');
            } else {
                const hostEmail = placeDoc.owner.email;
                const guestEmail = guestDoc.email;
                const formattedCheckIn = new Date(checkIn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                const formattedCheckOut = new Date(checkOut).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

                await transporter.sendMail({
                    from: `"Booking App" <${process.env.EMAIL_USER}>`,
                    to: guestEmail,
                    subject: 'Your Booking is Confirmed!',
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h1>Booking Confirmed!</h1>
                            <p>Hi ${guestDoc.name},</p>
                            <p>Your booking for <strong>${placeDoc.title}</strong> is confirmed.</p>
                            <h3>Booking Details:</h3>
                            <ul>
                                <li><strong>Check-in:</strong> ${formattedCheckIn}</li>
                                <li><strong>Check-out:</strong> ${formattedCheckOut}</li>
                                <li><strong>Total Price:</strong> $${price}</li>
                            </ul>
                            <p>You can contact your host, ${placeDoc.owner.name}, at: <strong>${hostEmail}</strong></p>
                        </div>
                    `
                });

                await transporter.sendMail({
                    from: `"Booking App" <${process.env.EMAIL_USER}>`,
                    to: hostEmail,
                    subject: 'New Booking for your place!',
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h1>You have a new booking!</h1>
                            <p>A guest has booked your place: <strong>${placeDoc.title}</strong>.</p>
                            <h3>Guest Details:</h3>
                            <ul>
                                <li><strong>Name:</strong> ${name}</li>
                                <li><strong>Email:</strong> ${guestEmail}</li>
                                <li><strong>Check-in:</strong> ${formattedCheckIn}</li>
                                <li><strong>Check-out:</strong> ${formattedCheckOut}</li>
                            </ul>
                        </div>
                    `
                });
                console.log('✅ Confirmation emails sent successfully.');
            }
        } catch (emailError) {
            console.error("❌ Failed to send confirmation emails:", emailError);
        }

        res.json(bookingDoc);

    } catch (err) {
        console.error("❌ Error creating booking:", err);
        res.status(500).json({ error: "Failed to create booking" });
    }
});

server.get('/bookings', async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Invalid or expired token' });

    try {
        res.json(await BookingModel.find({ user: user.id }).populate('place'));
    } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

server.delete('/bookings/:id', async (req, res) => {
    const user = getUserFromToken(req);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    try {

        const bookingDoc = await BookingModel.findById(id).populate({
            path: 'place',
            populate: {
                path: 'owner'
            }
        }).populate('user');

        if (!bookingDoc) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        if (bookingDoc.user._id.toString() !== user.id) {
            return res.status(403).json({ error: 'You are not authorized to cancel this booking' });
        }

        try {
            const hostEmail = bookingDoc.place.owner.email;
            const guestEmail = bookingDoc.user.email;
            const formattedCheckIn = new Date(bookingDoc.checkIn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            await transporter.sendMail({
                from: `"Booking App" <${process.env.EMAIL_USER}>`,
                to: guestEmail,
                subject: 'Your Booking has been Cancelled',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h1 style="color: #d9534f;">Booking Cancelled</h1>
                        <p>Hi ${bookingDoc.user.name},</p>
                        <p>This is a confirmation that your booking for <strong>${bookingDoc.place.title}</strong> starting on ${formattedCheckIn} has been successfully cancelled.</p>
                        <p>We hope to see you again soon!</p>
                    </div>
                `
            });

            await transporter.sendMail({
                from: `"Booking App" <${process.env.EMAIL_USER}>`,
                to: hostEmail,
                subject: `A Booking for your place has been Cancelled`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h1 style="color: #f0ad4e;">Booking Cancellation Notice</h1>
                        <p>Hi ${bookingDoc.place.owner.name},</p>
                        <p>The booking for your place, <strong>${bookingDoc.place.title}</strong>, made by ${bookingDoc.user.name} for a check-in on ${formattedCheckIn} has been cancelled.</p>
                        <p>Your calendar has been updated accordingly.</p>
                    </div>
                `
            });
            console.log('✅ Cancellation emails sent successfully.');
        } catch (emailError) {
            console.error("❌ Failed to send cancellation emails:", emailError);
        }

        await BookingModel.findByIdAndDelete(id);

        res.json({ message: 'Booking cancelled successfully' });

    } catch (err) {
        console.error("❌ Error cancelling booking:", err);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
});
server.post('/chat', async (req, res) => {
    console.log('🤖 /chat endpoint hit');
    try {
        const { prompt } = req.body;
        // --- THE FINAL FIX: Use the correct and stable model name ---
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

        console.log('📚 Fetching places for context...');
        const places = await PlaceModel.find({});
        const placesContext = places.map(p => `Name: ${p.title}, Description: ${p.description}, Address: ${p.address}, Price: $${p.price} per night`).join('\n');

        const enhancedPrompt = `
            You are a friendly and helpful travel assistant for a website called "Booking App".
            Your goal is to suggest places to stay based on the user's preferences.
            Use the following list of available places as your ONLY source of information. Do not invent places or details.
            If a user asks for something that isn't on the list, politely say you couldn't find a match and suggest something else from the list.
            When you suggest a place, be conversational. Mention its name and why it's a good fit for the user's request. Keep your answers concise and helpful.

            Here are the available places:
            ---
            ${placesContext}
            ---

            User's request: "${prompt}"
        `;

        console.log('🧠 Generating content from Gemini...');
        const result = await model.generateContent(enhancedPrompt);
        const response = result.response;
        const text = response.text();
        
        // Send the complete response at once
        res.send(text);
        console.log('✅ AI Response sent.');

    } catch (error) {
        console.error("❌ AI Chat Error:", error);
        res.status(500).send("Sorry, I'm having trouble connecting to the AI assistant right now.");
    }
});
server.listen(4000, () => console.log('Server is listening at 4000'));

