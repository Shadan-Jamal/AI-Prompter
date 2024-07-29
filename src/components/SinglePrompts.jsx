import React,{useState, useEffect} from 'react';
import Font,{Text} from 'react-font';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion } from 'framer-motion';
import { BsArrowRight } from "react-icons/bs";
import Cursor from './Cursor';

function SinglePrompts({cursorSize,setCursorSize}) {

  const [inputValue,setInputValue] = useState({input_one : "",input_two : ""});
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [instruction,addInstruction] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({model : "gemini-1.5-flash" , systemInstruction : instruction});

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
    {/* <Cursor cursorSize={cursorSize} setCursorSize={setCursorSize}/> */}
    <motion.div
    onMouseEnter={() => setCursorSize({ w:"w-16", h:"h-16"})}
    className='w-full h-screen leading-7 pt-10 px-4'>
    <Font family='Dosis' weight={700}>
    <div className='grid grid-cols-2 place-content-center gap-9'>
        <div className='col-span-2 mb-4 flex flex-row justify-center items-center gap-1'>
          <div className='w-full'>
            <label 
            htmlFor="prompt" 
            className='text-4xl font-bold text-start tracking-widest text-white p-5'>Enter A Prompt. </label>
            <input
            id='prompt'
            value={inputValue.input_one}
            onChange={(e) => setInputValue((prevInput) => {
              return {...prevInput, input_one : e.target.value}
            })}
            // onKeyDown={(e) => handleKeyDown(e)}
            className='w-[80%] text-[20px] text-white px-3 py-3 bg-transparent border-b-2 border-b-white focus:outline-none' 
            type="text" />
          </div>

          <div className='w-full'>
            <label 
            htmlFor="instruction"
            className='text-4xl font-bold text-start tracking-widest text-white px-2'
            >Enter an Instruction for the prompt.</label>
            <input
            id='instruction'
            value={inputValue.input_two}
            onChange={(e) => setInputValue((prevInput) => {
                return {...prevInput, input_two : e.target.value}
            })}
            // onKeyDown={(e) => handleKeyDown(e)}
            className='w-[90%] text-[20px] text-white px-3 py-3 bg-transparent border-b-2 border-b-white focus:outline-none' 
            type="text" />
          </div>
        </div>

        <motion.div className='col-span-2 flex flex-row items-center justify-center relative'>
          <motion.button
          initial={{}} 
            onClick={handleKeyDown}
          className="absolute right-[53vw]">
            <BsArrowRight color='white' size={"40px"}/>
          </motion.button>
        </motion.div>
    </div>
    </Font>

      {loading ?
      <Text family='Dosis' className='bg-transparent tracking-[2.4px] text-[35px] px-4 py-2'> Loading...</Text>
      : output && <Text family='Dosis' className='bg-transparent tracking-[2.4px] max-w-[100vw] max-h-[550px] text-wrap text-[15px] whitespace-pre-wrap px-4 py-2 mt-[10vw] border-l-2 border-l-slate-300 overflow-auto font-light'>
      {output}
      </Text>
      }
    </motion.div>
      </>
  )
}

export default SinglePrompts