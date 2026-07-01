import api from "./axios.js";

export const fetchCompanies = async ({ search, city, sort } = {}) => {
  const { data } = await api.get("/companies", {
    params: { search, city, sort },
  });
  return data.data;
};

export const fetchCompanyById = async (id) => {
  const { data } = await api.get(`/companies/${id}`);
  return data.data;
};

export const createCompany = async (payload) => {
  const { data } = await api.post("/companies", payload);
  return data.data;
};
