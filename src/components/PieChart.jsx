import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { connect } from "react-redux";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  applyChart = (props) => {
    let data = [];
    // var denseKeys = props.filter(
    //   (item) => !Object.values(item).includes("Science")
    // );
    props.forEach((elm) => {
      data.push({ y: elm.score, name: elm.quizset });
    });
    return data;
  };

  render() {
    const options = {
      // theme: "light",
      // animationEnabled: true,
      // exportFileName: "Personal Scores",
      // exportEnabled: true,
      // title: {
      //   text: "Personal Scores",
      // },

      // data: [
      //   {
      //     type: "doughnut",
      //     showInLegend: true,
      //     legendText: "{label}",
      //     toolTipContent: "{label}: <strong>{y}%</strong>",
      //     indexLabel: "{y}%",
      //     indexLabelPlacement: "outside",
      //     dataPoints: this.applyChart(
      //       this.props.score && this.props.score.score
      //     ),
      //   },
      // ],
      animationEnabled: true,
      title: {
        text: "Personal Score",
      },
      subtitles: [
        {
          text: "71% Positive",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints:
            //  [
            // 	{ name: "Unsatisfied", y: 5 },
            // 	{ name: "Very Unsatisfied", y: 31 },
            // 	{ name: "Very Satisfied", y: 40 },
            // 	{ name: "Satisfied", y: 17 },
            // 	{ name: "Neutral", y: 7 }
            // ]
            this.applyChart(this.props.score && this.props.score.score),
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    score: users.score,
  };
}

export default connect(mapStateToProps)(PieChart);
