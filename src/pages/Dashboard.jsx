import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MetricCard from '../components/MetricCard'
import Chart from '../components/Chart'
import Loader from '../components/Loader'
import { fetchPanchayats, fetchFunds } from '../services/api'

export default function Dashboard(){
  const [loading, setLoading] = useState(true)
  const [panchayats, setPanchayats] = useState([])
  const [selected, setSelected] = useState('')
  const [funds, setFunds] = useState([])

  useEffect(()=>{
    Promise.all([fetchPanchayats(), fetchFunds()]).then(([p, f])=>{
      setPanchayats(p)
      setFunds(f)
      setSelected(p?.[0]?.panchayat_id || '')
    }).finally(()=> setLoading(false))
  },[])

  const metrics = useMemo(()=>{
    // Simple synthesized metrics from funds for demo
    const f = funds.filter(x=>x.panchayat_id===selected)
    const utilized = f.reduce((a,c)=>a+c.utilized,0)
    const allocated = f.reduce((a,c)=>a+c.allocated,0)
    const pending = f.reduce((a,c)=>a+c.pending,0)
    const edu = Math.round(60 + (utilized%40))
    const health = Math.round(55 + (allocated%45))
    const agri = Math.round(50 + (pending%50))
    return { edu, health, agri, budget: { utilized, allocated, pending } }
  },[funds, selected])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Development Dashboard</h2>
          <select value={selected} onChange={e=>setSelected(e.target.value)} className="px-3 py-2 rounded-md bg-slate-900 border border-white/10">
            {panchayats.map(p=> (
              <option key={p.id||p.panchayat_id} value={p.panchayat_id}>{p.name}</option>
            ))}
          </select>
        </div>
        {loading ? <Loader/> : (
          <div className="grid md:grid-cols-2 gap-4">
            <MetricCard title="Education Metrics" value={`${metrics.edu}%`} hint="Enrollment & Literacy">
              <Chart type="bar" data={[metrics.edu-10, metrics.edu, metrics.edu-5, metrics.edu-12]} />
              <p className="text-xs text-slate-400 mt-2">Steady improvements in attendance and literacy.</p>
            </MetricCard>
            <MetricCard title="Healthcare Metrics" value={`${metrics.health}%`} hint="Immunization & Care">
              <Chart type="line" data={[metrics.health-12, metrics.health-6, metrics.health-3, metrics.health]} />
              <p className="text-xs text-slate-400 mt-2">Increased immunization outreach this quarter.</p>
            </MetricCard>
            <MetricCard title="Agriculture Metrics" value={`${metrics.agri}%`} hint="Yield & Irrigation">
              <Chart type="bar" data={[metrics.agri-8, metrics.agri-2, metrics.agri-6, metrics.agri]} />
              <p className="text-xs text-slate-400 mt-2">Higher irrigation coverage drives resilience.</p>
            </MetricCard>
            <MetricCard title="Funds & Budget" value={`₹${metrics.budget.utilized.toLocaleString()}`} hint="This Year">
              <Chart type="line" data={[metrics.budget.allocated, metrics.budget.utilized, metrics.budget.pending].map(n=>Math.max(1, n%100))} />
              <p className="text-xs text-slate-400 mt-2">Allocated vs utilization vs pending overview.</p>
            </MetricCard>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
