export function Inputbox({placeholder, type, label, onChange}){
    return(
        <div>
            <div className="font-bold text-left py-2">
                {label}
            </div>
            <input className="border border-grey-500 rounded-md w-full px-2 py-1 focus:outline-blue-900 dark:text-black" type={type} placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}