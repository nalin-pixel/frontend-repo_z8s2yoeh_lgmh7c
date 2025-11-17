import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Landing(){
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(56,189,248,.15),transparent),radial-gradient(1000px_500px_at_80%_10%,rgba(45,212,191,.12),transparent)]"/>
      <main className="flex-1 grid place-items-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-4">
            Empowering Rural India with Data
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            A minimal, professional platform for Panchayats, administrators, and citizens to visualize progress, submit issues, and act on clear recommendations.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={()=>navigate('/login')} className="px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10">Login</button>
            {user && (
              <button onClick={()=>navigate('/dashboard')} className="px-5 py-2.5 rounded-md bg-gradient-to-r from-sky-500 to-teal-500 text-slate-900 font-medium shadow">
                Explore Dashboard
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
