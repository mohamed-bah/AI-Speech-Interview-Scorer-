import { NextRequest, NextResponse } from 'next/server';
async function getNinjas() { 

    const res = await fetch('https://jsonplaceholder.typicode.com/users'); 
    

    return res.json();
} 

export default async function page() {  

    const ninjas = await getNinjas()
    return ( 
        <div> 
            <h1>Ninjas</h1> 
            {ninjas.map(ninja =>  ( 
            
            <div key = {ninja.id}> 
            <a>  
                <h3>{ninja.name}</h3>
            </a>
             </div> 

            ))}
        </div>
    )
} 

export async function GET() {
  return new Response('Hello! You made a GET request.');
}

export async function POST(request) {
  const data = await request.json();
  return new Response(`Hello! You sent: ${JSON.stringify(data)}`);
}