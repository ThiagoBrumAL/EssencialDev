import "./index.css"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScreenForm from "./pages/ScreenForm"


function App() {
  return (
    <main className="min-h-dvh w-full">
      <BrowserRouter>
        <Routes>
            <Route path="/*" element={<ScreenForm />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
