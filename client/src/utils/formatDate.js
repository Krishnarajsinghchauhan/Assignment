const pad = (n) => String(n).padStart(2, "0");

export const formatDateOnly = (dateInput) => {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
};

export const formatDateTime = (dateInput) => {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  return `${formatDateOnly(d)}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const toInputDateValue = (dateInput) => {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
