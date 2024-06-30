import React, { useState , useEffect} from 'react';
import Font, {Text} from 'react-font';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [inputValue,setInputValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

  
  useEffect(() => {

    const fetchData = async () => {
      prompt.length > 0 ? setLoading(true) : setLoading(false);

      if(!loading && prompt.length > 0 && inputValue.length > 0){
        const result = await model.generateContent(prompt);
        const response = await result.response;
        setOutput(() => response.text());
      }
    }

    fetchData();

  },[setOutput,prompt,inputValue])


  return (
    <>
    <div className='grid place-content-center gap-9 h-screen'>
    <Font family='Bebas Neue'>
      <h1 className='text-4xl font-bold text-start tracking-wider text-white p-5'>Enter a prompt. </h1>
      <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => e.code === "Enter" && setPrompt(inputValue)}
      className='w-[900px] text-3xl text-white px-5 py-4 bg-transparent border border-white rounded-full' 
      type="text" />
      </Font>
      <Text className='bg-transparent tracking-widest max-w-[900px] max-h-[400px] overflow-y-scroll text-wrap p-5 rounded-lg'>
        {output}
      </Text>
      </div>
    </>
  )
}

export default App