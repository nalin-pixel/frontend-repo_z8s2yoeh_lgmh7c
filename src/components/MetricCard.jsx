import { motion } from 'framer-motion'

export default function MetricCard({ title, value, hint, children }){
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.4}}
      className="relative rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-900/20 p-4 shadow-xl shadow-sky-900/10">
      <div className="text-slate-200 text-sm mb-2 flex items-center justify-between">
        <span>{title}</span>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
      <div className="text-3xl font-semibold text-sky-300 drop-shadow">{value}</div>
      <div className="mt-4">
        {children}
      </div>
    </motion.div>
  )
}
