import SelectDropdown from "../common/SelectDropdown.jsx";
import ReviewCard from "./ReviewCard.jsx";

const SORT_OPTIONS = [
  { value: "date", label: "Newest" },
  { value: "rating", label: "Rating" },
  { value: "relevance", label: "Relevance" },
];

const ReviewSkeleton = () => (
  <div className="animate-pulse py-6">
    <div className="flex gap-3">
      <div className="h-11 w-11 rounded-full bg-gray-200" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 w-1/4 rounded bg-gray-200" />
        <div className="h-3 w-1/5 rounded bg-gray-200" />
      </div>
    </div>
    <div className="mt-4 h-3 w-full rounded bg-gray-200" />
    <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
  </div>
);

const ReviewList = ({ reviews, loading, sort, onSortChange, onLike, onShare }) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-text-muted">
          Result Found: {loading ? "…" : reviews.length}
        </p>
        <SelectDropdown
          options={SORT_OPTIONS}
          value={sort}
          onChange={onSortChange}
          className="w-40"
        />
      </div>

      <div className="flex flex-col divide-y divide-border-base">
        {loading && Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)}

        {!loading && reviews.length === 0 && (
          <p className="py-10 text-center text-text-muted">
            No reviews yet. Be the first to share your experience.
          </p>
        )}

        {!loading &&
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onLike={onLike}
              onShare={onShare}
            />
          ))}
      </div>
    </div>
  );
};

export default ReviewList;
