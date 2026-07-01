import { Plus, Search as SearchIcon } from "lucide-react";
import Button from "../common/Button.jsx";
import SelectDropdown from "../common/SelectDropdown.jsx";
import CityAutocomplete from "./CityAutocomplete.jsx";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "average", label: "Average" },
  { value: "rating", label: "Rating" },
  { value: "location", label: "Location" },
];

const CompanyToolbar = ({
  city,
  onCityChange,
  onSelectCity,
  onFindCompany,
  sort,
  onSortChange,
  onAddCompany,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end md:gap-4">
      <CityAutocomplete
        label="Select City"
        labelClassName="font-light text-black"
        value={city}
        onChange={onCityChange}
        onSelectCity={onSelectCity}
        placeholder="Indore"
        className="w-full md:w-72"
      />

      <Button variant="gradient" icon={SearchIcon} onClick={onFindCompany}>
        Find Company
      </Button>

      <Button variant="gradient" icon={Plus} onClick={onAddCompany}>
        Add Company
      </Button>

      <div className="md:ml-auto">
        <SelectDropdown
          label="Sort:"
          labelClassName="font-light text-black"
          options={SORT_OPTIONS}
          value={sort}
          onChange={onSortChange}
          className="w-full md:w-40"
        />
      </div>
    </div>
  );
};

export default CompanyToolbar;
