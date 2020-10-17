import React from "react";
import { Chart, Path } from "bizcharts";

// console.log(Path);

// 数据源
// const data = [
//   { consumption: 0.65, price: 1, year: 1965 },
//   { consumption: 0.66, price: 1.05, year: 1966 },
//   { consumption: 0.64, price: 1.1, year: 1967 },
//   { consumption: 0.63, price: 1.12, year: 1968 },
//   { consumption: 0.55, price: 1.15, year: 1969 },
//   { consumption: 0.57, price: 1.19, year: 1970 },
//   { consumption: 0.58, price: 1.14, year: 1971 },
//   { consumption: 0.59, price: 1, year: 1972 },
//   { consumption: 0.57, price: 0.96, year: 1973 },
//   { consumption: 0.55, price: 0.92, year: 1974 },
//   { consumption: 0.54, price: 0.88, year: 1975 },
//   { consumption: 0.55, price: 0.87, year: 1976 },
//   { consumption: 0.42, price: 0.89, year: 1977 },
//   { consumption: 0.28, price: 1, year: 1978 },
//   { consumption: 0.15, price: 1.1, year: 1979 },
// ];


export interface ChartData {
  day: string,
  downloads: number
}

interface ChartProps {
  data: ChartData[]
  name: string
}

function Demo(props: ChartProps) {
  const { data, name } = props;
  console.log(data);
  return (
    <div className="chart-wrapper">
      <Chart  height={200} autoFit data={data}>
        <Path
          animate={{
            appear: {
              animation: "path-in",
              duration: 1000,
              easing: "easeLinear",
            },
          }}
          shape="smooth"
          position="day*downloads"
        />
      </Chart>
      <p className="chart-desc">{name}</p>
    </div>
  );
}

export default Demo;
