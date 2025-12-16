
export default function PlaceImg({place,index=0}){
    if(!place.photos?.length){
        return '';
    }
    return(<>
            {place.photos.length > 0 && (
          <img
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            src={`${import.meta.env.VITE_API_URL}/uploads/` + place.photos[index]}
            alt={place.title}
          />
        )}
        </>
    )
}