import React from 'react';
import Navbar from "./components/Navbar";
import Font,{Text} from 'react-font';
import { motion } from 'framer-motion';
import SinglePrompts from './components/SinglePrompts';


function App() {
  return (
    <>
    <Navbar />
    <div className='grid grid-cols-2 grid-flow-row place-content-center place-items-center gap-10 w-full h-screen px-10'>
      <div className='col-span-1 w-[400px] h-[250px] px-7 py-5 bg-zinc-300/10 rounded-3xl'>
        <div className='text-white w-full mb-6'>
          <Font family='Prata' weight={400}>
            <h3 className='text-3xl mb-3'>Single Prompts</h3>
          </Font>
          <div className='w-full h-[1px] bg-white/95'></div>
        </div>
        <div className='w-full'>
        <Font family='Prata' weight={400}>
            <h3 className='text-white text-wrap '>Use this bot to engange in isolated prompts along with instructions to specify the bot's behaviour.
            </h3>
        </Font>
        </div>
      </div>
      <div className='col-span-1 bg-red-500 w-[400px] h-[250px]'>

      </div>
      <div className='col-span-2 w-3/4 h-[50px] hover:cursor-default'>
        <Font family='DM Serif Display' weight={800}>
          <motion.p 
          className='text-7xl tracking-tight capitalize text-center'>Choose an option</motion.p>
        </Font>
      </div>
    {/* <SinglePrompts /> */}
    </div>
    </>
  )
}

export default App