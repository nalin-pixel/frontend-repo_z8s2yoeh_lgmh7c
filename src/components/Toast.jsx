import { createContext, useContext, useState, useCallback } from 'react'

const ToastCtx = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])
  const push = useCallback((msg, type='info')=>{
    const id = Math.random().toString(36).slice(2)
    setToasts(t=>[...t, {id, msg, type}])
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), 2800)
  },[])
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map(t=> (
          <div key={t.id} className={`px-4 py-2 rounded-md shadow border ${t.type==='error'?'bg-rose-500/20 border-rose-400/30 text-rose-100':'bg-emerald-500/20 border-emerald-400/30 text-emerald-100'}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
export function useToast(){
  return useContext(ToastCtx)
}
