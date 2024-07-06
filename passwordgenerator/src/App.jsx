import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {

  const [length, setlength] = useState(8);
  const [numberallow, setnumberallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState("");


  const passwordref = useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallow) str += "0123456789"
    if (charallow) str += "!@#$%^&*()~<>?|{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)

  }, [length, numberallow, charallow, setpassword])

  const copytoclipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordgenerator()
  }, [length, charallow, numberallow, passwordgenerator]);


  return (
    <>

      <div className='bg-slate-700 max-w-md mx-auto my-8 rounded-md shadow-md px-3'>
        <h1 className='text-green-500 text-center py-2'>PASSWORD GENERATOR</h1>

        <div className='flex shadow-md rounded-md overflow-hidden bg-slate-400 mb-4 '>
          <input
            type="text"
            value={password}
            size={password.length}
            className=' w-full outline-none text-slate-600'
            placeholder="Password"
            readOnly
            ref={passwordref}
          />

          <button
            onClick={copytoclipboard}
            className='bg-red-700 rounded-md text-white outline-none px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>

        <div className='flex gap-4 justify-between py-2'>
          <div>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charallow}
              id="charinput"
              onChange={() => {
                setcharallow((prev) => !prev);
              }}
            />
            <label htmlFor="charinput">Characters</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberallow}
              onChange={() => {
                setnumberallow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>



        </div>




      </div>


    </>
  )
}

export default App
