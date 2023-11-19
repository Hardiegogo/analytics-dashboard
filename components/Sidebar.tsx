import { dataFiltersState } from "@/state/dataFiltersAtom";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { selectedCategoryState } from "@/state/selectedCategoryAtom";

function Sidebar() {
  const setDataFilters = useSetRecoilState(dataFiltersState);
  const dataFilters = useRecoilValue(dataFiltersState);
  const router = useRouter();
  const setSelectedCategory=useSetRecoilState(selectedCategoryState)

  const handleGenderChange = (gender: "Male" | "Female" | "All") => {
    setDataFilters((filters) => ({ ...filters, gender }));
    updateURLParams({ gender });
    Cookies.set("gender", gender);
  };

  const handleAgeGroupChange = (ageGroup: "15-25" | ">25" | "All") => {
    setDataFilters((filters) => ({ ...filters, ageGroup }));
    updateURLParams({ ageGroup });
    Cookies.set("ageGroup", ageGroup);
  };

  const updateURLParams = (params) => {
    const currentParams = { ...router.query, ...params };

    router.push({
      pathname: router.pathname,
      query: currentParams,
    });
  };

  useEffect(() => {
    const { query } = router;
    if (query.gender) {
      setDataFilters((filters: any) => ({ ...filters, gender: query.gender }));
    }

    if (query.ageGroup) {
      setDataFilters((filters: any) => ({
        ...filters,
        ageGroup: query.ageGroup,
      }));
    }
  }, [router.query]);

  useEffect(() => {
    const savedGender = Cookies.get("gender");
    const savedAgeGroup = Cookies.get("ageGroup");

    if (savedGender) {
      setDataFilters((filters: any) => ({ ...filters, gender: savedGender }));
    }
    if (savedAgeGroup) {
      setDataFilters((filters: any) => ({
        ...filters,
        ageGroup: savedAgeGroup,
      }));
    }
  }, []);

  return (
    <div className="border-r p-4 min-w-[20%] border-red-400 min-h-screen">
      <h1 className="text-xl text-center">Filters</h1>
      <div className="mt-8 mx-4">
        <h2>Gender</h2>
        <input
          type="radio"
          name="gender"
          checked={dataFilters.gender === "Male"}
          onChange={() => handleGenderChange("Male")}
        />{" "}
        <span>Male</span>
        <input
          type="radio"
          name="gender"
          checked={dataFilters.gender === "Female"}
          className="ml-4"
          onChange={() => handleGenderChange("Female")}
        />{" "}
        <span>Female</span>
      </div>
      <div className="mt-4 mx-4">
        <h2>Age group</h2>
        <input
          type="radio"
          name="ageGroup"
          checked={dataFilters.ageGroup === "15-25"}
          onChange={() => handleAgeGroupChange("15-25")}
        />{" "}
        <span className="">15-25</span>
        <input
          type="radio"
          name="ageGroup"
          className="ml-4"
          checked={dataFilters.ageGroup === ">25"}
          onChange={() => handleAgeGroupChange(">25")}
        />{" "}
        <span> {">25"} </span>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="p-2 rounded-md bg-white text-black"
          onClick={() =>
            setDataFilters((filters) => ({
              ...filters,
              isDateRange: !filters.isDateRange,
            }))
          }
        >
          Date range
        </button>
        <button
          className="p-2 rounded-md bg-white text-black"
          onClick={() => {
            setDataFilters({
              gender: "All",
              ageGroup: "All",
              startDate: null,
              endDate: null,
              isDateRange: false,
            });
            router.push({
              pathname: router.pathname,
              query: {},
            });
            Cookies.remove("gender")
            Cookies.remove("ageGroup")
            setSelectedCategory(null)
          }}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
