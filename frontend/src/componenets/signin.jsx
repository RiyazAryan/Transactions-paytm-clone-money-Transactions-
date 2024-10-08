import { Button } from "./Button";
import { Buttonwarning } from "./Buttonwarning";
import { Heading } from "./heading";
import { Inputbox } from "./inputbox";
import { Subheading } from "./subheading";
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



export function Signin(){
    const [username, setusername] = useState("")
    const [password, setpassword]=useState("")
    const navigate=useNavigate();
    return(
    <div className="bg-blue-900 flex justify-center h-screen dark:text-white">
        <div className="flex flex-col justify-center">
            <div className="bg-white dark:bg-black rounded-lg p-2 text-center w-80 h-100% border-2 border-black">
                <Heading label={"Sign In"}/>
                <Subheading label={"Enter your credentials to access your account"}/>
                <Inputbox type={"text"} placeholder={"@example.com"} label={"username/Email"}
                onChange={(e)=>{
                    setusername(e.target.value)
                }}/>
                <Inputbox type={"password"} placeholder={"min 8 charecters"} label={"Password"}
                onChange={(e)=>{
                    setpassword(e.target.value)
                }}/>
                
                <Button label={"Sign In"}
                    onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            });

                            if (response.status === 200) {
                                localStorage.setItem("token", response.data.token);
                                localStorage.setItem("usermain",response.data.firstName)
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
                                    text: response.data.message || "An unexpected error occurred",
                                    icon: "error",
                                    timer: 3000,
                                    showConfirmButton: false,
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
                                timer: 3000,
                                showConfirmButton: false,
                                customClass: {
                                                    popup: 'dark:bg-slate-500 dark:text-white' // Custom class applied to the main popup container
                                                }
                            });
                        }
                    }}
                />
                <Buttonwarning label={"Don't have an account?"} linktext={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>)
}