import "./index.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//Components
import StructureSSR from "./pages/StructureSSR"
import StructureHome from "./pages/StructureHome"
import FormSignIn from "./components/forms/FormSignIn"
import FormSignUp from "./components/forms/FormSignUp"
import FormRecover from "./components/forms/FormRecover"
import User from "./pages/User"
import Appointments from "./pages/Appointments"

import Cookies from 'js-cookie'

import { FeedbackProvider } from "./contexts/api/feebackProvider"
import { AuthProvider } from "./contexts/auth/AuthProvider"
import { ThemeProvider } from "./contexts/theme/ThemeProvider"
import { OsProvider } from "./contexts/os/OsProvider"
import { AppointmentProvider } from "./contexts/appointment/appointmentProvider"

import Home from "./pages/Home"
import FormUser from "./components/forms/FormUser"
import CardAppointments from "./components/cards/CardAppointments"
import CardForUserRoutes from "./components/cards/CardForUserRoutes"
import ClassicButton from "./components/buttons/ClassicButton"
import ButtonTheme from "./components/buttons/ButtonTheme"
import Chatbot from "./pages/Chatbot"
import About from "./pages/About"

function PrivateRoute({ children }){
  const token = Cookies.get("tk")
  if(!token) return <Navigate to={"/sign-in"}/>
  
  return children
}

function PublicRoute({ children }) {
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

              <AppointmentProvider>
                <Routes>

                  <Route 
                    path="/sign-in" 
                    element={
                        <PublicRoute>
                          <StructureSSR>
                            <FormSignIn />
                          </StructureSSR>
                        </PublicRoute>
                    }
                  />

                  <Route 
                    path="/sign-up" 
                    element={
                        <PublicRoute>
                          <StructureSSR>
                            <FormSignUp />
                          </StructureSSR>
                        </PublicRoute>
                      
                    }
                  />

                  <Route 
                    path="/recover" 
                    element={
                        <PublicRoute>
                          <StructureSSR>
                            <FormRecover />
                          </StructureSSR>
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
                          <StructureHome>
                            <Home />
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                    <Route 
                      path="/info" 
                      element={
                        <PrivateRoute>
                          <StructureHome>
                            <User>
                              <FormUser/>
                            </User>
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                    <Route 
                      path="/info/appointments" 
                      element={
                        <PrivateRoute>
                          <StructureHome>
                            <User>
                              <CardAppointments />
                            </User>
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                    <Route 
                      path="/info/theme" 
                      element={
                        <PrivateRoute>
                          <StructureHome>
                            <User>
                              <CardForUserRoutes params={{ 
                                title: "Tema",
                                text: "Clique aqui para alterar o tema do jeito que preferir" , 
                                button: ButtonTheme}
                              }/>
                            </User>
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                    <Route 
                      path="/info/logout" 
                      element={
                        <PrivateRoute>
                          <StructureHome>
                            <User>
                              <CardForUserRoutes params={{ 
                                title: "Sair",
                                text: "Para sair da aplicação basta clicar aqui", 
                                button: ClassicButton}
                              }/>
                            </User>
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                    <Route 
                      path="/chat" 
                      element={
                        <PrivateRoute>
                          <StructureHome>
                              <Chatbot />
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                    <Route 
                      path="/appointments" 
                      element={
                        <PrivateRoute>
                          <StructureHome>
                              <Appointments />
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                    <Route 
                      path="/about" 
                      element={
                        <PrivateRoute>
                          <StructureHome>
                              <About />
                          </StructureHome>
                        </PrivateRoute>
                      }
                    />

                </Routes>
              
              </AppointmentProvider>

            </OsProvider>

            </FeedbackProvider>

          </AuthProvider>

        </ThemeProvider>

      </BrowserRouter>
    </main>
  )
}

export default App
