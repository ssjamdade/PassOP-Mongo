import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [isedit, setIsedit] = useState(false)
    const [editid, setEditid] = useState(0)

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000")
        let password = await req.json()
        setPasswordArray(password)
    }

    useEffect(() => {
        getPassword()
    }, [])



    const showPass = () => {
        if (ref.current.src.includes("/icons/closed.png")) {
            ref.current.src = "/icons/open.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/icons/closed.png"
            passwordRef.current.type = "text"

        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const addPassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]) // inserting id

            // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])

            let req = await fetch("http://localhost:3000", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            setform({ site: "", username: "", password: "" })

        } else {
            toast('All Inputs must be greater than 3 !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        navigator.clipboard.writeText(text)
    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {const updatedPassword = passwordArray.map(item => {
                if (item.id === editid) {
                    return { ...item, ...form } // Spreading both states into object
                }
                return item
            })
            setPasswordArray(updatedPassword)
            // localStorage.setItem("password", JSON.stringify(updatedPassword))

            let req = await fetch("http://localhost:3000", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ editid, site: form.site, username: form.username, password: form.password }) })

            setform({ site: "", username: "", password: "" })
            setIsedit(false)
            setEditid(null)

            toast('Password Edited !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('All inputs must be greater than 3 !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    const editpass = (id, e) => {
        let f = passwordArray.find(item => {
            return item.id === id
        })
        setform({ site: f.site, username: f.username, password: f.password })
        setIsedit(true)
        setEditid(id)
    }
    const deletepass = async (id) => {
        let c = confirm("Are your sure you want to delete password?")
        if (c) {
            let password = passwordArray.filter((item) => {
                return item.id != id
            })
            setPasswordArray(password)

            let req = await fetch("http://localhost:3000", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }

    }

    return (
        <>
            <ToastContainer />

            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

            <div className='md:max-w-[60%] min-h-[90vh] items-center md:m-auto flex flex-col gap-6 m-3'>

                <div className="top text-4xl m-auto flex flex-col items-center my-5">

                    <div className='header'>

                        <span className='text-green-500 font-bold'>&lt;</span>
                        <span className='font-bold'>Pass</span>
                        <span className='text-green-500 font-bold'>OP</span>
                        <span className='text-green-500 font-bold'>/&gt;</span>

                    </div>
                    <div className='text-lg'>Your own password manager</div>
                </div>

                <div className='inputs space-y-8 w-full'>
                    <input onChange={handlechange} name='site' value={form.site} placeholder='Enter website URL' type="text" className='w-full rounded-full py-1 px-3' />
                    <div className='flex flex-col md:flex-row gap-8 relative'>
                        <input onChange={handlechange} name='username' value={form.username} placeholder='Enter username' type="text" className='w-full rounded-full py-1 px-3' />
                        <input ref={passwordRef} onChange={handlechange} name='password' value={form.password} placeholder='Ener Password' type="password" className='w-full rounded-full py-1 px-3' />
                        <span onClick={showPass} className='absolute right-4 top-1 w-6 hover:cursor-pointer'><img ref={ref} className='invert' src="icons/open.png" alt="show" /></span>
                    </div>
                </div>

                <div className='btn'>
                    {isedit ? <button onClick={savePassword} className='bg-green-500 rounded-full py-1 px-4 flex items-center gap-2 font-bold hover:bg-green-600
                    '>
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000">
                        </lord-icon>

                        Save Password</button>

                        :

                        <button onClick={addPassword} className='bg-green-500 rounded-full py-1 px-4 flex items-center gap-2 font-bold hover:bg-green-600
                    '>
                            <lord-icon
                                src="https://cdn.lordicon.com/zrkkrrpl.json"
                                trigger="hover"
                                colors="primary:#000000,secondary:#000000">
                            </lord-icon>

                            Add Password</button>}


                </div>



                <div className="passwords w-full ">
                    <h2 className='text-xl font-bold py-2'>Your Passwords</h2>
                    {passwordArray.length == 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="w-full mb-4">
                            <thead className='bg-green-800'>
                                <tr className='text-white'>
                                    <th className='py-2'>Website(URL)</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>

                                {passwordArray.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td className='py-2 border border-white break-words w-fit'>
                                                <div className='flex justify-center items-center gap-2'>
                                                    <div>
                                                        <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                    </div>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wuvorxbv.json"
                                                            trigger="hover"
                                                            style={{ width: "22px", height: "22px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white break-words w-fit'>
                                                <div className='break-words min-h-4 text-center'>
                                                    {item.username}
                                                    <span className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wuvorxbv.json"
                                                            trigger="hover"
                                                            style={{ width: "22px", height: "22px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white break-words'>
                                                <div className='flex justify-center items-center gap-2'>
                                                    <div>{"*".repeat(item.password.length)}</div>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wuvorxbv.json"
                                                            trigger="hover"
                                                            style={{ width: "22px", height: "22px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <span className='cursor-pointer mx-2' onClick={(e) => { editpass(item.id, e) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/ghhwiltn.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer' onClick={() => { deletepass(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/drxwpfop.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                                }

                            </tbody>
                        </table>

                    }
                </div>
            </div>
        </>
    )
}

export default Manager
