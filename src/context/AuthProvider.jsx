import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (info) => setUser(info)
  const logout = () => setUser(null)

  useEffect(() => {

    // if there is a cookie then good send request to the server to get the data of the user and 
    axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
      withCredentials: true
    })
      .then(res => setUser(res.data?.user))
      .catch(err => {
        if (err?.response?.data) {
          return toast(err.response.data.message)
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)