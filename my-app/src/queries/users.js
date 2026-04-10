import { Item }  from "../model/Item";

export async function createUser(item){   
    try{ 
  const user = await Item.create(item)  
  return user;
    } catch(e){ 
        throw new Error (e.message)
    }
    
 }