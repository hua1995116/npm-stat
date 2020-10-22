import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Package",
    dataIndex: "package",
    key: "package",
  },
  {
    title: "Downloads",
    dataIndex: "downloads",
    key: "downloads",
  },
];

interface TotalProps {
  package: string;
  downloads: number;
}

export default function RenderTable(props: { data: TotalProps[] }) {
  const { data } = props;
  console.log(data);
  return <Table rowKey={record => record.package} columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />;
}
