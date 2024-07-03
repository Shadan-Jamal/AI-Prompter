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
      setPrompt(() => inputValue)
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      // prompt.length > 0 ? setLoading(true) : setLoading(false);
      console.log(prompt);

      if(prompt.length > 0 && inputValue.length > 0){
        const result = await model.generateContent(prompt);
        const response = await result.response;
        // console.log(response.text());
        setOutput(() => {
          const text = response.text();
          return text.split('')
        });
      }
    }
    console.log(output);
    fetchData();

  },[prompt,setPrompt])


  return (
    <>
    <Navbar />
    <div className='w-[70vw] leading-7 h-screen p-10'>
    <Font family='Dosis' weight={700}>
      <h1 className='text-4xl font-bold text-start tracking-widest text-white p-5 .playwrite-es-deco-textfont'>Enter A Prompt. </h1>
      <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
      className='w-3/4 text-[20px] text-white px-3 py-3 bg-transparent border border-white rounded-full' 
      type="text" />
      </Font>
      <Text family='Dosis' className='bg-transparent tracking-[2.4px] max-w-full max-h-[200px] text-wrap p-5 rounded-lg text-[15px]'>
        {output}
      </Text>
      </div>
    </>
  )
}

export default App