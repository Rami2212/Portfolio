'use client'

import { useEffect, useRef } from 'react'

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let stars: Array<{
      x: number
      y: number
      radius: number
      opacity: number
      twinkleSpeed: number
      twinklePhase: number
      driftX: number
      driftY: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const numStars = Math.floor((canvas.width * canvas.height) / 3000)
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.05 + 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.1,
          driftY: (Math.random() - 0.5) * 0.1,
        })
      }
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5

        star.x += star.driftX
        star.y += star.driftY
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(drawStars)
    }

    resizeCanvas()
    drawStars()

    window.addEventListener('resize', resizeCanvas)
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}