'use client';

import Markdown from '@/components/markdown';
import { useChat } from 'ai/react';
import { Bot, Loader2, Send, User2 } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api:'api/genai'
  });
  const router = useRouter();
 
  return (
    <div className="w-full flex flex-col items-center mx-auto  min-h-screen p-8 mt-10 font-[family-name:var(--font-geist-sans)]">
      {RenderForm()}
      {RenderMessages()}
    </div>
  );
  function RenderForm(){
    return <form onSubmit={(event)=>{
      event.preventDefault();
      handleSubmit(event, {
        data:{
          prompt:input
        }
      })
    }} className="w-full h-full flex flex-row items-center gap-2">
      <input value={input} 
        onChange={handleInputChange} 
        type="text" 
        placeholder={ isLoading ? "Generating. . ." : "Ask Something. . ."} 
        disabled={isLoading}
        className="w-full border-b border-dashed outline-none py-4 px-6 text-black rounded-full placeholder:text-[#0842A099] text-right focus:placeholder-transparent shadow-sm
          disabled:bg-gray-200 disabled:placeholder:text-black
        " 
      />
      <button 
        type="submit" 
        className="rounded-full shadow-md border p-3 flex flex-row hover:opacity-55"
      >
        {isLoading ? <Loader2 className='animate-spin'/> : <Send /> }
      </button>
    </form>
  }
  function RenderMessages(){
    return <div id="chatbot" className='flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap'>
      {messages.map((item, index)=>(
        <div  className={`p-4 shadow-sm rounded-md ml-10 relative ${item.role === 'user' ? "text-blue-400 border border-blue-400" : "border border-orange-400 text-orange-400"}`} key={index}>
          <Markdown text={item.content}/>
          {item.role === 'user' ? <User2 className='absolute top-2 -left-10 border  rounded-full p-1 shadow-lg '/> : <Bot className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[orange] ${isLoading && index === messages.length - 1 ? "animate-bounce":"" } `}/>}
        </div>
      ))}
    </div>
  }
}
