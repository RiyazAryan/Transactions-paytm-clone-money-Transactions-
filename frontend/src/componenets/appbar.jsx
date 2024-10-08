import {useState} from "react"
import axios from 'axios'
import Swal from 'sweetalert2';

export function Appbar(){
    const [drop, setdrop]=useState(false)
    const userm=localStorage.getItem("usermain")
    function update(){
        setdrop(!drop)
    }
    return(
        <div className="flex fixed w-screen justify-between border border-b-2 border-black p-2 shadow-lg bg-blue-900">
            <div className="font-bold text-4xl text-blue-400">
                <span className="text-white">Pay</span>TM
            </div>
            <div>
                <div className="flex">
                    <div className="flex flex-col justify-center p-1 pr-4 text-white ">
                        <div>
                        Hello, <span className="text-blue-400 font-semibold hover:underline hover:underline-offset-2">{userm[0].toUpperCase()+userm.slice(1)}</span> 
                        </div>
                    </div>
                    <div className="p-1 h-12 w-12 rounded-full flex justify-center mt-1 mr-2 bg-white hover:bg-blue-400 text-xl">
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" font-semibold justify-center h-full pb-1" onClick={update}>
                            {userm? userm[0].toUpperCase(): "U"}
                        <div id="dropdown" className={`${drop?"block":"hidden"} z-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 pr-10`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="#" className="block text-black text-right">x</a>
                            </li>
                            <li>
                                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{
                                    Swal.fire({
                                    title: 'update password',
                                    input: 'password',
                                    inputLabel: 'Enter New Password',
                                    placeholder:'min 8 charecters',
                                    showCancelButton: true,
                                    confirmButtonText: 'Submit',
                                    customClass: {
                                        popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        axios.put('http://localhost:3000/api/v1/user/', {
                                            password: result.value
                                        },{
                                            headers: {
                                                'Authorization': 'Bearer '+localStorage.getItem("token"),
                                            }
                                        })
                                        .then((response) => {
                                            console.log('Success:', );
                                            Swal.fire({
                                                title: 'Success!',
                                                text: response.data.message,
                                                icon: 'success',
                                                customClass: {
                                                    popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                                }
                                            });
                                        })
                                        .catch((error) => {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'There was a problem submitting your data.',
                                                icon: 'error',
                                                customClass: {
                                                    popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                                }
                                            });
                                        });
                                    }
                                });
                                }}>Change Password</a>
                            </li>
                            <li>
                                <a href="/signin" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("usermain");
                                        localStorage.removeItem("transferto")
                                }}>Sign out</a>
                            </li>
                            </ul>
                        </div>
                        </button>
                   </div>
                </div>
            </div>
        </div>
    )
}