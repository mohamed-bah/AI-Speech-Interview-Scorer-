'use client'; 

import { signIn } from "next-auth/react"

export async function doCredentialLogin(formData){ 
    try{ 
         const response = await signIn("credentials", {  
        name: formData.get('name'), 
        password: formData.get('password'),  
    
        
        redirect: false


      });  
       return response;
    } catch(err){ 
        throw err;
    }  
    
     
    
      
}
