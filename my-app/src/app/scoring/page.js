'use client'

import { useState } from 'react';   
import { attribute } from '../data/feedback';


export default function scoring(){



  
  
  
const [attribute, setJobText] = useState("")
 

async function getScoring(e){  
 e.preventDefault();   
const results = await fetch('/api/poke/create', {
    method: "POST", 
    headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify({messages: attribute.feedback}), 
});

  
setJobText(results.attribute);



}


    
   
   function handleChange(e) {
    setJobText(e.target.value);   
    
    
   }  

    

 
  

    return (  

      <div>  
 
       <h2>Back   </h2> 
       {attribute?.feedback && ( 
        <p>attribute.feedback</p> 
       
       )}
    
       

        <button onChange={handleChange} onClick={getScoring}>go</button>

      </div>

    )


  } 

