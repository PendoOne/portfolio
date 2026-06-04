import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeInView } from '../ui/FadeInView'

const SKILLS = [
  'Adobe Premiere Pro',
  'DaVinci Resolve',
  'After Effects',
  'Stable Diffusion',
  'ComfyUI',
  'TouchDesigner',
  'React',
  'TypeScript',
  'Python',
  'Figma',
]

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <FadeInView>
        <SectionHeading
          title="关于我"
          subtitle="一个在技术与艺术之间探索的创作者"
        />
      </FadeInView>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <FadeInView delay={0.1}>
          <div className="space-y-5 text-muted leading-relaxed">
            <p className="text-lg">
              你好，我是 Pendo。我的创作围绕三个方向展开：AIGC 视频制作、动效设计、
              以及独立应用开发。
            </p>
            <p>
              在视频创作中，我探索 AI 生成与传统剪辑的融合；在动效设计里，
              我追求视觉节奏与用户感知的平衡；在代码世界中，我将想法构建成可用的工具。
            </p>
            <p>
              我相信好的作品不局限于单一媒介——跨界碰撞往往能带来最有趣的结果。
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <h3 className="font-display text-xl font-medium text-primary dark:text-white mb-5">
            技能 & 工具
          </h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm rounded-full
                           bg-surface-alt dark:bg-neutral-800
                           text-primary dark:text-neutral-200
                           border border-border dark:border-neutral-700
                           hover:border-accent dark:hover:border-accent
                           transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeInView>
      </div>
    </SectionWrapper>
  )
}
