import { memo } from "react";
import { useNavigate } from "react-router-dom";
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

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    location,
    foundedOn,
    logoUrl,
    description,
    averageRating,
    reviewCount,
  } = company;

  return (
    <div className="flex flex-col gap-4 rounded-card border border-border-base bg-white p-4 shadow-card sm:flex-row sm:items-center sm:p-5">
      <div className="flex items-center gap-4 sm:contents">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="h-16 w-16 shrink-0 rounded-field object-cover sm:h-28 sm:w-28"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-field bg-dark-btn sm:h-28 sm:w-28">
            <span
              className="font-normal not-italic"
              style={{ fontSize: "11px", lineHeight: "16px", color: "rgba(255,255,255,0.898)" }}
            >
              {getInitials(name)}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1 sm:hidden">
          <h3 className="truncate text-base font-semibold text-text-heading">{name}</h3>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="hidden truncate text-lg font-semibold text-text-heading sm:block md:text-xl">
          {name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{location}</span>
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-text-heading">{averageRating || 0}</span>
          <StarRating value={averageRating || 0} size="sm" />
          {reviewCount > 0 ? (
            <span className="text-sm font-bold text-text-heading">{reviewCount} Reviews</span>
          ) : (
            <span className="text-sm text-text-muted">No reviews yet</span>
          )}
        </div>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-text-body">{description}</p>
        )}
      </div>

      <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-between sm:self-stretch">
        <span className="text-xs text-text-muted sm:text-sm">
          Founded on {formatDateOnly(foundedOn)}
        </span>
        <Button
          variant="dark"
          size="sm"
          fullWidth={false}
          onClick={() => navigate(`/company/${_id}`)}
          className="w-full sm:w-auto"
        >
          Detail Review
        </Button>
      </div>
    </div>
  );
};

export default memo(CompanyCard);
