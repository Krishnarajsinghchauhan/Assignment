const COLORS = [
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const getColorForName = (name = "") => {
  const charSum = name.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return COLORS[charSum % COLORS.length];
};

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
};

const Avatar = ({ name = "", src = "", size = "md", className = "" }) => {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClass} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold text-white ${getColorForName(
        name
      )} ${sizeClass} ${className}`}
    >
      {getInitials(name) || "?"}
    </div>
  );
};

export default Avatar;
