import React, { useEffect, useState } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
} from "victory";
import ratings from "./studentData";

function Dashboard(props) {
  //   useEffect(() => {}, []);
  //   useEffect(() => {
  //     ratingss();
  //   }, []);

  //   const [students, setData] = useState([]);

  //   const ratingss = async () => {
  //     const res = await fetch(
  //       "https://script.googleusercontent.com/macros/echo?user_content_key=M0v5A1Dir6cv_c1rXjPZRSRieQbjeKEAAzvEHyyRgYehMpGwyR6QgGkq6-uacUhbPz3MOssKZWfjZ5IC7AjSB-obtVzvCx6_m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCbICk5PDvHAZKytjTtsXLdwZceb7pnMV3Jq7uvdcL0uffUWO8ZrHgfjiCO7xLEOmmi4h2T7mYvt&lib=MAiEp7iWxCR8ynpaFXe3KZbwFOezA__4g"
  //     );
  //     const data = await res.json();
  //     setData(data.students);
  //   };

  const students = ratings;

  const studentRatings = props.studentName
    ? students.filter((element) => element.name === props.studentName)
    : students;

  //Average ratings
  const allDifficultyRatings = students.map(
    (element) => element.difficultyRating
  );
  const allEnjoymentRatings = students.map(
    (element) => element.enjoymentRating
  );
  const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const avgDifficultyRating = arrAvg(allDifficultyRatings);
  const avgEnjoymentRating = arrAvg(allEnjoymentRatings);

  const projects = [
    "W1D3 - Project - Guess-the-number",
    "W1D4 - Project - Kleurentoggle",
    "W1D5 - Project - Galgje",
    "W2D5 - Project - Filmzoeker",
    "W3D5 - Project - Todo-List",
    "W4D3 - Project - Next-Level CSS",
    "W5D5 - Project - Lil_Playlist",
    "W6D2 - Project - Eindopdracht",
  ];

  const projectRatings = studentRatings.filter((element) =>
    projects.includes(element.assignment)
  );

  console.log("projectRatings: ", projectRatings);

  const gemTheme = {
    axis: {
      style: {
        grid: {
          fill: "none",
          stroke: "none",
        },
        ticks: {
          fill: "transparent",
          size: 5,
          stroke: "#90A4AE",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          padding: 8,
        },
        tickLabels: {
          fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
          fontSize: 6,
          letterSpacing: "normal",
          angle: 45,
          fill: "#455A64",
          stroke: "transparent",
          strokeWidth: 0,
        },
      },
    },
    bar: {
      style: {
        data: {
          fill: "#90A4AE",
          padding: 0,
          strokeWidth: 1,
        },
      },
    },
    group: {
      colorScale: ["pink", "green", "#DCE775", "#8BC34A", "#00796B", "#006064"],
      width: 350,
      height: 350,
      padding: 50,
    },
  };

  return (
    <div className="project-chart">
      <VictoryChart theme={gemTheme} domainPadding={10} height={200}>
        <VictoryLabel
          text="Assignment ratings"
          style={{ fontSize: 10 }}
          x={225}
          y={30}
          textAnchor="middle"
        />
        <VictoryLine
          style={{ data: { stroke: "green", strokeWidth: 0.4 } }}
          y={() => avgDifficultyRating}
        />
        <VictoryLabel
          text="student average difficulty"
          style={{ fontSize: 8 }}
          datum={{ x: 4, y: 6 }}
          textAnchor="middle"
        />
        <VictoryLine
          style={{ data: { stroke: "pink", strokeWidth: 0.4 } }}
          y={() => avgEnjoymentRating}
        />
        <VictoryLabel
          text="student average Enjoyment"
          style={{ fontSize: 8 }}
          datum={{ x: 4, y: 6 }}
          textAnchor="middle"
        />
        <VictoryAxis crossAxis />
        <VictoryAxis dependentAxis domain={[0, 5]} />
        <VictoryGroup offset={8}>
          <VictoryBar
            barWidth={1}
            barRatio={0.8}
            data={studentRatings}
            // data accessor for x values
            x="assignment"
            // data accessor for y values
            y="difficultyRating"
          />
          <VictoryBar
            barWidth={1}
            barRatio={0.8}
            data={studentRatings}
            // data accessor for x values
            x="assignment"
            // data accessor for y values
            y="enjoymentRating"
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default Dashboard;
