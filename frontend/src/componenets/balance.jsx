import { useEffect , useState} from "react"
import axios from 'axios'

export function Balance({label}){
    const [balance, setbalance]=useState("")
    useEffect(()=>{
         axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem("token")
            }
        }).then((response)=>{
        setbalance(Math.ceil(response.data.balance * 100) / 100)
    })
    },[balance])
    return(
        <div className="p-5 pt-[100px] text-2xl font-bold dark:text-white">
            <span>{label}</span>
        <div className="flex pt-4 pl-1">
            <div className="text-lg text-blue-500">
                Your Balance: 
            </div>
            <div className="font-semibold text-xl pl-2">
                {balance}
            </div>
        </div>
        </div>
    )
}