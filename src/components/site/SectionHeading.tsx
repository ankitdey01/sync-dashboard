export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase dark:text-white">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {body && <p className="mt-3 leading-7 text-zinc-600 dark:text-white">{body}</p>}
    </div>
  );
}
