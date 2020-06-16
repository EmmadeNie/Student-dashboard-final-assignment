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

function Chart(props) {
  useEffect(() => {
    ratingss();
  }, []);

  const [students, setData] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const ratingss = async () => {
    const res = await fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=M0v5A1Dir6cv_c1rXjPZRSRieQbjeKEAAzvEHyyRgYehMpGwyR6QgGkq6-uacUhbPz3MOssKZWfjZ5IC7AjSB-obtVzvCx6_m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCbICk5PDvHAZKytjTtsXLdwZceb7pnMV3Jq7uvdcL0uffUWO8ZrHgfjiCO7xLEOmmi4h2T7mYvt&lib=MAiEp7iWxCR8ynpaFXe3KZbwFOezA__4g"
    );
    const data = await res.json();
    setData(data.students);
    setLoading((prev) => !prev);
  };

  const [checkedE, setEChecked] = useState(true);
  const [checkedD, setDChecked] = useState(true);

  function handleCheckE() {
    setEChecked((prevChecked) => !prevChecked);
  }

  function handleCheckD() {
    setDChecked((prevChecked) => !prevChecked);
  }

  const studentRatings = props.studentName
    ? students.filter((element) => element.name === props.studentName)
    : students;

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

  const studentRatingsWithLabels = studentRatings.map((element) => ({
    assignment: element.assignment,
    difficultyRating: element.difficultyRating,
    enjoymentRating: element.enjoymentRating,
    label: `Opdracht ${
      element.assignment
    }, difficultyRating: ${element.difficultyRating.toFixed(
      1
    )}, enjoymentRating: ${element.enjoymentRating.toFixed(1)}`,
  }));

  console.log("lala", studentRatingsWithLabels);
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

  const projectRatings = studentRatings.filter((element) =>
    projects.includes(element.assignment)
  );

  const gemTheme = {
    axis: {
      style: {
        grid: {
          fill: "none",
          stroke: "none",
        },
        ticks: {
          size: 3,
          stroke: "black",
          strokeWidth: 4,
          padding: 10,
        },
        tickLabels: {
          fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
          fontSize: 5,

          angle: 90,
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
        labels: {
          fontFamily: "'Raleway', sans-serif, 'Amatic SC', cursive",
          fontSize: 6,
          letterSpacing: "normal",
          padding: 8,
          fill: "#455A64",
          stroke: "transparent",
          strokeWidth: 0,
        },
      },
    },
    group: {
      colorScale: ["pink", "#8FBC8F"],
    },
  };

  return (
    <div>
      <div className="labels">
        <h2 className="loading">
          {isLoading && "loading data from googleAPI ..."}
        </h2>
        <input type="checkbox" onChange={handleCheckE} checked={checkedE} />
        <label>Ejoyment Rating</label>
        <input type="checkbox" onChange={handleCheckD} checked={checkedD} />
        <label>Difficulty Rating</label>
        <label>Enjoyment average: {Math.round(avgEnjoymentRating)}</label>
        <label>Difficulty average: {Math.round(avgDifficultyRating)}</label>
      </div>
      <VictoryChart theme={gemTheme} domainPadding={10} height={200}>
        <VictoryAxis crossAxis />
        <VictoryAxis dependentAxis domain={[0, 5]} domainpadding={5} />
        <VictoryGroup offset={8}>
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            style={!checkedE && { data: { display: "none" } }}
            barWidth={1}
            barRatio={0.8}
            data={studentRatingsWithLabels}
            // data accessor for x values
            x="assignment"
            // data accessor for y values
            y="difficultyRating"
            tickFormat={studentRatingsWithLabels.map(
              (element) => element.assignment
            )}
          />
          <VictoryBar
            style={!checkedD && { data: { display: "none" } }}
            barWidth={1}
            barRatio={0.8}
            data={studentRatings}
            // data accessor for x values
            x="assignment"
            // data accessor for y values
            y="enjoymentRating"
          />
        </VictoryGroup>
        <VictoryLine
          style={{
            data: { stroke: "006400", strokeWidth: 0.4, label: "Average" },
          }}
          y={() => avgDifficultyRating}
        />
        <VictoryLine
          labelComponent={<VictoryTooltip />}
          style={{ data: { stroke: "#740023", strokeWidth: 0.4 } }}
          y={() => avgEnjoymentRating}
        />
      </VictoryChart>
    </div>
  );
}

export default Chart;
