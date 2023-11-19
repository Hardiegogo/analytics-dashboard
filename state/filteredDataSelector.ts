import { selector } from "recoil";
import { dataState } from "./dataAtom";
import { dataFiltersState } from "./dataFiltersAtom";

interface IDataRow {
  Day: string;
  Age: string;
  Gender: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

const filterBasedOnGender = (
  entry: IDataRow,
  gender: "Male" | "Female" | "All"
) => {
  if (gender === "All") {
    return true;
  } else if (entry.Gender === gender) {
    return true;
  } else return false;
};

const filterBasedOnAgeGroup = (
  entry: IDataRow,
  ageGroup: "15-25" | ">25" | "All"
) => {
  if (ageGroup === "All") {
    return true;
  } else if (entry.Age === ageGroup) {
    return true;
  } else return false;
};

function parseDateFromString(dateString: string) {
  const parts = dateString.split("/");
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}

const filterBasedOnDate = (
  entry: IDataRow,
  start: string | null,
  end: string | null
) => {
  if (!start || !end) {
    return true;
  }

  const entryDate = parseDateFromString(entry.Day).getTime();
  const startDate = parseDateFromString(start).getTime();
  const endDate = parseDateFromString(end).getTime();

  if (entryDate >= startDate && entryDate <= endDate) {
    return true;
  } else return false;
};

export const filteredDataState = selector({
  key: "filteredData",
  get: ({ get }) => {
    const data = get(dataState);
    const filters = get(dataFiltersState);
    const filteredData = data?.filter((entry) => {
      return (
        filterBasedOnDate(entry, filters.startDate, filters.endDate) &&
        filterBasedOnAgeGroup(entry, filters.ageGroup) &&
        filterBasedOnGender(entry, filters.gender)
      );
    });

    return filteredData;
  },
});
