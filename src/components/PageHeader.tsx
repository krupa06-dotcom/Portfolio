export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-12">
      <p className="font-semibold text-xs tracking-[0.15em] uppercase text-muted mb-2">
        {eyebrow}
      </p>
      <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-8xl tracking-[-0.03em] leading-[0.95] break-words">
        {title}
      </h1>
      <p className="text-muted text-sm mt-2 max-w-lg leading-[1.6]">
        {description}
      </p>
    </div>
  );
}
