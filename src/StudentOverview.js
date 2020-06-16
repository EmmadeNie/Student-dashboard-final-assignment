import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentOverview() {
  useEffect(() => {
    getRatings();
  }, []);

  //state with studentData from googleAPI
  const [students, setData] = useState([]);

  //with the googleAPI the data is sorted in the needed format
  const getRatings = async () => {
    const res = await fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=M0v5A1Dir6cv_c1rXjPZRSRieQbjeKEAAzvEHyyRgYehMpGwyR6QgGkq6-uacUhbPz3MOssKZWfjZ5IC7AjSB-obtVzvCx6_m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCbICk5PDvHAZKytjTtsXLdwZceb7pnMV3Jq7uvdcL0uffUWO8ZrHgfjiCO7xLEOmmi4h2T7mYvt&lib=MAiEp7iWxCR8ynpaFXe3KZbwFOezA__4g"
    );
    const data = await res.json();
    setData(data.students);
  };

  const distinctStudents = [...new Set(students.map((item) => item.name))];

  const listItems = distinctStudents.map((item) => (
    <Link to={`/StudentOverview/${item}`}>
      <li>{item}</li>
    </Link>
  ));

  return (
    <div className="students">
      <ul className="student-links">
        {listItems}
        <Link to={`/`}>
          <li>HOME</li>
        </Link>
      </ul>
    </div>
  );
}

export default StudentOverview;
