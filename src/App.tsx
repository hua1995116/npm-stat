import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Chart, { ChartData } from "./compoments/Charts";
import { Space } from "antd";
import Pannel, { FormType } from "./compoments/Pannel";
import Github from "./compoments/Github";
import Logo from "./compoments/Logo";
import axios from "axios";
import { getParams, sliceMonth, sliceWeek } from "./utils";
import moment from "moment";
import Table from "./compoments/Table";
import Bottom from './compoments/Bottom';

const query = getParams(window.location.href);
const { startTime, endTime, packages } = query || {};

const initialValues = {
  startTime: startTime && moment(startTime),
  endTime: startTime && moment(endTime),
  packages,
};

function App() {
  const [data, setData] = useState<ChartData[]>([]);
  const [search, setSearch] = useState<FormType>({
    startTime,
    endTime,
    packages,
  });

  const fetchData = async ({ packages, startTime, endTime }: FormType) => {
    // https://registry.npm.taobao.org/downloads/range/2020-05-01:2020-10-01/react
    const result = await axios.get(
      `https://registry.npm.taobao.org/downloads/range/${startTime.format(
        "YYYY-MM-DD"
      )}:${endTime.format("YYYY-MM-DD")}/${packages}`
    );
    setSearch({ packages, startTime, endTime });
    setData(result.data.downloads);
  };

  useEffect(() => {
    if (query && query.startTime && query.endTime && query.packages) {
      fetchData({
        startTime: initialValues.startTime,
        endTime: initialValues.endTime,
        packages: initialValues.packages,
      });
    }
  }, []);

  const weekData = sliceWeek(data, 7);
  const monthData = sliceMonth(data);
  const totalData = data.reduce((total: number, item) => {
    return total + item.downloads;
  }, 0);

  return (
    <div className="App">
      <div className="container">
        <Logo></Logo>
        <Pannel fetchData={fetchData} initialValues={initialValues}></Pannel>
        {data.length ? <Chart data={data} name={"Download per day"}></Chart> : null}
        {weekData.length ? <Chart data={weekData} name={"Download per week"}></Chart> : null}
        {monthData.length ? (
          <Chart data={monthData} name={"Download per month"}></Chart>
        ) : null}
        {data.length ? (
          <div className="chart-wrapper">
            <h2>Total number of downloads between {search.startTime.format("YYYY-MM-DD")} and {search.endTime.format("YYYY-MM-DD")}</h2>
            <Table data={[{ package: search.packages, downloads: totalData }]} />
          </div>
        ) : null}
        <Github />
      </div>
    <Bottom />
    </div>
  );
}

export default App;
