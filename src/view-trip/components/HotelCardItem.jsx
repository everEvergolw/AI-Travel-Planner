import React from 'react'
import { Link } from 'react-router-dom';
import { GetPlaceDetails,PHOTO_REF_URL } from '@/service/GlobalApi';
import { useState } from 'react';
import { useEffect } from 'react';

function HotelCardItem({hotel}) {


    
    const[photoUrl,setPhotoUrl] = useState();

    useEffect(() =>{

        hotel&&GetPlacePhoto();


    },[hotel]) 

  const GetPlacePhoto = async () => {
    
    const data = {
        textQuery: hotel?.HotelName

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

    <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.HotelName
        +', ' + hotel?.HotelAddress}
     target='_blank'
    > 
    <div className='hover:scale-105 transition-all cursor-pointer '>  

        <img src={photoUrl? photoUrl : '/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
        <div className='my-2 flex flex-col gap-2'>  

            <h2 className='font-medium'> {hotel?.HotelName                            } </h2>  
            <h2 className='text-xs text-gray-500'> 📍 {hotel?.HotelAddress}  </h2>  
            <h2 className='text-sm  '>💵 {hotel?.Price}  </h2>
            <h2 className='text-sm'>⭐ {hotel?.Rating}  </h2>  


        </div>

    </div>
    </Link>
  )
}

export default HotelCardItem
