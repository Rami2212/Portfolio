'use client'

export default function GradientBackground() {
  return (
    <>
      {/* Base gradient background */}
      <div
        className="fixed inset-0 bg-gradient-to-b from-[#050014] via-[#050014] to-black opacity-95"
        style={{ zIndex: 0 }}
      />

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Purple orb - top right */}
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />

        {/* Blue orb - bottom left - INCREASED */}
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/40 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />

        {/* Center purple-blue orb - INCREASED BLUE */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-purple-600/10 via-blue-500/15 to-blue-500/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '4s' }}
        />
      </div>
    </>
  )
}