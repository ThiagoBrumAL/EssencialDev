import "./index.css"
import './App.css'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import RecoverAccount from "./pages/RecoverAccount"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <main className="min-h-dvh w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/recover" element={<RecoverAccount />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
