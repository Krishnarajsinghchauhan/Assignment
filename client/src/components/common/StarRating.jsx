import { Star } from "lucide-react";

const SIZE_MAP = {
  sm: 14,
  md: 18,
  lg: 24,
};

const StarRating = ({
  value = 0,
  max = 5,
  interactive = false,
  onChange,
  size = "md",
  className = "",
}) => {
  const px = SIZE_MAP[size] || SIZE_MAP.md;
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars.map((starIndex) => {
        const fillRatio = Math.min(Math.max(value - (starIndex - 1), 0), 1);
        const isInteractiveFilled = interactive && starIndex <= value;

        if (interactive) {
          return (
            <button
              key={starIndex}
              type="button"
              onClick={() => onChange?.(starIndex)}
              className="cursor-pointer"
              aria-label={`${starIndex} star`}
            >
              <Star
                width={px}
                height={px}
                className={isInteractiveFilled ? "fill-star-gold text-star-gold" : "fill-star-empty text-star-empty"}
              />
            </button>
          );
        }

        return (
          <span
            key={starIndex}
            className="relative inline-block"
            style={{ width: px, height: px }}
          >
            <Star width={px} height={px} className="absolute inset-0 fill-star-empty text-star-empty" />
            {fillRatio > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillRatio * 100}%` }}
              >
                <Star width={px} height={px} className="fill-star-gold text-star-gold" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
