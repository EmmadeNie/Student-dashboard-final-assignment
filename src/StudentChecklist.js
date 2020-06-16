import React, { useEffect, useState } from "react";
import { useChecklist } from "react-checklist";
// or const { useChecklist } = require('react-checklist');
import Chart from "./Chart";

function StudentChecklist() {
  useEffect(() => {
    ratingss();
  }, []);

  const [students, setData] = useState([]);

  const ratingss = async () => {
    const res = await fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=M0v5A1Dir6cv_c1rXjPZRSRieQbjeKEAAzvEHyyRgYehMpGwyR6QgGkq6-uacUhbPz3MOssKZWfjZ5IC7AjSB-obtVzvCx6_m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCbICk5PDvHAZKytjTtsXLdwZceb7pnMV3Jq7uvdcL0uffUWO8ZrHgfjiCO7xLEOmmi4h2T7mYvt&lib=MAiEp7iWxCR8ynpaFXe3KZbwFOezA__4g"
    );
    const data = await res.json();
    setData(data.students);
  };

  const distinctStudents = [...new Set(students.map((item) => item.name))];

  const data = [
    { _id: 1, label: "item 1" },
    { _id: 2, label: "item 2" },
    { _id: 3, label: "item 3" },
  ];
  const [checked, setChecked] = useState(false);

  handleCheck = () => {
    setChecked((prevChecked) => !prevChecked);
  };
  console.log(checked);

  console.log(checkedItems); // Set(0) - handling with Set
  console.log([...checkedItems]); // []     - handling with Array
  return (
    <div>
      <ul>
        <li>
          <input
            type="checkbox"
            onChange={handleCheck} // 1
            checked={isCheckedAll} // 2
          />
          <label>Check All</label>
        </li>

        {distinctStudents.map((v, i) => (
          <li key={i}>
            <input
              type="checkbox"
              data-key={v} // 3
              onChange={handleCheck} // 4
              checked={checkedItems.has(v)} // 5
            />
            <label>{v}</label>
          </li>
        ))}
      </ul>
      <Chart />
    </div>
  );
}

export default StudentChecklist;
