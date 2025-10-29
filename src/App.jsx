import "./index.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//Components
import ScreenForm from "./pages/ScreenForm"
import Home from "./pages/Home"
import FormSignIn from "./components/login/FormSignIn"
import FormSignUp from "./components/login/FormSignUp"
import FormRecover from "./components/login/FormRecover"

import { ScreenProvider } from "./contexts/ScreenContext"
import { AuthProvider } from "./contexts/AuthContext"
import { GlobalProvider } from "./contexts/GlobalContext"

function PrivateRoute({ children }){
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to={"/sign-in"}/>
}

function PublicRoute({ children }){
  const token = localStorage.getItem("token")
  return token ? <Navigate to={"/home"}/> : children
}


function App() {
  return (
    <main className="min-h-[100dvh] w-full">
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <ScreenProvider>
              <Routes>

                <Route 
                  path="/sign-in" 
                  element={
                    <PublicRoute>
                      <ScreenForm>
                        <FormSignIn />
                      </ScreenForm>
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/sign-up" 
                  element={
                    <PublicRoute>
                      <ScreenForm>
                        <FormSignUp />
                      </ScreenForm>
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/recover" 
                  element={
                    <PublicRoute>
                      <ScreenForm>
                        <FormRecover />
                      </ScreenForm>
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/home" 
                  element={
                    <PublicRoute>
                      <Home />
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/*"
                  element={
                    <Navigate to={"/sign-in"}/>
                  }
                />

              </Routes>
            </ScreenProvider>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </main>
  )
}

export default App
