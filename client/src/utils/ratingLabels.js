export const RATING_LABELS = {
  1: "Very Bad",
  2: "Bad",
  3: "Average",
  4: "Satisfied",
  5: "Excellent",
};

export const getRatingLabel = (value) => RATING_LABELS[value] || "";
