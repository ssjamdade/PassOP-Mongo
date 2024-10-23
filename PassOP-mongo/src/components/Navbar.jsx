import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 flex justify-between py-3 text-white px-4 items-center'>
      <div className='logo mx-10 text-2xl'>
        <span className='text-green-500 font-bold'>&lt;</span>
        <span className='font-bold'>Pass</span>
        <span className='text-green-500 font-bold'>OP</span>
        <span className='text-green-500 font-bold'>/&gt;</span>
      </div>


      <button className="github flex justify-center items-center rounded-lg bg-slate-900 py-1 px-2 gap-2 mx-10 ">
        <img className='w-8' src="/icons/github.png" alt="Github" />
        <span>Github</span>
      </button>


    </nav>
  )
}

export default Navbar
