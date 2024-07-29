import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
function ChatPrompt() {
    const [inp,setInp] = useState('');
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    useEffect(() => {
        const fetchData = async () => {
            const prompt = "Tell me a big horror story"
            const result = await model.generateContentStream([prompt]);
            // print text as it comes in
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                setInp((prev) => prev + chunkText);
            }
        }
        fetchData();
    },[])
    return (
        <div className='w-screen h-screen tracking-[2.4px] p-10'>
            <p className='text-white'>{inp}</p>
        </div>
    )
}

export default ChatPrompt