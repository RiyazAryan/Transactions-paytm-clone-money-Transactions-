import { Button } from "./Button";
import { Heading } from "./heading";
import { Inputbox } from "./inputbox";
import {useState} from "react"
import Swal from 'sweetalert2';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Buttonwarning } from "./Buttonwarning";

export function Sendmoney(){
    const navigate=useNavigate()
    const details=localStorage.getItem("transferto")
    const [Transferamt, setTransferamt] = useState(0)
    return(
        <div className="bg-blue-900 flex justify-center h-screen dark:text-white">
        <div className="flex flex-col justify-center">
            <div className="py-5 bg-white dark:bg-black rounded-lg p-2 text-center w-80 h-100% border-2 border-black">
                <Heading label={"Send Money"}/>
                <div className="p-4 flex justify-between">
                <div></div>
                <div className="rounded-full bg-blue-900 hover:bg-blue-400">
                    <button className="pr-6 pl-6 font-semibold justify-center text-white text-[60px]">
                        {details[0].toUpperCase()}
                    </button>
                </div>
                <div></div>
                </div>
                <div className="pt-1 dark:text-white text-md italic">
                    {details}
                </div>
                <div className="p-2 pb-1 px-4">
                    <Inputbox label={"Amount in Rs."} type={Number} placeholder={"Enter Amount"} onChange={(e)=>setTransferamt(e.target.value)}/>
                    <Button label={"Initiate Transaction"}
                    onClick={async() => {
                        if (Transferamt <= 0) {
                                Swal.fire({
                                    title: "Please enter valid amount",
                                    timer: 3000,
                                    showConfirmButton: false,
                                });
                            }
                            else{
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to:localStorage.getItem("transfer"),
                                amount:Transferamt
                            },{
                                headers:{
                                    'Authorization': 'Bearer '+localStorage.getItem("token")
                                }
                            });
                            if (response.status === 200) {
                                Swal.fire({
                                    title: "Success",
                                    text: response.data.message,
                                    icon: "success",
                                    timer: 3000,
                                    showConfirmButton: false,
                                    customClass: {
                                        popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                    }
                                });
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    text: response.data.message || "An unexpected error occurred",
                                    icon: "Error",
                                    //timer: 3000,
                                    showConfirmButton: true,
                                    customClass: {
                                    popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                }
                                });
                            }
                        } catch (error) {
                            Swal.fire({
                                title: "Error",
                                text: error.response?.data?.message || "An unexpected error occurred",
                                icon: "error",
                                //timer: 3000,
                                showConfirmButton: true,
                                customClass: {
                                    popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                }
                            });
                        }
                        navigate("/dashboard")
                    }
                    }}/>
                </div>
                <Buttonwarning linktext={"Abort Transaction"} to={"/dashboard"}/>
            </div>
        </div>
    </div>
    )
}