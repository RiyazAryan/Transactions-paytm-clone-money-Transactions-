export function Button({label, onClick}){
    return(
        <button className="w-full bg-blue-700 hover:bg-blue-900 px-2 py-2 mt-2 mb-1 rounded-lg font-semibold text-white" onClick={onClick} type="button">{label}</button>
    )
}