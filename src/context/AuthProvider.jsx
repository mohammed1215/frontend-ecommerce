import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const login = (info) => setUser(info)
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        withCredentials: true
      })
      setUser(null)
      toast('logged out successfully')
      console.log('logged out')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {

    // if there is a cookie then good send request to the server to get the data of the user and 
    axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
      withCredentials: true
    })
      .then(res => {
        setUser(res.data?.user)
        setLoading(false)
      })
      .catch(err => {
        if (err?.response?.data) {
          toast(err.response.data.message)
          return setLoading(false)
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)