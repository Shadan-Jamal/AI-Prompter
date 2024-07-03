import React, { useState , useEffect} from 'react';
import Font, {Text} from 'react-font';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navbar from "./components/Navbar";

function App() {
  const [inputValue,setInputValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      setLoading(true);
      setPrompt(() => inputValue)
    }
  }

  useEffect(() => {

    // console.log(`before fetch ${loading}`);
    // setLoading(true);
    const fetchData = async () => {
      // console.log(`after fetch ${loading}`)
      if(prompt.length > 0 && inputValue.length > 0){
        // console.log(`inside if ${loading}`)
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

  },[prompt,setPrompt,loading])


  return (
    <>
    <Navbar />
    <div className='w-[90vw] leading-7 h-screen p-10'>
    <Font family='Dosis' weight={700}>
      <h1 className='text-4xl font-bold text-start tracking-widest text-white p-5'>Enter A Prompt. </h1>
      <div className='mb-3'>
        <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        className='w-3/4 text-[20px] text-white px-3 py-3 bg-transparent border-b-2 border-b-white focus:outline-none' 
        type="text" />
      </div>
      </Font>
      {loading ?
      <Text family='Dosis' className='bg-transparent tracking-[2.4px]text-[15px] px-4 py-2 font-light'> Loading...</Text>
      : <Text family='Dosis' className='bg-transparent tracking-[2.4px] text-wrap p-5 rounded-lg text-[15px] whitespace-pre-wrap px-4 py-2 border-l-2 border-l-slate-300 overflow-scroll font-light'>
      {output}
      </Text>
      }
    </div>
    </>
  )
}

export default App