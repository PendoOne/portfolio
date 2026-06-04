import type { WorkItem } from '../../data/schema'
import { categoryLabels } from '../../data/schema'
import { VideoPlayer } from './VideoPlayer'
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'

interface WorkCardProps {
  work: WorkItem
  index: number
}

export function WorkCard({ work, index }: WorkCardProps) {
  const isMedia = work.category === 'video' || work.category === 'motion'
  const isDev = work.category === 'dev'
  const demoLink = work.links?.find((l) => l.label === '在线演示')?.url
  const githubLink = work.links?.find((l) => l.label === 'GitHub')?.url
  const poster = work.posterSrc || work.thumbnail
  const isVertical = work.vertical

  const imgClass = isVertical
    ? 'w-full aspect-video object-contain bg-neutral-100 dark:bg-neutral-800 group-hover:scale-[1.02] transition-transform duration-500'
    : 'w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-500'

  return (
    <div
      className="group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Media / Thumbnail */}
      {isMedia && work.videoSrc ? (
        <div className="relative rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-border dark:border-neutral-800">
          <VideoPlayer src={work.videoSrc} poster={work.posterSrc} title={work.title} vertical={work.vertical} />
        </div>
      ) : isDev && demoLink ? (
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-border dark:border-neutral-800 group/link cursor-pointer"
        >
          {poster ? (
            <img
              src={poster}
              alt={work.title}
              className={imgClass}
            />
          ) : (
            <div className="w-full aspect-video flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-850">
              <span className="text-4xl font-display text-neutral-300 dark:text-neutral-700">{'{ }'}</span>
              <span className="text-xs text-muted">点击访问</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover/link:bg-black/10 dark:group-hover/link:bg-white/5 transition-colors flex items-center justify-center">
            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-primary dark:text-white text-xs font-medium opacity-0 group-hover/link:opacity-100 transition-all translate-y-2 group-hover/link:translate-y-0 shadow-lg">
              访问网站 <FiArrowUpRight size={14} />
            </span>
          </div>
        </a>
      ) : (
        <div className="relative rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-border dark:border-neutral-800">
          {poster ? (
            <img
              src={poster}
              alt={work.title}
              className={imgClass}
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <span className="text-4xl font-display text-neutral-300 dark:text-neutral-700">
                {work.category === 'dev' ? '{ }' : '▶'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-accent tracking-wider uppercase">
            {categoryLabels[work.category]}
          </span>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">{work.year}</span>
        </div>

        {isDev && demoLink ? (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-lg text-primary dark:text-white hover:text-accent transition-colors"
          >
            {work.title}
            <FiArrowUpRight size={16} className="opacity-40" />
          </a>
        ) : (
          <h3 className="font-medium text-lg text-primary dark:text-white">
            {work.title}
          </h3>
        )}

        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {work.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs rounded-full
                         bg-surface-alt dark:bg-neutral-800
                         text-muted dark:text-neutral-400
                         border border-border dark:border-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Dev links */}
        {work.links && work.links.length > 0 && (
          <div className="flex items-center gap-3 pt-2">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted
                           hover:text-accent transition-colors"
              >
                <FiExternalLink size={13} />
                在线演示
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted
                           hover:text-accent transition-colors"
              >
                <FiGithub size={13} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
