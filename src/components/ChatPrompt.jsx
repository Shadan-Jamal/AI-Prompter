import React, { useEffect, useState } from 'react'
import Font from 'react-font';
import { RxCross1 } from "react-icons/rx";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { motion, AnimatePresence  } from 'framer-motion'
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
    if (e.keyCode === 13) {
      setPrompt(input);
      setInput('');
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
      }
    }

    if(prompt){
      generate();
    }
  }, [prompt])

  return (
    <>
    <Font family='Exo' weight={500}>
      <div className='w-screen h-screen py-10 mix-blend-difference flex justify-center items-center overflow-hidden'>
          <div className="w-full h-auto">
            <motion.div
            className='absolute top-[40px] left-0 lg:top-20 lg:left-3 rounded-full p-3 cursor-pointer'>
            <RxCross1
              onClick={handleClick}
              className='text-white lg:text-3xl' />
            </motion.div>

            {/* InputBox */}
            <motion.div
            className='w-[93dvw] lg:w-full fixed bottom-5 lg:bottom-10 px-5 lg:px-20 flex flex-row items-center h-12'>
                {inputBox ? 
                <motion.div
                className='rounded-l-lg bg-zinc-600 p-[2px]'
                onClick={() => closeInputBox(false)}>
                  <FaLongArrowAltLeft color='rgb(255 255 255 / 0.9)' size={'20px'}/>
                </motion.div> :
                
                <AnimatePresence>
                  <motion.div
                    initial={{scale : 0}}
                    animate={{scale : 1}}
                    exit={{scale : 0}}
                    >
                      <BsChatRightDots
                      size={'20px'} 
                      color='rgb(255 255 255 / 0.9)'
                      onClick={() => closeInputBox(true)}
                      />
                  </motion.div>
                  </AnimatePresence>}

              <AnimatePresence>
              {inputBox && 
                <motion.div 
                initial={{width : 0}}
                animate={{width : '100%'}}
                exit={{width : 0}}
                className="w-full bg-zinc-600 p-3 rounded-lg shrink-0 shadow-md shadow-zinc-700">
                  <input
                  placeholder='Ask away...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleSubmit}
                    className='bg-transparent w-full text-white hover:outline-none focus:outline-none'
                    type="text" />
                </motion.div>}
              </AnimatePresence>
            </motion.div>

            <motion.div className='w-full h-dvh lg:h-[580px] lg:mx-10 px-4 lg:px-24 lg:pb-24 overflow-y-scroll'>
                {viewChat.length>1 && viewChat.map((chat,index) => {
                  if(index!=0){
                    return <div
                    className='flex flex-col gap-5 my-4 lg:my-7'
                    key={index}
                    >
                      {/* Propmt  */}
                      <div className='flex flex-row gap-3 items-start'>
                        <FaRegUserCircle color='white' opacity={'0.8'} className='flex-shrink-0 text-base lg:text-2xl'/>
                        <h1
                        className='text-white tracking-[2.4px] text-wrap text-[12px] lg:text-[15px] whitespace-pre-wrap bg-slate-600/10 shadow-slate-100 shadow-sm px-3 lg:px-4 py-2 lg:py-3 rounded-lg max-h-[200px] overflow-auto'
                        >{chat.question}</h1>
                      </div>
                      {/* Response */}
                      <div className='flex flex-row gap-3 items-start'>
                        <RiRobot3Fill color='white' opacity={'0.5'} className='flex-shrink-0 text-base lg:text-2xl'/>
                        <h1
                        className='text-white tracking-[2.4px] text-wrap text-[12px] lg:text-[15px] whitespace-pre-wrap bg-slate-600/10 shadow-slate-100 shadow-sm px-3 lg:px-4 py-2 lg:py-3 rounded-lg max-h-[200px] overflow-auto'
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