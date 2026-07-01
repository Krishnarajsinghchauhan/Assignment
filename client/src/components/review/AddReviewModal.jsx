import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import TextArea from "../common/TextArea.jsx";
import StarRating from "../common/StarRating.jsx";
import Button from "../common/Button.jsx";
import { createReview } from "../../api/reviewApi.js";
import { getRatingLabel } from "../../utils/ratingLabels.js";

const initialForm = { fullName: "", subject: "", text: "", rating: 0 };

const AddReviewModal = ({ isOpen, onClose, companyId, onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleRatingChange = (value) => {
    setForm((prev) => ({ ...prev, rating: value }));
    setErrors((prev) => ({ ...prev, rating: undefined }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required";
    else if (form.fullName.trim().length < 2)
      nextErrors.fullName = "Full name must be at least 2 characters";

    if (!form.subject.trim()) nextErrors.subject = "Subject is required";
    else if (form.subject.trim().length < 3)
      nextErrors.subject = "Subject must be at least 3 characters";

    if (!form.text.trim()) nextErrors.text = "Review is required";
    else if (form.text.trim().length < 10)
      nextErrors.text = "Review must be at least 10 characters";

    if (!form.rating) nextErrors.rating = "Please select a rating";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createReview(companyId, form);
      toast.success("Review added successfully");
      onCreated?.();
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Review">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          placeholder="Enter"
          value={form.fullName}
          onChange={handleChange("fullName")}
          error={errors.fullName}
        />
        <Input
          label="Subject"
          placeholder="Enter"
          value={form.subject}
          onChange={handleChange("subject")}
          error={errors.subject}
        />
        <TextArea
          label="Enter your Review"
          placeholder="Description"
          value={form.text}
          onChange={handleChange("text")}
          error={errors.text}
        />

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-text-heading">Rating</label>
          <div className="flex items-center gap-3">
            <StarRating value={form.rating} interactive onChange={handleRatingChange} size="lg" />
            {form.rating > 0 && (
              <span className="text-sm font-medium text-text-muted">
                {getRatingLabel(form.rating)}
              </span>
            )}
          </div>
          {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
        </div>

        <div className="mt-2 flex justify-center">
          <Button type="submit" variant="gradient" loading={submitting} className="px-10">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddReviewModal;
