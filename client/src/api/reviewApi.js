import api from "./axios.js";

export const fetchReviews = async (companyId, { sort } = {}) => {
  const { data } = await api.get(`/companies/${companyId}/reviews`, {
    params: { sort },
  });
  return data.data;
};

export const createReview = async (companyId, payload) => {
  const { data } = await api.post(`/companies/${companyId}/reviews`, payload);
  return data.data;
};

export const likeReview = async (reviewId) => {
  const { data } = await api.patch(`/reviews/${reviewId}/like`);
  return data.data;
};
