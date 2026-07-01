import { MapPin } from "lucide-react";
import Button from "../common/Button.jsx";
import StarRating from "../common/StarRating.jsx";
import { formatDateOnly } from "../../utils/formatDate.js";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const CompanyHeader = ({ company, onAddReview }) => {
  const { name, location, foundedOn, logoUrl, description, averageRating, reviewCount } =
    company;

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="h-24 w-24 shrink-0 self-start rounded-field object-cover sm:h-32 sm:w-32 sm:self-auto"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-field bg-dark-btn sm:h-32 sm:w-32 sm:self-auto">
            <span
              className="font-normal not-italic"
              style={{ fontSize: "11px", lineHeight: "16px", color: "rgba(255,255,255,0.898)" }}
            >
              {getInitials(name)}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-text-heading sm:text-2xl md:text-3xl">{name}</h1>
          <p className="mt-1.5 flex items-center gap-1 text-sm text-text-muted">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{location}</span>
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-bold text-text-heading">{averageRating || 0}</span>
            <StarRating value={averageRating || 0} size="md" />
            {reviewCount > 0 ? (
              <span className="text-base font-bold text-text-heading">{reviewCount} Reviews</span>
            ) : (
              <span className="text-sm text-text-muted">No reviews yet</span>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-between sm:self-stretch">
          <span className="text-xs text-text-muted sm:text-sm">
            Founded on {formatDateOnly(foundedOn)}
          </span>
          <Button variant="gradient" onClick={onAddReview} className="w-full sm:w-auto">
            + Add Review
          </Button>
        </div>
      </div>

      {description && (
        <p className="mt-4 text-sm leading-relaxed text-text-body">{description}</p>
      )}
    </div>
  );
};

export default CompanyHeader;
