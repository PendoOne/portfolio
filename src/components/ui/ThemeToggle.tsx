import { useTheme } from '../../hooks/useTheme'
import { FiSun, FiMoon } from 'react-icons/fi'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full
                 text-muted hover:text-primary dark:hover:text-white
                 transition-colors duration-300"
      aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}
