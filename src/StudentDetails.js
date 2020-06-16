import React from "react";
import Chart from "./Chart";

function StudentDetails({ match }) {
  const student = match.params.name;

  return (
    <div class="student-details">
      <h1>{student}</h1>
      <Chart studentName={student} />
    </div>
  );
}

export default StudentDetails;
