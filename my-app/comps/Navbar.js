import Link from "next/link";
const Navbar = () =>{ 
    return ( 
        <nav> 
            <div>
       <h1>Ninja List</h1> 
       </div> 
       <a>Ninja Listing</a>  
        <Link href="/ninjas">Ninja listing</Link>


        </nav>
    ); 

} 

export default Navbar;