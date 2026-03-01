import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState( localStorage.getItem("theme"))
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
      document.body.style.backgroundColor = "#000"
      document.body.style.color = "#fff"
    }
    else {
      root.classList.remove("dark")
      document.body.style.backgroundColor = "#fff"
      document.body.style.color = "#000"
    }

   localStorage.setItem("theme", theme)

  }, [theme])
  const toggleDarkMode = () => {
    setTheme((preTheme) =>(  preTheme === "dark" ? "light" : "dark"))
  }
  const backendUrl=import.meta.VITE_VITE_API_URL
  const value={
    backendUrl,toggleDarkMode,isDarkMode: theme === "dark"
  }
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
