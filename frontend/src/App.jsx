import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ThemeProvider from "./context/ThemeContext"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup"

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
