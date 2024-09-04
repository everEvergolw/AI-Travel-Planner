import React from 'react'
import { Button } from '../ui/button'
import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';

function Header() {


  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error) 

}) 


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
      window.location.reload(); 
  })

}


  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialogg, setOpenDialog] = useState(false);


  useEffect(() =>{
      console.log(user)
  }, [])

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>


            <img src='/logo.svg' onClick={()=>{
                        }} />

            <div>
                
                {user?
                <div className='flex items-center gap-3'> 
                    <Button variant="outline" className="rounded-full">My Trips</Button> 

                    
                      <Popover>
                        <PopoverTrigger>
                          <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/> 
 

                        </PopoverTrigger>
                        <PopoverContent><h2 className='cursor-pointer' onClick={()=>{
                          googleLogout();
                          localStorage.clear(); 
                          window.location.reload();
                        }}> Logout </h2></PopoverContent>
                      </Popover>

                </div> :  <Button onClick={() => setOpenDialog(true)} >Sign In</Button> 
              } 

 
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

export default Header
