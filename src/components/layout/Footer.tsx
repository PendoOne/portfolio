import { FiGithub, FiMail, FiArrowUp } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="border-t border-border dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="#hero"
            className="text-muted hover:text-primary dark:hover:text-white transition-colors"
            aria-label="回到顶部"
          >
            <FiArrowUp size={16} />
          </a>
          <a
            href="https://github.com/PendoOne"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={16} />
          </a>
          <a
            href="mailto:ychen3389@outlook.com"
            className="text-muted hover:text-primary dark:hover:text-white transition-colors"
            aria-label="邮箱"
          >
            <FiMail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
