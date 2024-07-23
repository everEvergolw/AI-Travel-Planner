import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTraverlesList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);


  const handleInputChange = (name,value) => {
  

    setFormData({
        ...formData,
        [name]:value,

    })

  }

  useEffect(()=>{



  },[formData])


  const OnGenerateTrip =() =>{
    if(formData?.noOfDays>5)
        {

            return;
        }


  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'> 
       
        <h2 className='font-bold text-3xl'>    
            Tell us your traverl preferences 🏕️🌴

        </h2>

        <p className='mt-3 text-gray-500 text-xl'>
            Just provide some basic infomation, and our trip planner will generate 
            a customized itinerary based on your preferences.


        </p>


        <div className='mt-20 flex flex-col gap-10'>

            <div>

                <h2 className='text-xl my-3 font-medium'>    

                    What is destination of choice? 

                </h2>

                    <GooglePlacesAutocomplete

                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps ={{
                            place,
                            onChange:(v) => {setPlace(v); handleInputChange('location',v)}

                        }}
                    
                    />

            </div>

            <div>

                <h2 className='text-xl my-3 font-medium'>    

                    How many days are you planning your trip?

                </h2>
                        <Input 
                        
                            placeholder={'Ex.3'}
                            type = 'number'
                            onChange={(e) =>handleInputChange('noOfDays',e.target.value)}
                            
                        />
                            
                        

            </div>
        
                         
                <div>

                    <h2 className='text-xl my-3 font-medium'>    

                        What is Your Budget? 
 
                    </h2>

                    <div className='grid grid-cols-3 gap-5 mt-5'> 
                        
                            {SelectBudgetOptions.map((item,index) =>(

                                <div key={index} 
                                     onClick={() => handleInputChange('budget',item.title)  }
                                     className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                     ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                                    
                                        <h2 className='text-3xl'>

                                            {item.icon}
                                            
                                        </h2>

                                        <h2 className='font-bold text-lg'>
                                         {item.title}

                                        </h2>

                                        <h2 className='text-sm text-gray-500'>
                                         {item.desc}

                                        </h2>


                                </div>


                            ))}

                        </div>    


                </div>

                     
                <div>

                    <h2 className='text-xl my-3 font-medium'>    

                            What do you plan on traverling with your next adventure?
                    </h2>

                    <div className='grid grid-cols-3 gap-5 mt-5'> 
                        
                            {SelectTraverlesList.map((item,index) =>(

                                <div key={index}
                                     onClick={() => handleInputChange('traverler',item.people)  }

                                     className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                        ${formData?.traverler == item.people && 'shadow-lg border-black'}`}>                                    
                                        <h2 className='text-3xl'>

                                            {item.icon}
                                            
                                        </h2>

                                        <h2 className='font-bold text-lg'>
                                         {item.title}

                                        </h2>

                                        <h2 className='text-sm text-gray-500'>
                                         {item.desc}

                                        </h2>


                                </div>


                            ))}

                        </div>    
                        


                </div>            
        </div>

                            
        <div className='mt-10 justify-end flex'>

            <Button onClick={OnGenerateTrip}> Generate Trip</Button>

        </div>

    </div>
  )
}

export default CreateTrip
