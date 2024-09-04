import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {

  return (
    <div>

        <h2 className='font-bold text-xl mt-5'> Hotels Recommendation </h2>
       
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 '> 

                {trip?.tripData?.hotelsOptions?.map((hotel, index) =>(  
                    
                    <HotelCardItem hotel={hotel} key={index}/> 


                ))}


        </div>

    </div>
  )
}

export default Hotels
