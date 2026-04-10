'use client';
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useState } from "react"; 
import { doCredentialLogin } from "../../app/actions"; 



const Page = () => {    

  const router = useRouter(); 
  const [error, setError] = useState("");
   
    async function handleFormSubmit(event){ 
    event.preventDefault();  
    

    try{ 
      const formData = new FormData(event.currentTarget); 

      const response = await doCredentialLogin(formData); 

      if(!!response.error){  
        setError(response.error.message);

      } else {  
        router.push('/');

      }
    } catch(e){ 
      console.error(e); 
      setError(response.error.message);
    } 

     

    }
    return ( 
        <div> 
          
          <div  className="text-xl text-red-500">{error} </div>
         
        <form onSubmit={handleFormSubmit}>
      <label>Enter username:
        <input type="text" name="name" />
      </label> 

      <label>Enter password:
        <input name="password" password="password" />
      </label>  
      <button type = "submit">Login</button>  
    </form> 
     
      
      <Link href="/signup"><button>  register </button> </Link>
    
        </div>
    )
} 


export default Page;
