import { useScrollSpy } from '../../hooks/useScrollSpy'
import { ThemeToggle } from '../ui/ThemeToggle'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'works', label: '作品' },
  { id: 'contact', label: '联系' },
]

export function Navbar() {
  const activeId = useScrollSpy(['hero', 'about', 'works', 'contact'], 120)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-primary/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-xl font-semibold text-primary dark:text-white tracking-tight"
        >
          Portfolio
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                activeId === item.id
                  ? 'text-primary dark:text-white'
                  : 'text-muted hover:text-primary dark:hover:text-white'
              }`}
            >
              {item.label}
              {activeId === item.id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 flex items-center justify-center text-primary dark:text-white"
            aria-label="菜单"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-primary border-t border-border dark:border-neutral-800">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  activeId === item.id
                    ? 'text-accent'
                    : 'text-muted hover:text-primary dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
