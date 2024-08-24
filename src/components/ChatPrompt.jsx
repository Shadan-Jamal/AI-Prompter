import React, { useEffect, useState } from 'react'
import Font,{Text} from 'react-font';
import { RxCross1 } from "react-icons/rx";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { motion } from 'framer-motion'

function ChatPrompt({ setShowCard }) {
  const [input, setInput] = useState('')
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [genChatHistory, setGenChatHistory] = useState([{
    role: "user",
    parts: [{ text: "Hello." }],
  }]);
  const [viewChat,setViewChat] = useState([{}]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleSubmit = (e) => {
    if (e.code === "Enter") {
      setPrompt(input);
      setInput('');
      // console.log(genChatHistory);
    }
  }

  useEffect(() => {
    const generate = async () => {
      if(prompt){
        const chat = model.startChat({ history: genChatHistory });
        const question = await chat.sendMessage(prompt);
        const response = await question.response.text();
        setResult(() => response);

        setGenChatHistory((prev) => {
          return [...prev, {
            role: prev[prev.length - 1].role === "user" ? "model" : "user",
            parts: [{ text: prev[prev.length - 1].role === "user" ? result : prompt}],
          }];
        });

        setViewChat((prevChat) => {
          return [...prevChat, {question : prompt, answer : response}]
        });

        console.log("running after setResult");
        console.log(viewChat);

        // console.log(genChatHistory)
      }
    }

    if(prompt){
      generate();
    }
  }, [prompt])

  return (
    <>
    <Font family='Exo' weight={500}>
      <div className="w-screen h-screen bg-zinc-800 px-24 py-10 relative cursor-default">
        <motion.div
          className='absolute top-5 left-5 rounded-full p-3 hover:bg-zinc-700'>
          <RxCross1
            onClick={() => {
              setShowCard((prev) => {
                return { ...prev, cardTwo: false }
              })
            }}
            size={"22px"}
            className='text-white text-3xl' />
        </motion.div>

        <motion.div className="w-full bg-zinc-600/20 p-3 rounded-lg">
          <input
          placeholder='Ask away...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSubmit}
            className='bg-transparent w-full text-white hover:outline-none'
            type="text" />
        </motion.div>
        <motion.div className='w-full p-8'>
            {genChatHistory && viewChat.map((chat,index) => {
              return <div
              key={index}
              > 
                <h1
                className='text-white tracking-[2.4px] text-wrap text-[15px] whitespace-pre-wrap bg-slate-600/10 shadow-slate-100 shadow-sm px-4 py-3 mb-5 rounded-xl overflow-auto'
                >{`${chat.question}`}</h1>
                <h1
                className='text-white tracking-[2.4px] text-wrap text-[15px] whitespace-pre-wrap bg-slate-600/10 shadow-slate-100 shadow-sm px-4 py-3 mb-5 rounded-xl overflow-auto'
                >{`${chat.answer}`}</h1>
             </div>
            })}
        </motion.div>
      </div>
    </Font>
    </>
  )
}

export default ChatPrompt