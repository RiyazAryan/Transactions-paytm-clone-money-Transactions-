

export function Appbar(){
    const userm=localStorage.getItem("usermain")
    return(
        <div className="flex justify-between border border-b-2 border-black p-2 shadow-lg bg-blue-900">
            <div className="font-bold text-4xl text-blue-400">
                <span className="text-white">Pay</span>TM
            </div>
            <div>
                <div className="flex">
                    <div className="flex flex-col justify-center p-1 pr-4 text-white ">
                        <div>
                        Hello, <span className="text-blue-400 font-semibold hover:underline hover:underline-offset-2">{userm}</span> 
                        </div>
                    </div>
                    <div className="p-1 h-12 w-12 rounded-full flex justify-center mt-1 mr-2 bg-white hover:bg-blue-400 text-xl hover:text-3xl">
                        <button className="flex flex-col font-semibold justify-center h-full pb-1">
                            {userm? userm[0].toUpperCase() : "U"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}