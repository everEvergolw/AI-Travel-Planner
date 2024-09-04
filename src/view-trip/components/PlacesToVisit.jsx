import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {





  return (


    <div >

      <h2 className='font-bold text-lg'> Places to Visit </h2>

      <div>

        {trip?.tripData?.Itinerary?.map((item, index) => (

            <div key={index}>
              <h2 className='font-medium text-lg'>Day {item.Day} </h2>

              <div className='grid md:grid-cols-2 '>

                {item.DayPlan.map((place, index) => (
                  <div key={index}>

                    <h2 className='font-medium text-sm text-orange-600'>{item.BestTime} </h2>
                    <PlaceCardItem place={place} />
                
                  </div>

                  ))}

               </div>



            </div>
        ))}


      </div>


    </div>
  )
}

export default PlacesToVisit
