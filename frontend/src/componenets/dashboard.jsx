import { Appbar } from "./appbar";
import { Balance } from "./balance";
import { Users } from "./users";

export function Dashboard(){
    return(
        <div>
            <Appbar/>
            <Balance label={"Balance"} />
            <Users label={"Send Money"}/>
        </div>
    )
}