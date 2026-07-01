import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { registerUser } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

const initialForm = { name: "", email: "", password: "" };

const SignUpModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { login } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
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
      const result = await registerUser(form);
      login(result);
      toast.success(`Welcome, ${result.user.name}!`);
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to sign up");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign Up">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={handleChange("password")}
          error={errors.password}
        />

        <div className="mt-2 flex flex-col items-center gap-3">
          <Button type="submit" variant="gradient" loading={submitting} className="px-10">
            Sign Up
          </Button>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-text-muted hover:text-brand-purple"
          >
            Already have an account? <span className="font-medium text-brand-purple">Login</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignUpModal;
