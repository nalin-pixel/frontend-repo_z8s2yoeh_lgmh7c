import { useEffect } from 'react'

export default function FormModal({ open, onClose, title, children }){
  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape') onClose?.() }
    if(open) window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[open])

  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur" onClick={onClose}/>
      <div className="relative w-full max-w-lg mx-auto rounded-xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
        <div className="text-slate-100 text-lg font-medium mb-4">{title}</div>
        {children}
      </div>
    </div>
  )
}
