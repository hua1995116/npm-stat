import React, { useState } from "react";
import { Form, DatePicker, Button, Input } from "antd";
import { Moment } from "moment";

export interface FormType {
  startTime: Moment;
  endTime: Moment;
  packages: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

export interface PannelProps {
  fetchData: ({}: FormType) => Promise<void>;
  initialValues: FormType | {};
}

function Pannel(props: PannelProps) {
  const { fetchData, initialValues } = props;
  const onFinish = (values: FormType) => {
    fetchData(values);
  };

  return (
    <Form
      {...layout}
      name="basic"
      layout="horizontal"
      style={{ width: "50vw", margin: "0 auto" }}
      size={"middle"}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item label="packages" name="packages">
        <Input />
      </Form.Item>
      <Form.Item label="startTime" name="startTime">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="endTime" name="endTime">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Pannel;
