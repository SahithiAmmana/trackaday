import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Point, registerables } from "chart.js";
import { DataKey } from 'src/app/models/dataKey';
import { getTaskTrackingStats, getTimeTrackingStats } from 'src/app/stats/stats';
const electron = (<any>window).require('electron');

Chart.register(...registerables);


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {
  private data: Point[];
  private result: any;


  constructor() {
    this.data = [{ x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 6 }, { x: 4, y: 2 }, { x: 4.1, y: 6 }];
  }

  ngOnInit(): void {
    this.readAppData(DataKey.ALL_KEY);
  }

  readAppData(key: DataKey) {
    // this.isReading = true;
    console.log("trying to read data")
    return new Promise(resolve => {
      electron.ipcRenderer.send('read-data', key)

      electron.ipcRenderer.once('read-data-reply', (event: any, result: any) => {
        console.log("Data read by analysis: "+result);

        // resolve(result);
        // this.readCallback(key, result);
        // console.log(result);
        // eval("document.getElementById('abcd').innerHTML = JSON.stringify(" + JSON.stringify(result) + ");");

        this.result = result;

        this.createTimeTrackigStatsChart(); // branch1
        this.createTaskTrackingList();
        this.createHourlyTrackingList();
      })
    })
  }

  createTimeTrackigStatsChart() {
    let stats = getTimeTrackingStats(this.result); //branch 1.1
    const timeTrackingStats = stats[0];

    const labelsList = timeTrackingStats.map((val: any[]) => val[0]);

    const dataList = timeTrackingStats.map((val: any[]) => val[1]);

    const backgroundColorList = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];

    const borderColorList = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    const myChart = new Chart("timeTrackingStats", {
      type: 'bar',
      data: {
        labels: labelsList,
        datasets: [{
          label: 'No. of hours worked for last 30 days',
          data: dataList,
          backgroundColor: Array(labelsList.length).fill(0).map((_, index) => backgroundColorList[index % backgroundColorList.length]),
          borderColor: Array(labelsList.length).fill(0).map((_, index) => borderColorList[index % borderColorList.length]),
          borderWidth: 1
        }]
      }
    });

  }

  createTaskTrackingList() {
    const taskTrackingStatsList = getTaskTrackingStats(this.result);

    // Implementation for collapsible task list
    let taskTrackingElement = "<ul>";
    Object.keys(taskTrackingStatsList).map(day => {
      let taskUL = "";
      taskTrackingStatsList[day].forEach((val: any[]) => {
        taskUL += "<li class=\"collection-item\">'" + val[2] + "' task time: " + Math.round(val[1] / (36 * (10 ** 5)) * 100) / 100 + " hrs</li>"
      });
      taskUL += "</li>";
      const k = "\"collapsible-body-" + day + "\"";
      const func = "(()=>{if(document.getElementById(" + k + ").style.display==\"\") {document.getElementById(" + k + ").style.display=\"block\"} else {document.getElementById(" + k + ").style.display=\"\"}})()";
      taskTrackingElement += "<li><div class='collapsible-header' onClick=''>" + day + "</div><div class='collapsible-body' id='collapsible-body-" + day + "'>" + taskUL + "</div></li>"
    });

    const el = document.getElementById("taskTrackingStats");
    if (el !== null) {
      el.innerHTML = taskTrackingElement;
    }
  }

  createHourlyTrackingList() {
    let stats = getTimeTrackingStats(this.result);
    const timeTrackingStats = stats[1];

    const labelsList = Array(24).fill(0).map((_, index) => index);

    const dataList = labelsList.map(val => timeTrackingStats[val]);

    const backgroundColorList = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];

    const borderColorList = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    const myChart = new Chart("hourlyTrackingStats", {
      type: 'bar',
      data: {
        labels: labelsList,
        datasets: [{
          label: 'Average user involvment during the day',
          data: dataList,
          backgroundColor: Array(labelsList.length).fill(0).map((_, index) => backgroundColorList[index % backgroundColorList.length]),
          borderColor: Array(labelsList.length).fill(0).map((_, index) => borderColorList[index % borderColorList.length]),
          borderWidth: 1
        }]
      }
    });


  }
}
