import "./index.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//Components
import ScreenSSR from "./pages/StructureSSR"
import ScreenHome from "./pages/ScreenHome"
import FormSignIn from "./components/forms/FormSignIn"
import FormSignUp from "./components/forms/FormSignUp"
import FormRecover from "./components/forms/FormRecover"
import UserPage from "./pages/UserPage"

import { FeedbackProvider } from "./contexts/api/feebackProvider"
import { AuthProvider } from "./contexts/auth/AuthProvider"
import { ThemeProvider } from "./contexts/theme/ThemeProvider"
import { OsProvider } from "./contexts/os/OsProvider"

import { useContext } from "react"
import { AuthContext } from "./contexts/auth/AuthContext"
import HomePage from "./pages/HomePage"
import FormUser from "./components/forms/FormUser"
import CardAppointments from "./components/cards/CardAppointments"
import CardTheme from "./components/cards/CardTheme"
import CardLogout from "./components/cards/CardLogout"

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

            <FeedbackProvider>

            <OsProvider>

              <Routes>

                <Route 
                  path="/sign-in" 
                  element={
                    
                      <PublicRoute>
                        <ScreenSSR>
                          <FormSignIn />
                        </ScreenSSR>
                      </PublicRoute>
                  }
                />

                <Route 
                  path="/sign-up" 
                  element={
                      <PublicRoute>
                        <ScreenSSR>
                          <FormSignUp />
                        </ScreenSSR>
                      </PublicRoute>
                    
                  }
                />

                <Route 
                  path="/recover" 
                  element={
                      <PublicRoute>
                        <ScreenSSR>
                          <FormRecover />
                        </ScreenSSR>
                      </PublicRoute>
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
                        <ScreenHome>
                          <HomePage />
                        </ScreenHome>
                      </PrivateRoute>
                    }
                  />

                  <Route 
                    path="/info" 
                    element={
                      <PrivateRoute>
                        <ScreenHome>
                          <UserPage>
                            <FormUser/>
                          </UserPage>
                        </ScreenHome>
                      </PrivateRoute>
                    }
                  />

                  <Route 
                    path="/info/appointments" 
                    element={
                      <PrivateRoute>
                        <ScreenHome>
                          <UserPage>
                            <CardAppointments />
                          </UserPage>
                        </ScreenHome>
                      </PrivateRoute>
                    }
                  />

                  <Route 
                    path="/info/theme" 
                    element={
                      <PrivateRoute>
                        <ScreenHome>
                          <UserPage>
                            <CardTheme />
                          </UserPage>
                        </ScreenHome>
                      </PrivateRoute>
                    }
                  />

                  <Route 
                    path="/info/logout" 
                    element={
                      <PrivateRoute>
                        <ScreenHome>
                          <UserPage>
                            <CardLogout />
                          </UserPage>
                        </ScreenHome>
                      </PrivateRoute>
                    }
                  />

              </Routes>
              
            </OsProvider>

            </FeedbackProvider>

          </AuthProvider>

        </ThemeProvider>

      </BrowserRouter>
    </main>
  )
}

export default App
