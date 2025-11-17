import "./index.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

//Components
import ScreenSSR from "./pages/StructureSSR"
import ScreenHome from "./pages/ScreenHome"
import FormSignIn from "./components/forms/FormSignIn"
import FormSignUp from "./components/forms/FormSignUp"
import FormRecover from "./components/forms/FormRecover"
import UserPage from "./pages/UserPage"

import { SsrProvider } from "./contexts/ssr/SsrProvider"
import { AuthProvider } from "./contexts/auth/AuthProvider"
import { ThemeProvider } from "./contexts/theme/ThemeProvider"
import { useContext, useEffect } from "react"
import { AuthContext } from "./contexts/auth/AuthContext"

function PrivateRoute({ children }){
  const { token } = useContext(AuthContext)

  if(token === null) return <Navigate to={"/sign-in"}/>
  return children
}

function PublicRoute({ children }){
  return children
}


function App() {
  return (
    <main className="h-[100dvh] w-full">

      <BrowserRouter>

        <ThemeProvider>

          <AuthProvider>

              <Routes>

                <Route 
                  path="/sign-in" 
                  element={
                    <SsrProvider>
                      <PublicRoute>
                        <ScreenSSR>
                          <FormSignIn />
                        </ScreenSSR>
                      </PublicRoute>
                    </SsrProvider>
                  }
                />

                <Route 
                  path="/sign-up" 
                  element={
                    <SsrProvider>
                      <PublicRoute>
                        <ScreenSSR>
                          <FormSignUp />
                        </ScreenSSR>
                      </PublicRoute>
                    </SsrProvider>
                  }
                />

                <Route 
                  path="/recover" 
                  element={
                    <SsrProvider>
                      <PublicRoute>
                        <ScreenSSR>
                          <FormRecover />
                        </ScreenSSR>
                      </PublicRoute>
                    </SsrProvider>
                  }
                />

                <Route 
                  path="/*"
                  element={
                    <Navigate to={"/sign-in"}/>
                  }
                />

                <Route 
                    path="/home" 
                    element={
                      <PrivateRoute>
                        <ScreenHome />
                      </PrivateRoute>
                    }
                  />

                  <Route 
                    path="/info" 
                    element={
                      <PublicRoute>
                        <ScreenHome>
                          <UserPage />
                        </ScreenHome>
                      </PublicRoute>
                    }
                  />

              </Routes>

          </AuthProvider>

        </ThemeProvider>

      </BrowserRouter>
    </main>
  )
}

export default App
