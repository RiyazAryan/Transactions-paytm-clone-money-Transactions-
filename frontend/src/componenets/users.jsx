import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function Users({label}){
    const [users, setusers] = useState([])
    const [filter, setfilter]=useState("")

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem("token")
            }
        }).then((response)=>setusers(response.data.user))   
    },[filter])

    return(
        <div className="p-5">
            <div className="pt-5 px-5 border border-black border-2 rounded-lg darK:bg-black">
                <div className="flex justify-between p-2 darK:bg-black">
                    <div className="flex text-2xl font-bold pr-3">{label}<div className="hidden md:block text-[10px] pl-2 text-slate-500 font-normal"> to any account</div></div>
                    <div className="flex pl-4 border border-1 rounded-lg">
                        <input className="focus:outline-none w-20 sm:w-80 bg-white" placeholder='Search for account by Name...' 
                        onChange={(e)=>{
                            setfilter(e.target.value)
                        }}></input>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#60A5FA" className="pr-2 pt-2 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

                    </div>
                </div>
                <div className="border border-b-2"></div>
                <div className="pt-4 pl-1">
                    {users.map(user=><User user={user} key={user._id}/>)}
                </div>
        </div>
        </div>
    )
}

function User({user}){
    const navigate=useNavigate()
    return(
        <div className="flex justify-between px-2 py-2 border-dashed border-b-2">
            <div className="flex pr-5">
                <div className="p-1 h-12 w-12 rounded-full flex justify-center mt-1 mr-2 bg-blue-900 hover:bg-blue-400 text-xl hover:text-3xl">
                    <button className="flex flex-col font-semibold justify-center h-full text-white">
                        {user? user.firstName[0].toUpperCase() : "U"}
                    </button>
                </div>
                <div className="pt-1 pl-3 justify-center pr-4 ">
                    <div>
                        <span className="text-black">{user.firstName} {user.lastName}</span> 
                    </div>
                    <span className="text-slate-500 text-sm">{user._id}</span>
                </div>
            </div>
                <div>
                    <button className="px-3 py-3 bg-blue-900 hover:bg-blue-700 rounded-lg text-white text-sm m-2 mr-2 px-7 hover:font-bold" onClick={()=>{
                        localStorage.setItem("transfer",user._id)
                        localStorage.setItem("transferto",user.firstName+" "+user.lastName)
                        navigate('/sendMoney')
                    }}>Send</button>
                </div>
        </div>
    )
}