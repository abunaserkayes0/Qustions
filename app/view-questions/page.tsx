"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SingleQuestion from "@/Components/SingleQuestion/SingleQuestion";
import useFetchQuestion from "@/hooks/useFetchQuestion";

export default function ViewQuestions() {
  const { questions, setQuestions } = useFetchQuestion();
  const router = useRouter();

  const handelDeleteQuestion = (id: any) => {
    axios
      .delete(`http://143.110.190.164:3000/teacher/question/delete/${id}`)
      .then((response) => {
        if (response.data.message === "Question deleted successfully") {
          const restQuestions = questions.filter(
            (question: any) => question._id != id
          );
          setQuestions(restQuestions);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {questions.map((question, index) => {
        return (
          <SingleQuestion
            key={index}
            question={question}
            index={index}
            handelDeleteQuestion={handelDeleteQuestion}
          />
        );
      })}
    </>
  );
}
