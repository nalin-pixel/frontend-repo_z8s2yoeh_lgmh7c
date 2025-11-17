import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
  const active = 'text-white bg-gradient-to-r from-sky-600/70 to-teal-600/70 shadow'
  const inactive = 'text-slate-300 hover:text-white hover:bg-white/10'

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-teal-500/20" />
          <span className="text-slate-100 font-semibold tracking-wide">Ruralytics</span>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink to="/dashboard" className={({isActive})=>`${linkBase} ${isActive?active:inactive}`}>Dashboard</NavLink>
          <NavLink to="/complaints" className={({isActive})=>`${linkBase} ${isActive?active:inactive}`}>Complaints</NavLink>
          <NavLink to="/recommendations" className={({isActive})=>`${linkBase} ${isActive?active:inactive}`}>Recommendations</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-slate-300 text-sm hidden sm:block">{user.name}</span>
              <button onClick={()=>{logout(); navigate('/')}} className="text-slate-200 text-sm px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10">Logout</button>
            </>
          ) : (
            <>
              <button onClick={()=>navigate('/login')} className="text-slate-200 text-sm px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10">Login</button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
