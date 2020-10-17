import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './compoments/Charts';
import { Space } from 'antd';
import Pannel, { FormType } from './compoments/Pannel';
import Github from './compoments/Github';
import Logo from './compoments/Logo';
import axios from 'axios';
import { getParams, sliceMonth, sliceWeek } from './utils';
import moment from 'moment';

function App() {
  const onChange = () => {

  }

  const [data, setData] = useState([]);

  const fetchData = async ({packages, startTime, endTime}: FormType) => {
    // https://registry.npm.taobao.org/downloads/range/2020-05-01:2020-10-01/react
		const result = await axios.get(`https://registry.npm.taobao.org/downloads/range/${startTime.format('YYYY-MM-DD')}:${endTime.format('YYYY-MM-DD')}/${packages}`);
		console.log(result);
		setData(result.data.downloads)
	}
	const query = getParams(window.location.href);
	const { startTime, endTime, packages } = query;
	let initialValues = {
		startTime: moment(startTime),
		endTime: moment(endTime),
		packages
	}
	useEffect(() => {
		if (query && query.startTime && query.endTime && query.packages) {
			fetchData({
				startTime: initialValues.startTime,
				endTime: initialValues.endTime,
				packages
			})
		}
	}, []);

	const weekData = sliceWeek(data, 7);
	const monthData = sliceMonth(data);

  return (
		<div className="App">
			<Logo></Logo>
			<Pannel fetchData={fetchData} initialValues={initialValues}></Pannel>
			<Chart data={data} name={"按天展示"}></Chart>
			<Chart data={weekData} name={"按周展示"}></Chart>
			<Chart data={monthData} name={"按月展示"}></Chart>
			<Github />
    </div>
  );
}

export default App;
