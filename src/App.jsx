import "./index.css"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScreenForm from "./pages/ScreenForm"
import Home from "./pages/Home"


function App() {
  return (
    <main className="min-h-dvh w-full">
      <BrowserRouter>
        <Routes>
            <Route path="/*" element={<ScreenForm />}></Route>
            <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
