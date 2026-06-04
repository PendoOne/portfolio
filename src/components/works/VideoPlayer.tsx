import { useState, useRef, useCallback, useEffect } from 'react'
import { FiPlay, FiPause, FiX, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  vertical?: boolean
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

function formatTime(seconds: number) {
  if (!seconds || !isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function VideoPlayer({ src, poster, title, vertical }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    setIsOpen(true)
    setCurrentTime(0)
    setPlaybackRate(1)
    setTimeout(() => {
      videoRef.current?.play()
      setIsPlaying(true)
    }, 100)
  }

  const handleClose = () => {
    videoRef.current?.pause()
    setIsPlaying(false)
    setIsOpen(false)
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleSpeedChange = (speed: number) => {
    if (!videoRef.current) return
    videoRef.current.playbackRate = speed
    setPlaybackRate(speed)
    setShowSpeedMenu(false)
  }

  // Sync time
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => {
      if (!isDragging) setCurrentTime(video.currentTime)
    }
    const onLoaded = () => setDuration(video.duration)
    const onEnd = () => setIsPlaying(false)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('ended', onEnd)
    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('ended', onEnd)
    }
  }, [isDragging, isOpen])

  // Progress bar click / drag
  const seekTo = useCallback((clientX: number) => {
    const bar = progressRef.current
    const video = videoRef.current
    if (!bar || !video || !duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    video.currentTime = ratio * duration
    setCurrentTime(ratio * duration)
  }, [duration])

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    seekTo(e.clientX)
  }

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent) => seekTo(e.clientX)
    const onUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isDragging, seekTo])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const posterClass = vertical
    ? 'w-full h-full object-contain bg-neutral-100 dark:bg-neutral-800'
    : 'w-full h-full object-cover'

  const modalVideoClass = vertical
    ? 'max-h-[75vh] w-auto mx-auto rounded-lg'
    : 'w-full rounded-lg'

  const modalContainerClass = vertical
    ? 'relative flex items-center justify-center'
    : 'relative max-w-5xl w-full'

  return (
    <>
      {/* Thumbnail trigger */}
      <button
        onClick={handleOpen}
        className="relative w-full aspect-video rounded-lg overflow-hidden
                   bg-neutral-100 dark:bg-neutral-800 group cursor-pointer"
      >
        {poster ? (
          <img src={poster} alt={title || ''} className={posterClass} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted text-sm">点击播放</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center
                          opacity-0 group-hover:opacity-100 transition-opacity shadow-lg
                          translate-y-1 group-hover:translate-y-0 transition-transform">
            <FiPlay size={22} className="text-primary ml-0.5" />
          </div>
        </div>
      </button>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Close button — top right */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center
                         rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <FiX size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={modalContainerClass}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Click to play/pause on video */}
              <div className="relative group/video" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={src}
                  className={modalVideoClass}
                  playsInline
                  controls={false}
                />

                {/* Big center play/pause indicator */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <FiPlay size={28} className="text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Control bar */}
              <div className="mt-2 space-y-2">
                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="relative w-full h-1 bg-white/20 rounded-full cursor-pointer group/bar"
                  onMouseDown={handleProgressMouseDown}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-accent rounded-full pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full
                               opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none shadow"
                    style={{ left: `${progress}%`, marginLeft: -6 }}
                  />
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    {/* Play / Pause */}
                    <button onClick={togglePlay} className="hover:text-accent-light transition-colors">
                      {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                    </button>

                    {/* Mute */}
                    <button onClick={toggleMute} className="hover:text-accent-light transition-colors">
                      {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                    </button>

                    {/* Time */}
                    <span className="text-xs text-white/70 tabular-nums min-w-[90px]">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Speed selector */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="text-xs font-medium text-white/80 hover:text-white transition-colors
                                   px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                      >
                        {playbackRate}x
                      </button>
                      <AnimatePresence>
                        {showSpeedMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute bottom-full right-0 mb-2 bg-neutral-800 rounded-lg
                                       shadow-xl border border-neutral-700 overflow-hidden min-w-[80px]"
                          >
                            {SPEEDS.map((speed) => (
                              <button
                                key={speed}
                                onClick={() => handleSpeedChange(speed)}
                                className={`block w-full text-left px-4 py-2 text-xs transition-colors ${
                                  playbackRate === speed
                                    ? 'text-accent bg-white/10'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {speed}x
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
