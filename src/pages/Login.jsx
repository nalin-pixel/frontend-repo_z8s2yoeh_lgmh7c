import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'

export default function Login(){
  const { login } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit(e){
    e.preventDefault()
    if(!email || !password){ push('Enter email and password', 'error'); return }
    login({ email })
    push('Welcome back!')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full py-2 rounded-md bg-gradient-to-r from-sky-500 to-teal-500 text-slate-900 font-medium">Login</button>
          <div className="text-sm text-slate-400 text-center">No account? <Link to="/signup" className="text-sky-300">Create one</Link></div>
        </form>
      </div>
    </div>
  )
}
