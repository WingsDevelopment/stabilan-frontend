import { ImageWrapper } from "../image/ImageWrapper/ImageWrapper";
import { Typography } from "../text/Typography/Typography";

interface EmptyContentProps {
  title?: string;
  img?: string;
  description?: string;
  className?: string;
}

export function EmptyContent({
  title = "No data",
  img,
  description,
  className,
}: EmptyContentProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full text-center p-8 ${className}`}
    >
      <ImageWrapper
        alt="empty content"
        width={600}
        height={600}
        src={img || "/illustration_empty_content.svg"}
        className="h-60 mb-3" // Tailwind class for height and margin-bottom
      />

      <Typography type="h5" className="text-lg font-semibold mb-2">
        {title}
      </Typography>

      {description && (
        <Typography className="text-base text-gray-600">
          {description}
        </Typography>
      )}
    </div>
  );
}
