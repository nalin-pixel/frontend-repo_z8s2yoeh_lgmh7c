import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { fetchAnalysis } from '../services/api'

export default function Recommendations(){
  const [items, setItems] = useState(null)

  useEffect(()=>{
    fetchAnalysis().then(setItems).catch(()=>setItems([]))
  },[])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-6">
        <h2 className="text-xl font-semibold mb-4">AI-style Recommendations</h2>
        {!items ? <Loader/> : (
          <div className="grid gap-3">
            {items.map((it, idx)=> (
              <div key={idx} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <div className="text-sky-300 text-sm">{it.sdg_tag}</div>
                <div className="text-lg font-medium">{it.title}</div>
                <ul className="list-disc list-inside text-slate-300 mt-2">
                  {it.points?.slice(0,2).map((p,i)=> <li key={i}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
