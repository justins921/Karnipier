interface PlaceholderImageProps {
  label: string;
  className?: string;
  aspectRatio?: string;
}

export default function PlaceholderImage({
  label,
  className = "",
  aspectRatio = "aspect-video",
}: PlaceholderImageProps) {
  return (
    <div
      className={`bg-navy-100 flex items-center justify-center text-navy-500 text-sm font-medium text-center p-4 rounded-lg ${aspectRatio} ${className}`}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}
