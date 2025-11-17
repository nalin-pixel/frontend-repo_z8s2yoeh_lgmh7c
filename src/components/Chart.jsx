import { useEffect, useRef } from 'react'

// Lightweight canvas chart (no extra deps) for simple bars/lines
export default function Chart({ type = 'bar', data = [], height = 120 }){
  const ref = useRef(null)
  useEffect(()=>{
    const canvas = ref.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0,0,W,H)
    const maxVal = Math.max(...data, 1)
    const pad = 12
    if(type==='bar'){
      const bw = (W - pad*2) / data.length
      data.forEach((v,i)=>{
        const h = (v/maxVal)*(H-pad*2)
        const x = pad + i*bw
        const y = H - pad - h
        const grd = ctx.createLinearGradient(0,0,0,H)
        grd.addColorStop(0,'#22d3ee88')
        grd.addColorStop(1,'#0ea5e988')
        ctx.fillStyle = grd
        ctx.fillRect(x+4, y, bw-8, h)
      })
    } else {
      ctx.strokeStyle = '#22d3ee'
      ctx.lineWidth = 2
      ctx.beginPath()
      data.forEach((v,i)=>{
        const x = pad + i*((W-pad*2)/(data.length-1||1))
        const y = H - pad - (v/maxVal)*(H-pad*2)
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
      })
      ctx.stroke()
    }
  },[type, JSON.stringify(data)])

  return <canvas ref={ref} width={400} height={height} className="w-full"/>
}
