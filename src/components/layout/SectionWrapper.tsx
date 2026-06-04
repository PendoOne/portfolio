interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`max-w-6xl mx-auto px-6 py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  )
}
