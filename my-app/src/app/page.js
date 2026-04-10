"use client";
import Image from "next/image"; 
import styles from "./page.module.css";
import Link from "next/link";   
import Head from "next/head"
import Navbar from "../../comps/Navbar"; 
import { useState } from 'react'; 
import { redirect} from "next/navigation"; 
import Transcript from '../components/ui/transcript'
import AudioManager from '../components/ui/audio-manager'
import { useTranscriber } from '../hooks/useTranscriber' 
import { Progress } from '../components/ui/progress' 
import createChatCompletion  from "../app/complete";
import { content } from "../../tailwind.config"; 
import RteEditor from "../components/ui/RteEditor" 





export default function Home() {   
  
  const transcriber = useTranscriber()  
   const output = transcriber.output 

  

  
 
  const [message, setJobText] = useState("")
  const [messages, setQuestions] = useState([])  
  
  

    async function onGenerate(e){  
  e.preventDefault();   
  if (!message.trim()) return;

     const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: message, 
      
      },
    ];   

    setQuestions(updatedMessages);
    setJobText("");
    
 try {
  const results = await fetch('/api/poke/create', {
    method: "POST", 
    headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify({messages: updatedMessages}), 
});

  const data = await results.json(); 
   

      if (results.ok) {
        setQuestions([...updatedMessages, { role: "assistant", content: data.reply }]);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } 

 
  
}; 
    






     function handleChange(e) {
    setJobText(e.target.value);   
    
    
   }  

 

  
  return ( 

        



    <section className='py-24'>  

   
         <form className="myform"> 

         
     
   

  <h2>Paste job description</h2> 
   
  
    
   
    
   <textarea  value={output?.text} onChange={handleChange} rows={10} cols={50}/>
 
  </form> 



       

<form className="descrip"> 
  <h2>Interview questions</h2>   

  
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded ${
                msg.role === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
            </div>
          ))}
        </div>
 

  <button type="button" onClick={onGenerate}>Generate</button> 
<a href="http://localhost:3000/scoring">Link</a>


</form>  
      <div className='container max-w-7xl'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex-1'>
            <h1 className='text-5xl font-extrabold tracking-tight sm:text-7xl'>
              Whisper
            </h1>
            <p className='mt-1 ml-3'>Audio to text transcription</p>
          </div>

          <div className='flex-1'>
            <div className='flex items-center justify-between text-sm font-medium'>
              <span>
                {transcriber.modelLoadingProgress === 0 && `Model not loaded`}
                {transcriber.isModelLoading && `Loading model`}
                {transcriber.modelLoadingProgress === 100 && `Model ready`}
              </span>
              <span>{transcriber.modelLoadingProgress}%</span>
            </div>

            <Progress
              className='mt-1 w-full rounded-lg'
              value={transcriber.modelLoadingProgress}
              max={100} 
            />
          </div>
        </div>

        <div className='mt-8 flex flex-col gap-6 sm:flex-row'>
          <AudioManager transcriber={transcriber} />
        
        </div>
      </div>
    </section>
  )
     

    
    
    } 

 
