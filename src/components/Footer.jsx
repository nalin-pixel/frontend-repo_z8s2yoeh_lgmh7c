export default function Footer(){
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Ruralytics • Empowering Rural India with Data
      </div>
    </footer>
  )
}
