import React, { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [character, useCharacter] = useState(false);
  const [numbers, useNumbers] = useState(false);
  const [password, setPassword] = useState("");


  const generatePassword = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(character){
      str+="!@#$%^&*(){}[]`~"
    }

    if(numbers){
      str+="1234567890"
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length +1);
      let randomChar = str.charAt(char);
      pass += randomChar;
    }

    setPassword(pass);
    
  }, [length, character, numbers, setPassword])

  useEffect(()=>{
    generatePassword()
  }, [length, character,numbers, setPassword])

  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  const passwordRef = useRef(null);

  return (
    <div className='page'>
      <div className="heading">Random Password Generator</div>
      <div className="container">
        <div className="above">
        <input 
          type="text"
          name="password" 
          placeholder='password'
          className='text-input-field'
          value={password}
          ref={passwordRef}
          readOnly
        />
        <button className="btn" onClick={copyToClipboard}>
          Copy
        </button>
        </div>
        <div className="rest">
        <input 
          type="range" 
          min={1}
          max={100} 
          className='range-input'
          value={length}
          onChange={(e)=>setLength(e.target.value)}
        />
        <label htmlFor="range" className='label'>Length:{length} </label>
        <input 
          type="checkbox" 
          value={numbers}
          onClick={()=>useCharacter(!character)}
        />
        <label htmlFor="character" className='label'>Characters</label>
        <input 
          type="checkbox"
          value={numbers}
          onClick={()=>useNumbers(!numbers)}
        />
        <label htmlFor="numbers" className='label'>Numbers</label>
        </div>
      </div>
    </div>
  )
}

export default App