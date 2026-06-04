interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <h2 className="font-display text-3xl md:text-4xl font-medium text-primary dark:text-white mb-4">
        {title}
      </h2>
      <div className="w-10 h-0.5 bg-accent" />
      {subtitle && (
        <p className="mt-4 text-muted text-lg max-w-xl">{subtitle}</p>
      )}
    </div>
  )
}
