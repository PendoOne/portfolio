import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeInView } from '../ui/FadeInView'
import { FiGithub, FiMail, FiSend } from 'react-icons/fi'

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <FadeInView>
        <SectionHeading
          title="联系"
          subtitle="有合作想法？欢迎随时交流"
        />
      </FadeInView>

      <FadeInView delay={0.1}>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <p className="text-muted leading-relaxed">
              无论是有合作项目、工作机会，还是想交流技术想法，
              都非常欢迎与我联系。
            </p>
            <div className="space-y-4">
              <a
                href="mailto:ychen3389@outlook.com"
                className="flex items-center gap-3 text-muted hover:text-accent transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-surface-alt dark:bg-neutral-800
                               flex items-center justify-center border border-border dark:border-neutral-700
                               group-hover:border-accent transition-colors">
                  <FiMail size={18} />
                </span>
                <span>ychen3389@outlook.com</span>
              </a>
              <a
                href="https://github.com/PendoOne"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-accent transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-surface-alt dark:bg-neutral-800
                               flex items-center justify-center border border-border dark:border-neutral-700
                               group-hover:border-accent transition-colors">
                  <FiGithub size={18} />
                </span>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary dark:text-white mb-1.5">
                姓名
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700
                           bg-surface dark:bg-neutral-900 text-primary dark:text-white
                           placeholder:text-muted text-sm
                           focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                           transition-colors"
                placeholder="你的名字"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-white mb-1.5">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700
                           bg-surface dark:bg-neutral-900 text-primary dark:text-white
                           placeholder:text-muted text-sm
                           focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                           transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary dark:text-white mb-1.5">
                留言
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700
                           bg-surface dark:bg-neutral-900 text-primary dark:text-white
                           placeholder:text-muted text-sm resize-none
                           focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                           transition-colors"
                placeholder="说点什么吧..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                         bg-primary dark:bg-white text-white dark:text-primary
                         text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <FiSend size={15} />
              发送消息
            </button>
          </form>
        </div>
      </FadeInView>
    </SectionWrapper>
  )
}
