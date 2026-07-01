import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Menu, X, LogOut } from "lucide-react";
import { useFilter } from "../../context/FilterContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Avatar from "../common/Avatar.jsx";
import SignUpModal from "../auth/SignUpModal.jsx";
import LoginModal from "../auth/LoginModal.jsx";

const Navbar = () => {
  const { search, setSearch } = useFilter();
  const { user, isAuthenticated, logout } = useAuth();
  const [localSearch, setLocalSearch] = useState(search);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(localSearch);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [localSearch, setSearch]);

  const authLinks = (
    <>
      <button
        type="button"
        onClick={() => setAuthModal("signup")}
        className="text-sm font-medium text-text-heading hover:text-brand-purple"
      >
        SignUp
      </button>
      <button
        type="button"
        onClick={() => setAuthModal("login")}
        className="text-sm font-medium text-text-heading hover:text-brand-purple"
      >
        Login
      </button>
    </>
  );

  const userMenu = (
    <div className="flex items-center gap-3">
      <Avatar name={user?.name} size="sm" />
      <span className="text-sm font-medium text-text-heading">{user?.name}</span>
      <button
        type="button"
        onClick={logout}
        aria-label="Logout"
        className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-brand-purple"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border-base bg-white shadow-sm">
      <div className="mx-auto flex max-w-container flex-wrap items-center gap-3 px-4 py-3 md:px-8 lg:px-16">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-logo-gradient">
            <Star className="h-4 w-4 fill-white text-white" />
          </span>
          <span className="text-lg leading-none">
            <span className="font-medium text-text-heading">Review</span>
            <span className="font-semibold text-brand-purple">&amp;</span>
            <span className="font-bold text-text-heading">RATE</span>
          </span>
        </Link>

        <div className="order-3 w-full md:order-2 md:w-auto md:flex-1 md:px-8">
          <div className="relative w-full md:max-w-md md:mx-auto">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-search border border-border-base px-4 py-2 pr-10 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />
          </div>
        </div>

        <div className="order-2 ml-auto flex items-center gap-4 md:order-3 md:ml-0">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? userMenu : authLinks}
          </div>
        </div>

        {menuOpen && (
          <div className="order-4 flex w-full flex-col gap-3 border-t border-border-base pt-3 md:hidden">
            {isAuthenticated ? userMenu : <div className="flex flex-col gap-2">{authLinks}</div>}
          </div>
        )}
      </div>

      <SignUpModal
        isOpen={authModal === "signup"}
        onClose={() => setAuthModal(null)}
        onSwitchToLogin={() => setAuthModal("login")}
      />
      <LoginModal
        isOpen={authModal === "login"}
        onClose={() => setAuthModal(null)}
        onSwitchToSignUp={() => setAuthModal("signup")}
      />
    </header>
  );
};

export default Navbar;
