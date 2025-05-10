import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(0)
  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) str += '1234567890'
    if(symbolAllowed) str += '!@#$%^&*()_+'

    for(let i = 1;i < length;i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str[char]
    }

    setPassword(pass)

  }, [length,numberAllowed,symbolAllowed])

  const copyPassword = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  useEffect(()=>{
    generatePassword()
  }, [length,numberAllowed,symbolAllowed])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-xl font-semibold text-white text-center my-3">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-amber-50"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button 
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 active:scale-y-80 active:rounded-r-lg duration-500"
        onClick={copyPassword}>
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setlength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }}
          name="" 
          id="numberAllowed" />
          <label htmlFor="numberAllowed">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={symbolAllowed}
          onChange={()=>{
            setSymbolAllowed((prev)=>!prev)
          }}
          name="" 
          id="symbolAllowed" />
          <label htmlFor="symbolAllowed">Symbol</label>
        </div>
      </div>
    </div>
  );
}

export default App;
