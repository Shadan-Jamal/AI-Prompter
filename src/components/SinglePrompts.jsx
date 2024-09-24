import React,{useState, useEffect} from 'react';
import Font,{Text} from 'react-font';
import { RxCross1 } from "react-icons/rx";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence, spring } from 'framer-motion';
import { BsArrowRight } from "react-icons/bs";
import { FaExclamation } from "react-icons/fa6";

function SinglePrompts({setShowCard ,setPromptAppear}) {

  const [inputValue,setInputValue] = useState({input_one : "",input_two : ""});
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [instruction,addInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal,setModal] = useState(false);
  const [arrow, rotateArrow] = useState(false);
  
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
      if (inputValue.input_one) {
        rotateArrow(true);
        setLoading(true);
        setPrompt(inputValue.input_one);
        addInstruction(inputValue.input_two);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      if(prompt.length > 0 && inputValue.input_one.length > 0){
        try{
          const result = await model.generateContentStream([prompt]);
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            setOutput((prev) => prev + chunkText);
          }
        }
        catch(err){
          setOutput("Encountered an error. Kindly try again or enter a different prompt")
        }
        finally{
          setLoading(false);
        }
      }
    }
    fetchData();
    setOutput('');

  },[prompt,loading]);

  return (
    <>
    
    <motion.div
    className='w-full h-screen relative leading-7 pt-16 px-5 lg:pt-20 lg:px-20 mix-blend-difference'>

      <motion.div
          className='absolute top-12 left-2 lg:top-20 lg:left-3 rounded-full p-3 cursor-pointer'>
          <RxCross1
            onClick={handleClick}
            className='text-white lg:text-3xl' />
      </motion.div>

    <Font family='Dosis' weight={700}>
    <div className='grid grid-cols-2 place-content-center gap-4'>
        <div className='col-span-2 mb-1 flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-7'>
          {/* Input 1 */}
          <div className='w-full px-12'>
            <input
            id='prompt'
            placeholder='Enter A Prompt..'
            value={inputValue.input_one}
            onChange={(e) => setInputValue((prevInput) => {
              return {...prevInput, input_one : e.target.value}
            })}
            className='w-[100%] text-base lg:text-[20px] text-white px-1 py-[5px] lg:py-3 bg-transparent border-b-2 border-b-white focus:outline-none' 
            type="text" />
          </div>

            {/* Input 2 */}
          <div className='w-full relative px-12'>
            <input
            id='instruction'
            placeholder='Enter an Instruction for me..'
            value={inputValue.input_two}
            onChange={(e) => setInputValue((prevInput) => {
                return {...prevInput, input_two : e.target.value}
            })}
            className='w-[100%] text-base lg:text-[20px] text-white px-1 py-[5px] lg:py-3 bg-transparent border-b-2 border-b-white focus:outline-none' 
            type="text"/>
            <FaExclamation 
            color='white' 
            onClick={() => setModal(!modal)} 
            className='absolute right-11 top-[6px] text-base lg:text-lg lg:top-4 cursor-pointer'/>

            <AnimatePresence>
                {modal && <motion.div
                initial={{scale : 0 ,opacity : 0}}
                animate={{scale : 1 ,opacity : 1}}
                exit={{scale : 0 , opacity : 0}}
                transition={{delay : 0.5, type : spring, ease : 'easeInOut'}}
                className='w-48 absolute right-0 top-10 lg:top-14 bg-slate-800/50 p-3 rounded-lg -z-0'
                >
                  <h1 className='text-xs lg:text-sm text-wrap text-white font-extralight font-sans'>Use this prompt to specify the response behaviour of the bot.</h1>
                  </motion.div>}
              </AnimatePresence>
          </div>

          <motion.div className='self-start pl-12'>
            <motion.button 
            initial={{rotate : 0}}
            animate={{rotate : arrow ? 360 : 0}}
            transition={{delay :0.3, type : 'spring'}}
            onClick={handleKeyDown}
            className="text-base lg:text-2xl lg:pt-3">
              <BsArrowRight color='white'/>
            </motion.button>
          </motion.div>
        </div>
        
    </div>
    </Font>

      {loading ?
      <Text family='Montserrat' weight={100} className='bg-transparent tracking-[2.4px] text-xl lg:text-[35px] px-4 py-4'>
         {`${inputValue.input_one.length == 0 ? 'Please enter the first prompt' : 'Loading...'}`}
      </Text>
      : output && <Text family='Montserrat' weight={100} className='bg-transparent tracking-[2.4px] leading-[20px] max-w-screen max-h-[450px] lg:max-h-[550px] text-wrap text-[15px] lg:text-[15px] whitespace-pre-wrap px-4 py-7 mt-3 border-l-[1px] border-l-slate-300 overflow-auto scrollbar'>
      {output}
      </Text>
      }
    </motion.div>
      </>
  )
}

export default SinglePrompts