import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { loginUser } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

const initialForm = { email: "", password: "" };

const LoginModal = ({ isOpen, onClose, onSwitchToSignUp }) => {
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
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!form.password) nextErrors.password = "Password is required";
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
      const result = await loginUser(form);
      login(result);
      toast.success(`Welcome back, ${result.user.name}!`);
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Login">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange("password")}
          error={errors.password}
        />

        <div className="mt-2 flex flex-col items-center gap-3">
          <Button type="submit" variant="gradient" loading={submitting} className="px-10">
            Login
          </Button>
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-sm text-text-muted hover:text-brand-purple"
          >
            Don&apos;t have an account? <span className="font-medium text-brand-purple">Sign Up</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
