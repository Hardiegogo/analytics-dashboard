import { atom } from "recoil";

const defaultFilters: {
  ageGroup: "15-25" | ">25" | "All";
  gender: "Male" | "Female" | "All";
  startDate: null | string;
  endDate: null | string;
  isDateRange: boolean;
} = {
  gender: "All",
  ageGroup: "All",
  startDate: null,
  endDate: null,
  isDateRange: false,
};

export const dataFiltersState = atom<{
  ageGroup: "15-25" | ">25" | "All";
  gender: "Male" | "Female" | "All";
  startDate: null | string;
  endDate: null | string;
  isDateRange: boolean;
}>({
  key: "dataFilters",
  default: defaultFilters,
});
