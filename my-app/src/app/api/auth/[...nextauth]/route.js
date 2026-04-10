import NextAuth from 'next-auth'  
import { Item } from "../../../../model/Item";  
import Credentials from "next-auth/providers/credentials";
import dbConnect from '../../../../lib/mongodb'; 
import { CredentialsSignin } from 'next-auth'; 
import { ZodError } from "zod"; 


class CustomAuthError extends CredentialsSignin {
   constructor(code) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { 
    handlers: {GET, POST}, 
    auth, 
    signIn, 

}

= NextAuth ({  
    session: { 
        strategy: 'jwt',
    },

 

providers: [  
    Credentials({  
    
     credentials: { 
        password: {label: "Password", type: "password"},
    name: {label: "name", type: "text" },
    
   
    
     
    
           
            
        },  
 
                       

         async authorize (credentials) {   
            
        
             if(credentials === null) return null;  
             const {name, password} = credentials;
              await dbConnect()  
        
                
           
                try {   
                     

                    const user = await Item.findOne({  
                        name
                        
                    
                    }); 
                    
                    
                        
    
                    if(user) 
                        {  
                            const isMatch = await user.comparePassword(password);
                   
                        if(!isMatch) { 
                             throw new CustomAuthError("Invalid Password")

                        } 
                         
                       
                        
                            else{ return user; 
                            } 
                        }
                    

                     

                } catch (error) {
                if (error instanceof ZodError) throw new CustomAuthError("Invalid Credentials");
                throw new CustomAuthError(error.message);
        } 
        
        

            },   
        
    }), 
    

        


        ],   
        
        
     
     secret: "jCY9cC05B8Ps1l4K5gi0FH0Xamw1ZqpKyCjPQNzFCpk",
     pages: {  

        signIn: "/" 

     },  
    
    

    
        
        
      
});

           
        
        

    