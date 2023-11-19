import { filteredDataState } from "@/state/filteredDataSelector";
import { selectedCategoryState } from "@/state/selectedCategoryAtom";
import { da } from "date-fns/locale";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRecoilValue } from "recoil";

const transformData = (data, selectedCategory) => {
  const transformedDataObject = data.reduce((acc, curr) => {
    const date = curr.Day;
    const value = Number(curr[selectedCategory]);

    if (acc[date]) {
      acc[date] += value;
    } else {
      acc[date] = value;
    }

    return acc;
  }, {});

  const transformedDataArray = Object.entries(transformedDataObject).map(
    ([date, value]) => ({ date, value })
  );

  console.log(transformedDataArray)

  return transformedDataArray;
};

const LineChartComponent = () => {
  const filteredData = useRecoilValue(filteredDataState);
  const selectedCategory = useRecoilValue(selectedCategoryState);

  return (selectedCategory ? <ResponsiveContainer width="100%" height={400}>
  <LineChart
    data={transformData(filteredData, selectedCategory)}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer> : <div>Please select a category</div>)
};

export default LineChartComponent;
