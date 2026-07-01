import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchCompanyById } from "../api/companyApi.js";
import { likeReview } from "../api/reviewApi.js";
import { useReviews } from "../hooks/useReviews.js";
import CompanyHeader from "../components/company/CompanyHeader.jsx";
import ReviewList from "../components/review/ReviewList.jsx";
import AddReviewModal from "../components/review/AddReviewModal.jsx";

const CompanyDetailPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [reviewSort, setReviewSort] = useState("date");
  const [modalOpen, setModalOpen] = useState(false);

  const {
    reviews,
    setReviews,
    loading: reviewsLoading,
    refresh: refreshReviews,
  } = useReviews(id, reviewSort);

  const loadCompany = useCallback(async () => {
    setCompanyLoading(true);
    try {
      const data = await fetchCompanyById(id);
      setCompany(data);
    } catch (err) {
      toast.error("Failed to load company");
    } finally {
      setCompanyLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCompany();
  }, [loadCompany]);

  const handleReviewCreated = () => {
    refreshReviews();
    loadCompany();
  };

  const handleLike = async (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => (r._id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
    try {
      await likeReview(reviewId);
    } catch (err) {
      const message =
        err.response?.status === 401
          ? "Please login to like a review"
          : "Failed to like review";
      toast.error(message);
      refreshReviews();
    }
  };

  const handleShare = async (review) => {
    const shareUrl = `${window.location.origin}/company/${id}`;
    const shareData = {
      title: company?.name || "Review&RATE",
      text: `${review.fullName}'s review: ${review.subject}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled share sheet
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied");
      } catch {
        toast.error("Could not copy link");
      }
    }
  };

  if (companyLoading) {
    return (
      <main className="mx-auto max-w-container px-4 py-6 md:px-8 lg:px-16">
        <div className="h-40 animate-pulse rounded-card bg-gray-100" />
      </main>
    );
  }

  if (!company) {
    return (
      <main className="mx-auto max-w-container px-4 py-12 text-center text-text-muted md:px-8 lg:px-16">
        Company not found.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-container px-4 py-6 md:px-8 lg:px-16">
      <div className="my-6  border-t border-border-base" />
      <div className="rounded-card border border-border-base bg-white p-5 shadow-card sm:p-6">
        <CompanyHeader company={company} onAddReview={() => setModalOpen(true)} />
        <div className="my-6  " />

        <ReviewList
          reviews={reviews}
          loading={reviewsLoading}
          sort={reviewSort}
          onSortChange={setReviewSort}
          onLike={handleLike}
          onShare={handleShare}
        />
      </div>

      <AddReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        companyId={id}
        onCreated={handleReviewCreated}
      />
    </main>
  );
};

export default CompanyDetailPage;
