import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/mongodb";
import {createUser}  from "../../../queries/users"; 
import bcrypt from "bcryptjs";

export const POST = async (request) => { 
  const {name, password} = await request.json(); 

  console.log( name, password);

  await dbConnect();


  const hashedPassword = await bcrypt.hash(password, 10) 

  const newUser = { 
    name, 
    password: hashedPassword

  } 

  try{ 
    await createUser(newUser); 

  } catch (error){ 
    return new NextResponse(error.message, { 
      status: 500,
    });
  } 
   
  return new NextResponse("User has been created", {  
    status: 201,

  });


}