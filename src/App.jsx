import "./index.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//Components
import ScreenSSF from "./pages/StructureSSR"
import ScreenHome from "./pages/ScreenHome"
import FormSignIn from "./components/login/FormSignIn"
import FormSignUp from "./components/login/FormSignUp"
import FormRecover from "./components/login/FormRecover"
import UserPage from "./pages/UserPage"

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
    <main className="h-[100dvh] w-full flex justify-center items-center">
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <ScreenProvider>
              <Routes>

                <Route 
                  path="/sign-in" 
                  element={
                    <PublicRoute>
                      <ScreenSSF>
                        <FormSignIn />
                      </ScreenSSF>
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/sign-up" 
                  element={
                    <PublicRoute>
                      <ScreenSSF>
                        <FormSignUp />
                      </ScreenSSF>
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/info" 
                  element={
                    <PublicRoute>
                      <ScreenSSF>
                        <UserPage />
                      </ScreenSSF>
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/recover" 
                  element={
                    <PublicRoute>
                      <ScreenSSF>
                        <FormRecover />
                      </ScreenSSF>
                    </PublicRoute>
                  }
                />

                <Route 
                  path="/home" 
                  element={
                    <PublicRoute>
                      <ScreenHome />
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
