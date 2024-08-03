import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { motion } from 'framer-motion'
import CardTwo from './CardTwo';

function ChatPrompt({ setShowCard }) {
  const [input, setInput] = useState('')
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [chatHistory, setChatHistory] = useState([{
    role: "user",
    parts: [{ text: "Hello." }],
  }]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleSubmit = (e) => {
    if (e.code === "Enter") {
      setPrompt(input);
      setChatHistory((prev) => {
        return [...prev, {
          role: prev[prev.length - 1].role === "user" ? "model" : "user",
          parts: [{ text: prev[prev.length - 1].role === "user" ? result : prompt }],
        }];
      })
      console.log(chatHistory);
    }
  }

  useEffect(() => {
    const generate = async () => {
      const chat = model.startChat({ history: chatHistory });
      const question = await chat.sendMessage(prompt);
      setResult(() => question.response.text());
    }
    generate();
  }, [prompt])

  return (
    <>
      <div className="w-screen h-screen bg-zinc-800 p-24 relative">
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

        <motion.div className="w-full bg-zinc-600 p-6">
          <h2 className='text-white'>Enter a prompt</h2>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSubmit}
            type="text" />
        </motion.div>
        <motion.div className='w-full p-8'>
          <p className='text-red-500'>{result}</p>
        </motion.div>
      </div>
    </>
  )
}

export default ChatPrompt