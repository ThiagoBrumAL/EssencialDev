import "./index.css"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScreenForm from "./pages/ScreenForm"
import Home from "./pages/Home"

import { ScreenProvider } from "./contexts/Context"

function App() {
  return (
    <main className="min-h-dvh w-full">
      <BrowserRouter>
        <ScreenProvider>
          <Routes>
              <Route path="/*" element={<ScreenForm />}></Route>
              <Route path="/home" element={<Home />}></Route>
          </Routes>
          </ScreenProvider>
      </BrowserRouter>
    </main>
  )
}

export default App
