"use client";
import { useState, useEffect  } from 'react'; 
import { useRouter } from 'next/navigation';

const Page = () => { 

  const router = useRouter(); 

async function handlesubmit(e) {    
  e.preventDefault(); 
   

  try { 
    const formData = new FormData(e.currentTarget);  
    const name = formData.get('name');  
    const password =  formData.get('password') 

   
 
    const response = await fetch('/api/db', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ 
          name,  
          password
        })
      }); 

     
   
      response.status === 201 && router.push('/Login')
  } catch (er) {
      console.log(er.message);
    }
 

  

}

  


      

    
  
   


    return ( 
        <div> 
          

             <form onSubmit={handlesubmit} className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"> 

      <label>Enter username:
        <input type="text" name="name" id="name"
           />
      </label> 

      <label>Enter password:
        <input type="password" name="password" id="password"
          />
      </label>   
      <button type="Submit" className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36">Generate</button>
      
    </form> 
     
  
        </div>
    )
}; 

export default Page;


