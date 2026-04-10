import { Inter } from "next/font/google";  
import "./globals.css";
import dbConnect from "../../lib/mongodb";

const inter = Inter ({subsets: ["latin"]});  

export const metadata = { 
    title: "Next-Auth V5 - TypeScript", 
    description: "Learn next-auth" 

}; 

export default async function RootLayout({children}) { 
    await dbConnect()  

    


    return ( 
     <html lang="en">
      <body className={inter.className}>{children}</body>
    </html> 
);  


} 


