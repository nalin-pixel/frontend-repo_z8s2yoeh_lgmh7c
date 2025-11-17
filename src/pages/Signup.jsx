import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'

export default function Signup(){
  const { signup } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  function submit(e){
    e.preventDefault()
    if(!name || !email || !password){ push('Fill all fields', 'error'); return }
    if(password !== confirm){ push('Passwords do not match', 'error'); return }
    signup({ name, email })
    push('Account created. Please login.')
    navigate('/login')
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold mb-4">Create an Account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <input className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Confirm Password" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
          <button className="w-full py-2 rounded-md bg-gradient-to-r from-sky-500 to-teal-500 text-slate-900 font-medium">Sign up</button>
          <div className="text-sm text-slate-400 text-center">Already have an account? <Link to="/login" className="text-sky-300">Login</Link></div>
        </form>
      </div>
    </div>
  )
}
