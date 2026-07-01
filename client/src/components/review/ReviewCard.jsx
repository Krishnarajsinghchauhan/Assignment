import { memo, useState } from "react";
import toast from "react-hot-toast";
import { Heart, Share2 } from "lucide-react";
import Avatar from "../common/Avatar.jsx";
import StarRating from "../common/StarRating.jsx";
import { formatDateTime } from "../../utils/formatDate.js";
import { useAuth } from "../../context/AuthContext.jsx";

const ReviewCard = ({ review, onLike, onShare }) => {
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const { fullName, subject, text, rating, avatarUrl, likes, createdAt } = review;

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error("Please login to like a review");
      return;
    }
    if (liked) return;
    setLiked(true);
    onLike(review._id);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <Avatar name={fullName} src={avatarUrl} />
          <div>
            <p className="font-semibold text-text-heading">{fullName}</p>
            {subject && <p className="text-xs text-text-muted">{subject}</p>}
            <p className="text-xs text-text-muted">{formatDateTime(createdAt)}</p>
          </div>
        </div>
        <StarRating value={rating} size="sm" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-text-body">{text}</p>

      <div className="mt-4 flex items-center gap-5">
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition ${
            liked ? "text-rose-500" : "text-text-muted hover:text-rose-500"
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-rose-500" : ""}`} />
          {likes}
        </button>
        <button
          type="button"
          onClick={() => onShare(review)}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-brand-purple"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
};

export default memo(ReviewCard);
