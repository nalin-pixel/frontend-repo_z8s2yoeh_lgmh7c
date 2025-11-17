import { createContext, useContext, useEffect, useState } from 'react'

const AuthCtx = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const raw = localStorage.getItem('ruralytics_user')
    if(raw) setUser(JSON.parse(raw))
  },[])

  function login({ email }){
    const u = { name: email.split('@')[0], email }
    setUser(u)
    localStorage.setItem('ruralytics_user', JSON.stringify(u))
    return u
  }

  function signup({ name, email }){
    const u = { name, email }
    setUser(u)
    localStorage.setItem('ruralytics_user', JSON.stringify(u))
    return u
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('ruralytics_user')
  }

  return (
    <AuthCtx.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth(){
  return useContext(AuthCtx)
}
