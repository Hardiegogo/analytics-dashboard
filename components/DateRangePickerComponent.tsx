import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { dataFiltersState } from "@/state/dataFiltersAtom";

const fixedStartDate = new Date("10/04/2022");
const fixedEndDate = new Date("10/29/2022");

function formatDateToDDMMYYYY(date: any) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: Month is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const DateRangePickerComponent = () => {
  const setDataFilters = useSetRecoilState(dataFiltersState);
  const [state, setState] = useState([
    {
      startDate: new Date("10/04/2022"),
      endDate: new Date("10/29/2022"),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setDataFilters((filters) => ({
      ...filters,
      startDate: formatDateToDDMMYYYY(state[0].startDate),
      endDate: formatDateToDDMMYYYY(state[0].endDate),
    }));
  }, [state]);

  return (
    <div className="border border-gray-500 p-4 rounded-md text-black">
      <DateRangePicker
        onChange={(item: any) => {
          if (
            item.selection.startDate < fixedStartDate ||
            item.selection.startDate > fixedEndDate
          ) {
            return null;
          } else if (
            item.selection.endDate < fixedStartDate ||
            item.selection.endDate > fixedEndDate
          ) {
            return null;
          } else setState([item.selection]);
        }}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />
    </div>
  );
};

export default DateRangePickerComponent;
