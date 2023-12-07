"use client";
import React, { useState } from "react";
import { Button, Card, Form, Input, Select, Tag, TreeSelect } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useFetchTeachers from "@/hooks/useFetchTeachers";
import useFetchStudents from "@/hooks/useFetchStudents";
import axios from "axios";

export default function CreateClassroom() {
  const [value, setValue] = useState();
  const [form] = Form.useForm();
  const { teachers } = useFetchTeachers();
  const { students } = useFetchStudents();

  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const handleSelectChange = (selected: string[]) => {
    setSelectedValue(selected[0]);
  };

  const transformData = (teacher: any) =>
    teachers.map((teacher: any) => ({
      value: teacher.firstName,
      title: teacher.firstName,
    }));

  const treeData = transformData(teachers);
  const onChange = (newValue: any) => {
    setValue(newValue);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const userData = {
      classroom: data.classroom,
      teachers: value,
      students: data.students,
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, userData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Form
        form={form}
        name="dynamic_form_complex"
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
        initialValues={{ items: [{}] }}
        className="my-10 mx-auto w-1/4"
      >
        <Controller
          name="classroom"
          control={control}
          rules={{ required: "Classroom is required" }}
          render={({ field }) => (
            <Form.Item>
              <Input {...field} placeholder="Classroom" />
              <ErrorMessage
                errors={errors}
                name="classroom"
                render={({ message }) => (
                  <p className="text-red-400">{message}</p>
                )}
              />
            </Form.Item>
          )}
        />
        <Controller
          name="teachers"
          control={control}
          render={({ field }) => (
            <Form.Item>
              <TreeSelect
                {...field}
                showSearch
                style={{
                  width: "100%",
                }}
                value={value}
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: "auto",
                }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
                treeData={treeData}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="students"
          control={control}
          render={({ field }) => (
            <Form.Item>
              <Select
                {...field}
                mode="multiple"
                style={{ width: "100%" }}
                options={students.map((option: any) => ({
                  value: option.firstName,
                  label: option.firstName.toString(),
                }))}
                onChange={handleSelectChange}
              />
              {selectedValue && (
                <div style={{ marginTop: "10px" }}>{selectedValue}</div>
              )}
            </Form.Item>
          )}
        />
        <Form.Item>
          <Button
            className="bg-black text-white hover:bg-white hover:text-black mb-3 my-0 mx-auto block"
            htmlType="submit"
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
