import { filteredDataState } from "@/state/filteredDataSelector";
import { selectedCategoryState } from "@/state/selectedCategoryAtom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useRecoilValue, useSetRecoilState } from "recoil";

const transformedData = (data: any) => {
  const featureSums: any = {};

  data.forEach((entry: any) => {
    Object.keys(entry).forEach((feature) => {
      if (feature !== "Day" && feature !== "Age" && feature !== "Gender") {
        featureSums[feature] =
          (featureSums[feature] || 0) + Number(entry[feature]);
      }
    });
  });

  const transformedData = Object.keys(featureSums).map((feature) => ({
    feature,
    value: featureSums[feature],
  }));

  return transformedData;
};

const HBarChart = () => {
  const filteredData = useRecoilValue(filteredDataState);
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);

  return (
    <BarChart
      width={600}
      height={400}
      data={transformedData(filteredData)}
      layout="vertical"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="feature" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="value"
        fill="#4285f4"
        onClick={(item) => {
          setSelectedCategory(item.feature);
        }}
      />
    </BarChart>
  );
};

export default HBarChart;
