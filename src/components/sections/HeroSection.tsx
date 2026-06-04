import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const BLOBS = [
  {
    left: '5%',
    top: '5%',
    size: 700,
    color: 'radial-gradient(circle at 30% 30%, rgba(129,140,248,0.55) 0%, rgba(99,102,241,0.25) 35%, transparent 68%)',
    animate: {
      x: [0, 180, -80, 120, 60, 0],
      y: [0, -100, 120, -40, 80, 0],
    },
    duration: 24,
  },
  {
    left: '55%',
    top: '-10%',
    size: 800,
    color: 'radial-gradient(circle at 50% 40%, rgba(168,85,247,0.5) 0%, rgba(147,51,234,0.2) 38%, transparent 70%)',
    animate: {
      x: [0, -150, 100, -60, 140, 0],
      y: [0, 160, -80, 130, -40, 0],
    },
    duration: 28,
  },
  {
    left: '-8%',
    top: '55%',
    size: 650,
    color: 'radial-gradient(circle at 45% 45%, rgba(236,72,153,0.45) 0%, rgba(219,39,119,0.18) 38%, transparent 72%)',
    animate: {
      x: [0, 200, -100, 150, -40, 0],
      y: [0, -130, 60, -160, 40, 0],
    },
    duration: 26,
  },
  {
    left: '60%',
    top: '50%',
    size: 720,
    color: 'radial-gradient(circle at 55% 50%, rgba(56,189,248,0.48) 0%, rgba(14,165,233,0.2) 40%, transparent 72%)',
    animate: {
      x: [0, -180, 80, -120, 60, 0],
      y: [0, 140, -100, 110, -60, 0],
    },
    duration: 30,
  },
  {
    left: '30%',
    top: '30%',
    size: 500,
    color: 'radial-gradient(circle at 40% 35%, rgba(251,146,60,0.38) 0%, rgba(249,115,22,0.15) 40%, transparent 75%)',
    animate: {
      x: [0, 130, -160, 60, -100, 0],
      y: [0, -90, 100, -140, 50, 0],
    },
    duration: 20,
  },
]

export function HeroSection() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0f]"
    >
      {/* ========== 流动色块 ========== */}
      <div className="absolute inset-0 z-0">
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: blob.left,
              top: blob.top,
              width: blob.size,
              height: blob.size,
              marginLeft: -blob.size / 2,
              marginTop: -blob.size / 2,
              background: blob.color,
              filter: 'blur(70px)',
              opacity: 0.8,
              mixBlendMode: isDark ? 'screen' : 'multiply',
            }}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ========== 渐变遮罩 ========== */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(10,10,15,0.5) 70%, rgba(10,10,15,0.9) 100%)'
            : 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(255,255,255,0.45) 65%, rgba(255,255,255,0.9) 100%)',
        }}
      />

      {/* ========== 主内容 ========== */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm font-medium text-sky-400 tracking-[0.25em] uppercase mb-8"
        >
          Creative Developer & Motion Designer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold
                     text-primary dark:text-white leading-[1.05] tracking-tight"
        >
          用代码与
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-primary dark:text-white">
              想象力
            </span>
          </span>
          创造世界
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 text-lg md:text-xl text-muted dark:text-neutral-400 max-w-xl mx-auto leading-relaxed"
        >
          从 AIGC 视频创作到独立应用开发，在技术与艺术的交汇处探索无限可能。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#works"
            className="group relative inline-flex items-center px-7 py-3.5 rounded-full
                       bg-neutral-900 dark:bg-white text-white dark:text-neutral-900
                       text-sm font-medium overflow-hidden
                       hover:shadow-xl hover:shadow-indigo-500/20
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">探索作品</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3.5 rounded-full
                       text-neutral-600 dark:text-neutral-300 text-sm font-medium
                       border border-neutral-200 dark:border-neutral-700
                       hover:border-indigo-300 dark:hover:border-indigo-500/50
                       bg-white/40 dark:bg-white/5 backdrop-blur-md
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            联系我
          </a>
        </motion.div>
      </div>

      {/* ========== 滚动指示器 ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-neutral-300 dark:border-neutral-600 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2.5 rounded-full bg-indigo-500"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
