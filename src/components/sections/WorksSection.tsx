import { useState, useMemo } from 'react'
import type { WorkCategory } from '../../data/schema'
import { works } from '../../data/projects'
import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeInView } from '../ui/FadeInView'
import { CategoryFilter } from '../works/CategoryFilter'
import { WorkCard } from '../works/WorkCard'
import { motion, AnimatePresence } from 'framer-motion'

export function WorksSection() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory | 'all'>('all')

  const filteredWorks = useMemo(() => {
    if (activeCategory === 'all') return works
    return works.filter((w) => w.category === activeCategory)
  }, [activeCategory])

  return (
    <SectionWrapper id="works">
      <FadeInView>
        <SectionHeading
          title="作品"
          subtitle="每一个项目都是一次探索与表达"
        />
      </FadeInView>

      <FadeInView delay={0.1}>
        <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />
      </FadeInView>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <WorkCard work={work} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredWorks.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted py-16"
        >
          暂无该分类的作品，敬请期待。
        </motion.p>
      )}
    </SectionWrapper>
  )
}
