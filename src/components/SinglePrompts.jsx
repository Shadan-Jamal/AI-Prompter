import React,{useState, useEffect} from 'react';
import Font,{Text} from 'react-font';
import { RxCross1 } from "react-icons/rx";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion } from 'framer-motion';
import { BsArrowRight } from "react-icons/bs";
import { FaExclamation } from "react-icons/fa6";

function SinglePrompts({setCursorSize , setShowCard ,setPromptAppear}) {

  const [inputValue,setInputValue] = useState({input_one : "",input_two : ""});
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [instruction,addInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal,setModal] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({
    model : "gemini-1.5-flash",
    temperatute : 1.9, 
    systemInstruction : instruction});

    const handleClick = () =>{
      setPromptAppear(false);
      setShowCard((prev) => {
        return { ...prev, cardOne: false }
      });
    }

  const handleKeyDown = () => {
    console.log(inputValue);
      setLoading(true);
      setPrompt(() => inputValue.input_one)
      addInstruction(() => inputValue.input_two)
  }

  useEffect(() => {
    console.log(prompt);
    const fetchData = async () => {
      if(prompt.length > 0 && inputValue.input_one.length > 0){
        const result = await model.generateContent(prompt);
        const response = await result.response;
        setOutput(() => {
          const text = response.text();
          setLoading(false);
          console.log(text,loading);
          return text;
        });
      }
    }
    fetchData();

  },[prompt,setPrompt,loading]);

  console.log(inputValue);

  return (
    <>
    
    <motion.div
    onMouseEnter={() => setCursorSize({ w:"w-16", h:"h-16"})}
    className='w-full h-screen relative leading-7 pt-20 px-20 mix-blend-difference'>

      <motion.div
          className='absolute top-20 left-3 rounded-full p-3 cursor-pointer'>
          <RxCross1
            onClick={handleClick}
            size={"22px"}
            className='text-white text-3xl' />
      </motion.div>

    <Font family='Dosis' weight={700}>
    <div className='grid grid-cols-2 place-content-center gap-4'>
        <div className='col-span-2 mb-1 flex flex-row justify-between items-center gap-7'>
          {/* Input 1 */}
          <div className='w-full'>
            <input
            id='prompt'
            placeholder='Enter A Prompt..'
            value={inputValue.input_one}
            onChange={(e) => setInputValue((prevInput) => {
              return {...prevInput, input_one : e.target.value}
            })}
            // onKeyDown={(e) => handleKeyDown(e)}
            className='w-[100%] text-[20px] text-white px-1 py-3 bg-transparent border-b-2 border-b-white focus:outline-none' 
            type="text" />
          </div>

            {/* Input 2 */}
          <div className='w-full relative'>
            <input
            id='instruction'
            placeholder='Enter an Instruction for me..'
            value={inputValue.input_two}
            onChange={(e) => setInputValue((prevInput) => {
                return {...prevInput, input_two : e.target.value}
            })}
            // onKeyDown={(e) => handleKeyDown(e)}
            className='w-[100%] text-[20px] text-white px-1 py-3 bg-transparent border-b-2 border-b-white focus:outline-none' 
            type="text"/>
            <FaExclamation 
            color='white' 
            size={'20px'}
            onClick={() => setModal(!modal)} 
            className='absolute right-3 top-4 cursor-pointer'/>

            {modal && <motion.div
            transition={{ease : 'easeInOut'}}
            className='absolute right-0 top-14 bg-slate-800/50 p-3 rounded-lg -z-0'
            >
              <h1 className='text-sm text-wrap text-white font-extralight font-sans'>Use this prompt to specify the response behaviour of the bot..</h1>
              </motion.div>}
          </div>
        </div>
        
        <motion.div className=''>
          <motion.button 
            onClick={handleKeyDown}
          className="">
            <BsArrowRight color='white' size={"24px"}/>
          </motion.button>
        </motion.div>
    </div>
    </Font>

      {loading ?
      <Text family='Dosis' className='bg-transparent tracking-[2.4px] text-[35px] px-4 py-2'> Loading...</Text>
      : output && <Text family='Dosis' className='bg-transparent tracking-[2.4px] max-w-[100vw] max-h-[550px] text-wrap text-[15px] whitespace-pre-wrap px-4 py-2 mt-3 border-l-2 border-l-slate-300 overflow-auto font-light scrollbar'>
      {output}
      </Text>
      }
    </motion.div>
      </>
  )
}

export default SinglePrompts