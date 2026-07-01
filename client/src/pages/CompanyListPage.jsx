import { useState } from "react";
import { useFilter } from "../context/FilterContext.jsx";
import { useCompanies } from "../hooks/useCompanies.js";
import CompanyToolbar from "../components/company/CompanyToolbar.jsx";
import CompanyCard from "../components/company/CompanyCard.jsx";
import AddCompanyModal from "../components/company/AddCompanyModal.jsx";

const CardSkeleton = () => (
  <div className="flex animate-pulse gap-4 rounded-card border border-border-base bg-white p-5">
    <div className="h-28 w-28 shrink-0 rounded-field bg-gray-200" />
    <div className="flex-1 space-y-3 py-1">
      <div className="h-4 w-1/3 rounded bg-gray-200" />
      <div className="h-3 w-1/2 rounded bg-gray-200" />
      <div className="h-3 w-1/4 rounded bg-gray-200" />
    </div>
  </div>
);

const CompanyListPage = () => {
  const { search, city, setCity, appliedCity, setAppliedCity, sort, setSort } = useFilter();
  const { companies, loading, error, refresh } = useCompanies({
    search,
    city: appliedCity,
    sort,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleCityChange = (value) => {
    setCity(value);
    if (!value.trim()) {
      setAppliedCity("");
    }
  };

  return (
    <main className="mx-auto max-w-container px-4 py-6 md:px-8 lg:px-16">
      <CompanyToolbar
        city={city}
        onCityChange={handleCityChange}
        onSelectCity={setAppliedCity}
        onFindCompany={() => setAppliedCity(city)}
        sort={sort}
        onSortChange={setSort}
        onAddCompany={() => setModalOpen(true)}
      />

      <div className="my-5 border-t border-border-base" />

      <p className="mb-4 text-sm text-text-muted">
        Result Found: {loading ? "…" : companies.length}
      </p>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-col gap-4">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}

        {!loading && companies.length === 0 && !error && (
          <p className="py-12 text-center text-text-muted">
            No companies found. Try adjusting your search or filters.
          </p>
        )}

        {!loading &&
          companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
      </div>

      <AddCompanyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={refresh}
      />
    </main>
  );
};

export default CompanyListPage;
