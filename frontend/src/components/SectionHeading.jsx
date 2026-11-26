function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <header className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-olive">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-[-0.03em] text-charcoal sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
          {description}
        </p>
      )}
    </header>
  )
}

export default SectionHeading
