import "./index.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//Components
import ScreenSSR from "./pages/StructureSSR"
import ScreenHome from "./pages/ScreenHome"
import FormSignIn from "./components/forms/FormSignIn"
import FormSignUp from "./components/forms/FormSignUp"
import FormRecover from "./components/forms/FormRecover"
import UserPage from "./pages/UserPage"

import { SsrProvider } from "./contexts/ssr/SsrProvider"
import { AuthProvider } from "./contexts/Auth/AuthProvider"
import { ThemeProvider } from "./contexts/Theme/ThemeProvider"

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
                      <PublicRoute>
                        <ScreenHome />
                      </PublicRoute>
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
