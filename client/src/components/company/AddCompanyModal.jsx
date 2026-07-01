import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MapPin, ImagePlus } from "lucide-react";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import TextArea from "../common/TextArea.jsx";
import DateInput from "../common/DateInput.jsx";
import Button from "../common/Button.jsx";
import { createCompany } from "../../api/companyApi.js";
import { uploadImage } from "../../api/uploadApi.js";

const initialForm = { name: "", location: "", foundedOn: "", city: "", description: "" };

const AddCompanyModal = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Company name is required";
    else if (form.name.trim().length < 2)
      nextErrors.name = "Company name must be at least 2 characters";

    if (!form.location.trim()) nextErrors.location = "Location is required";
    else if (form.location.trim().length < 5)
      nextErrors.location = "Location must be at least 5 characters";

    if (!form.foundedOn) nextErrors.foundedOn = "Founded date is required";
    else if (new Date(form.foundedOn).getTime() > Date.now())
      nextErrors.foundedOn = "Founded date cannot be in the future";

    if (!form.city.trim()) nextErrors.city = "City is required";
    else if (form.city.trim().length < 2)
      nextErrors.city = "City must be at least 2 characters";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    setLogoFile(null);
    setLogoPreview("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      let logoUrl = "";
      if (logoFile) {
        const uploaded = await uploadImage(logoFile);
        logoUrl = uploaded.url;
      }

      await createCompany({ ...form, logoUrl });
      toast.success("Company added successfully");
      onCreated?.();
      handleClose();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add company";
      if (err.response?.status === 409) {
        setErrors((prev) => ({ ...prev, name: message }));
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Company">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-muted">
            Company Logo
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-field border border-dashed border-border-base bg-gray-50 text-text-muted hover:border-brand-purple hover:text-brand-purple"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus className="h-6 w-6" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoSelect}
              className="hidden"
            />
            <span className="text-xs text-text-muted">
              {logoFile ? logoFile.name : "Upload a logo image (optional)"}
            </span>
          </div>
        </div>

        <Input
          label="Company name"
          placeholder="Enter..."
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
        <Input
          label="Location"
          icon={MapPin}
          placeholder="Select Location"
          value={form.location}
          onChange={handleChange("location")}
          error={errors.location}
        />
        <DateInput
          label="Founded on"
          value={form.foundedOn}
          onChange={handleChange("foundedOn")}
          error={errors.foundedOn}
        />
        <Input
          label="City"
          placeholder="Enter..."
          value={form.city}
          onChange={handleChange("city")}
          error={errors.city}
        />
        <TextArea
          label="Description"
          placeholder="A short description of the company (optional)"
          rows={3}
          value={form.description}
          onChange={handleChange("description")}
        />

        <div className="mt-2 flex justify-center">
          <Button type="submit" variant="gradient" loading={submitting} className="px-10">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCompanyModal;
