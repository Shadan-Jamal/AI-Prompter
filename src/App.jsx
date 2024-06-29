import React, { useState } from 'react';
import Font, {Text} from 'react-font';

function App() {
  const [inputValue,setInputValue] = useState('');
  
  return (
    <>
    <div className='grid place-content-center gap-9 h-screen'>
    <Font family='Bebas Neue'>
      <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className='w-[900px] text-3xl text-white px-5 py-4 bg-transparent border border-white rounded-full' 
      type="text" />
      </Font>
      <Text className='bg-transparent tracking-widest max-w-[900px] max-h-[400px] overflow-y-scroll text-wrap p-5 rounded-lg'>
        
      </Text>
      </div>
    </>
  )
}

export default App