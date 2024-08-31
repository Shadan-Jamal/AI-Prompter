import React, { useEffect, useState } from 'react'
import Font from 'react-font';
import { RxCross1 } from "react-icons/rx";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { motion } from 'framer-motion'
import { FaRegUserCircle } from "react-icons/fa";
import { RiRobot3Fill } from "react-icons/ri";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BsChatRightDots } from "react-icons/bs";

function ChatPrompt({ setShowCard,setPromptAppear }) {
  const [input, setInput] = useState('')
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [inputBox,closeInputBox] = useState(true);
  const [genChatHistory, setGenChatHistory] = useState([{
    role: "user",
    parts: [{ text: "Hello." }],
  }]);
  const [viewChat,setViewChat] = useState([{}]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const handleClick = () =>{
    setPromptAppear(false);
    setShowCard((prev) => {
      return { ...prev, cardTwo: false }
    });
  }

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
      <div className='w-screen h-screen py-10 cursor-default mix-blend-difference'>
          <div className="w-full h-auto relative">
            <motion.div
              className='w-fit rounded-full p-3 absolute top-10 left-5'>
              <RxCross1
                onClick={handleClick}
                size={"22px"}
                className='text-white text-3xl' />
            </motion.div>

            <motion.div
            className='w-full fixed bottom-10 px-20 flex flex-row items-center'>
              {inputBox ? 
              <motion.div className='rounded-l-lg bg-zinc-600/60 p-[2px]'
              onClick={() => closeInputBox(false)}>
                <FaLongArrowAltLeft color='rgb(255 255 255 / 0.9)' size={'20px'}/>
              </motion.div> :
              <div>
                <BsChatRightDots
                size={'20px'} 
                color='rgb(255 255 255 / 0.9)'
                onClick={() => closeInputBox(true)}
              />
            </div>
            }
              {inputBox && <motion.div className="w-full bg-zinc-600/60 p-3 rounded-lg shrink-0">
                <input
                placeholder='Ask away...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleSubmit}
                  className='bg-transparent w-full text-white hover:outline-none focus:outline-none'
                  type="text" />
              </motion.div>}
            </motion.div>

            <motion.div className='w-full px-24'>
                {viewChat.length>1 && viewChat.map((chat,index) => {
                  if(index!=0){
                    return <div
                    className='flex flex-col gap-5 my-7'
                    key={index}
                    > 
                    <div className='flex flex-row gap-3 items-start'>
                      <FaRegUserCircle size={'24px'} color='white' opacity={'0.8'} className='flex-shrink-0'/>
                      <h1
                      className='text-white tracking-[2.4px] text-wrap text-[15px] whitespace-pre-wrap bg-slate-600/10 shadow-slate-100 shadow-sm px-4 py-3 rounded-xl overflow-auto'
                      >{chat.question}</h1>
                    </div>
      
                    <div className='flex flex-row gap-3 items-start'>
                      <RiRobot3Fill size={'24px'} color='white' opacity={'0.5'} className='flex-shrink-0'/>
                      <h1
                      className='text-white tracking-[2.4px] text-wrap text-[15px] whitespace-pre-wrap bg-slate-600/10 shadow-slate-100 shadow-sm px-4 py-3 rounded-xl overflow-auto'
                      >{chat.answer}</h1>
                    </div>
                  </div>
                  }})}
            </motion.div>
          </div>
      </div>
    </Font>
    </>
  )
}

export default ChatPrompt