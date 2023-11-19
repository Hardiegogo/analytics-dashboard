import DateRangePickerComponent from "@/components/DateRangePickerComponent";
import LineChartComponent from "@/components/HLineChart";
import HBarChart from "@/components/HbarChart";
import Sidebar from "@/components/Sidebar";
import { dataState } from "@/state/dataAtom";
import { dataFiltersState } from "@/state/dataFiltersAtom";
import { userState } from "@/state/userAtom";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { LineChart } from "recharts";
import { useRecoilState, useRecoilValue } from "recoil";

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

const Dashboard = () => {
  const [chartData, setChartData] = useRecoilState(dataState);
  const dataFilters = useRecoilValue(dataFiltersState);
  const userStatus=useRecoilValue(userState)
  const router=useRouter()
  useEffect(() => {
    (async () => {
      const res = await axios("/api/dashboard");
      setChartData(res.data.data);
    })();
  }, []);

  useEffect(()=>{
    if(!userStatus.isLoggedIn){
      router.replace("/login")
    }
  },[userStatus.isLoggedIn])

  return (
    userStatus.isLoggedIn ? <div className="flex">
    <Sidebar />
    <main>
      <h1 className="text-center text-2xl mt-4">Dashboard</h1>
      <div className="w-fit">
        {chartData?.length && <HBarChart />}
        <LineChartComponent />
      </div>
      {dataFilters.isDateRange && <DateRangePickerComponent />}
    </main>
  </div> : <div>Loading ...</div>
  );
};

export default Dashboard;
