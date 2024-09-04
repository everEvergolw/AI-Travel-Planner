import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTraverlesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '@/service/firebaseConfig';  

import { useNavigate } from 'react-router-dom'; 

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);

    const [openDialogg, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate(); 


    const handleInputChange = (name, value) => {



        setFormData({
            ...formData,
            [name]: value,

        })

    }

    useEffect(() => {



    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)

    })


    const OnGenerateTrip = async () => {


        const user = localStorage.getItem('user');

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays > 0 && !formData?.location || !formData?.budget || !formData?.traveler) {

            toast("Please fill all details!");
            console.log("Please fill all details!");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)





        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());

        setLoading(false);

        SaveAiTrip(result?.response?.text());

    }


    const GetUserProfile = (tokenInfo) => {

        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {

            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: `Application/json`

            }
        }).then((resp) => {

            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            OnGenerateTrip();

        })

    }

    const SaveAiTrip = async (TripData) => {

        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
    
        try {
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: JSON.parse(TripData),
                userEmail: user?.email,
                id: docId
            });
        } catch (error) {
            console.error("Failed to save trip:", error);
            // Log detailed error information
            if (error instanceof FirebaseError) {
                console.error("Error code:", error.code); 
                console.error("Error message:", error.message);
            }
        } finally {
            setLoading(false);
        }


        navigate('/view-trip/' + docId);


    };
    



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
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v) }

                        }}

                    />

                </div>

                <div>

                    <h2 className='text-xl my-3 font-medium'>

                        How many days are you planning your trip?

                    </h2>
                    <Input

                        placeholder={'Ex.3'}
                        type='number'
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}

                    />



                </div>


                <div>

                    <h2 className='text-xl my-3 font-medium'>

                        What is Your Budget?

                    </h2>

                    <div className='grid grid-cols-3 gap-5 mt-5'>

                        {SelectBudgetOptions.map((item, index) => (

                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
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

                        {SelectTraverlesList.map((item, index) => (

                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}

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

                <Button

                    disabled={loading}

                    onClick={OnGenerateTrip}>

                    {loading ?

                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
                        :

                        " Generate Trip"}

                </Button>

            </div>

            <Dialog open={openDialogg}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" />
                            <h2 className='font-bold text-lg mt-7'>
                                Sign In With Google

                            </h2>
                            <p>
                                Sign in to the App with Google authentication securely
                            </p>
                            <Button

                                onClick={login}

                                className="w-full mt-5 flex gap-4 items-center">




                                <FcGoogle className='w-7 h-7' />
                                Sign In With Google



                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default CreateTrip
