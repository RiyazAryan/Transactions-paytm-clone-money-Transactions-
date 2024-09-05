import { Route, Routes, BrowserRouter } from "react-router-dom"
import { Signup } from "./componenets/signup"
import { Signin } from "./componenets/signin"
import { Dashboard } from "./componenets/dashboard"
import { Sendmoney } from "./componenets/sendMoney"
import { RecoilRoot } from "recoil"
function App() {

  return (
    <div className="dark:bg-black min-h-screen">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sendmoney" element={<Sendmoney />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
