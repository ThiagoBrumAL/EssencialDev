import "./index.css"
import './App.css'
import ScreenForm from "./pages/ScreenForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"


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
