import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './components/Toast'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Complaints from './pages/Complaints'
import Recommendations from './pages/Recommendations'
import './index.css'

function PrivateRoute({ children }){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/complaints" element={<PrivateRoute><Complaints/></PrivateRoute>} />
          <Route path="/recommendations" element={<PrivateRoute><Recommendations/></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  )
}
