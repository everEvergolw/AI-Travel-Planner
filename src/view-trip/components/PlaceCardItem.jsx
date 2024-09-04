import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails,PHOTO_REF_URL } from '@/service/GlobalApi';
import { useState } from 'react';
import { useEffect } from 'react';

function PlaceCardItem({place}) {


    
  const[photoUrl,setPhotoUrl] = useState();

  useEffect(() =>{

    place&&GetPlacePhoto();


  },[place]) 

const GetPlacePhoto = async () => {
  
  const data = {
      textQuery: place?.placeName

  }

  const result = await GetPlaceDetails(data).then( resp =>{
      console.log(resp.data.places[0].photos[3])
      
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      console.log(PhotoUrl)
      setPhotoUrl(PhotoUrl) 
  }


  )

}


  return (

    <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}&${place.GeoCoordinates
.latitude}&${place.GeoCoordinates.longitude}`} 
     target='_blank'
    > 

    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 
        transition-all hover:shadow-md cursor-pointer
    '>  

        <img src={photoUrl? photoUrl : '/placeholder.jpg'} className='w-[130px] h-[130px] rounded-xl' />

        <div>

            <h2 className='font-bold text-lg'> {place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails} </p>
            <h2 className='mt-2'>🕙 {place.timeTravel}</h2>
            <Button size="sm"> <FaMapLocationDot /> </Button>  
        </div>


    </div>

    </Link>
  )
}

export default PlaceCardItem
