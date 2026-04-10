import {OpenAI} from "openai"
import { attribute } from "../../../data/feedback";


export async function POST(req) {   
try{
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY || ''
  }); 


   
    const { messages } = await req.json() 
    console.log('messages:', messages);  
    console.log('KEY:', process.env.OPENAI_API_KEY);
     
    const completion = await openai.chat.completions.create({ 
    model: "gpt-4o-mini",
    messages: [ { role: "system",  
      content:  `
      -You can answer interview questions uniquely and honestly
        -You make sure that you answer the user interview question
         + "You only strictly answer interview questions based on user role and company they want a question for"  
         +"You strictly ask one question"
        + "When you answer you explain consisely how user can answer the question better" 
      + "the user only gets to answer one question" 
    + "He/She has two attempts to answer" 
  + " after each attempt you decide whether user passed the attempts or not " 
   + " after user two attempts you say END and give feedback for their overall performance consisely"  
   - feedback format response in the following JSON Object: ${JSON.stringify(attribute)}
   + "Strictly say feedback: Add your explantion here."  
   `
    } 
      ,...messages, 

    ],
    
  
    
  });    
  


   return new Response(JSON.stringify({ reply: completion.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch response from OpenAI" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
   
   
}  


}