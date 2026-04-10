


export default async function createChatCompletion(messages) {
  const response = await fetch('/api/poke/create/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
   
   body: JSON.stringify({
      messages,
    }),
    
  });
  return response.json();
}