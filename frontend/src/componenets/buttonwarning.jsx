import {Link} from "react-router-dom"
export function Buttonwarning({label, linktext, to}){
    return(
        <div className="flex justify-center text-blue-700">
            <div>
                {label}
            </div>
            <Link className="pl-2 underline underline-offset-1 hover:text-blue-900" to={to}>
                {linktext}
            </Link>
        </div>
    )
}