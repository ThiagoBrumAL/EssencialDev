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

//Cookies
import Cookies from "js-cookie";

import { useContext, useEffect } from "react"
import { AuthContext } from "./contexts/auth/AuthContext"
import HomePage from "./pages/HomePage"
import FormUser from "./components/forms/FormUser"
import CardAppointments from "./components/cards/CardAppointments"
import CardForUserRoutes from "./components/cards/CardForUserRoutes"
import ClassicButton from "./components/buttons/ClassicButton"
import ButtonTheme from "./components/buttons/ButtonTheme"

function PrivateRoute({ children }){
  const { token } = useContext(AuthContext)

  if(token === null) return <Navigate to={"/sign-in"}/>
  return children
}

function PublicRoute({ children }) {

  const { keepSessionUser } = useContext(AuthContext);

  if (keepSessionUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
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
                            <CardForUserRoutes params={{ 
                              title: "Tema",
                              text: "Clique aqui para alterar o tema do jeito que preferir" , 
                              button: ButtonTheme}
                            }/>
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
                            <CardForUserRoutes params={{ 
                              title: "Sair",
                              text: "Para sair da aplicação basta clicar aqui", 
                              button: ClassicButton}
                            }/>
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
