import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useToast } from '../components/Toast'
import { fetchComplaints, postComplaint } from '../services/api'

export default function Complaints(){
  const { push } = useToast()
  const [loading, setLoading] = useState(true)
  const [complaints, setComplaints] = useState([])
  const [form, setForm] = useState({ name:'', description:'', sdg_tag:'SDG3', panchayat_id:'' })

  useEffect(()=>{
    fetchComplaints().then(setComplaints).finally(()=>setLoading(false))
  },[])

  async function submit(e){
    e.preventDefault()
    if(!form.name || !form.description || !form.panchayat_id){ push('Please fill all fields', 'error'); return }
    try{
      const saved = await postComplaint(form)
      setComplaints(c=>[saved, ...c])
      push('Complaint submitted')
      setForm({ name:'', description:'', sdg_tag:'SDG3', panchayat_id:'' })
    }catch(e){
      push('Failed to submit', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-6 grid md:grid-cols-5 gap-6">
        <section className="md:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Submit a Complaint</h2>
          <form onSubmit={submit} className="space-y-3 rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <input className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Your Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
            <textarea className="w-full px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" rows={5} placeholder="Issue Description" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} />
            <div className="grid grid-cols-2 gap-3">
              <select className="px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" value={form.sdg_tag} onChange={e=>setForm(f=>({...f, sdg_tag:e.target.value}))}>
                {['SDG1','SDG2','SDG3','SDG4','SDG6','SDG11','SDG12','SDG13'].map(s=> <option key={s}>{s}</option>)}
              </select>
              <input className="px-3 py-2 rounded-md bg-slate-800/80 border border-white/10" placeholder="Panchayat ID" value={form.panchayat_id} onChange={e=>setForm(f=>({...f, panchayat_id:e.target.value}))} />
            </div>
            <button className="w-full py-2 rounded-md bg-gradient-to-r from-sky-500 to-teal-500 text-slate-900 font-medium">Submit</button>
          </form>
        </section>
        <aside className="md:col-span-2">
          <h3 className="text-lg mb-3">Recent Complaints</h3>
          <div className="space-y-3 max-h-[70vh] overflow-auto pr-1">
            {loading ? <Loader/> : complaints.map(c=> (
              <div key={c.id} className="rounded-lg border border-white/10 bg-slate-900/50 p-3">
                <div className="text-sm text-slate-300">{c.name} • <span className="text-sky-300">{c.sdg_tag}</span></div>
                <div className="text-slate-200">{c.description}</div>
                <div className="text-xs text-slate-500 mt-1">Panchayat: {c.panchayat_id}</div>
              </div>
            ))}
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
