import mongoose from "mongoose";

const BookingSchema=new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,ref:'Place',required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    numberOfGuests:{type:Number ,reuired:true},
    name:{type:String,required:true},
    phone:{type:String,required:true},
    price:{type:Number,required:true}


});

const BookingModel=mongoose.model('Booking',BookingSchema);
export default BookingModel;