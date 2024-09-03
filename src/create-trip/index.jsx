import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTraverlesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';

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


  const OnGenerateTrip = async() =>{ 



    if(formData?.noOfDays>0 && !formData?.location  || !formData?.budget  || !formData?.traveler)
        {       
            
            toast("Please fill all details!");
            console.log("Please fill all details!"); 
            return;
        }


        const FINAL_PROMPT = AI_PROMPT
                            .replace('{location}',formData?.location?.label)
                            .replace('{totalDays}',formData?.noOfDays)
                            .replace('{traveler}',formData?.traveler) 
                            .replace('{budget}',formData?.budget)
                            .replace('{totalDays}',formData?.noOfDays)




        console.log(FINAL_PROMPT); 

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());

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
                                     onClick={() => handleInputChange('traveler',item.people)  }

                                     className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                        ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>                                    
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
