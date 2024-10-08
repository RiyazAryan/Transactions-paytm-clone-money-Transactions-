import {useState} from "react"
import { Button } from "./Button";
import { Buttonwarning } from "./Buttonwarning";
import { Heading } from "./heading";
import { Inputbox } from "./inputbox";
import { Subheading } from "./subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';

export function Signup(){
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const navigate = useNavigate()

    return(
    <div className="bg-blue-900 flex justify-center h-screen dark:text-white">
        <div className="flex flex-col justify-center">
            <div className="bg-white dark:bg-black rounded-lg p-2 text-center w-80 h-100% border-2 border-black">
                <Heading label={"Sign up"}/>
                <Subheading label={"Enter your information to create an account"}/>
                <Inputbox type={"text"} placeholder={"John"} label={"First Name"} 
                onChange={(e)=>{
                    setfirstName(e.target.value)
                }}/>
                <Inputbox type={"text"} placeholder={"Doe"} label={"Last Name"}
                onChange={(e)=>{
                    setlastName(e.target.value)
                }}/>
                <Inputbox type={"text"} placeholder={"@example.com"} label={"Email"}
                onChange={(e)=>{
                    setusername(e.target.value)
                }}/>
                <Inputbox type={"password"} placeholder={"min 8 charecters"} label={"Password"}
                onChange={(e)=>{
                    setpassword(e.target.value)
                }}/>
                <Button label={"Sign Up"}
                        onClick={async () => {
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                    username,
                                    firstName,
                                    lastName,
                                    password
                                });

                                if (response.data.token) {
                                    localStorage.setItem("token", response.data.token);
                                    localStorage.setItem("usermain",firstName)
                                    navigate("/dashboard");
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
                                        text: response.data.message,
                                        icon: "error",
                                        timer: 3000,
                                        showConfirmButton: false,
                                        customClass: {
                                                    popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                                }
                                    });
                                }
                            } catch (error) {
                                const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
                                Swal.fire({
                                    title: "Error",
                                    text: errorMessage,
                                    icon: "error",
                                    timer: 3000,
                                    showConfirmButton: false,
                                    customClass: {
                                                    popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                                }
                                });
                            }
                        }}
                />
                <Buttonwarning label={"Already have an account?"} linktext={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>)
}