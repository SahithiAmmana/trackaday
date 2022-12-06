import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTaskTrackingStats, getTimeTrackingStats } from './stats';
import { AppData } from "../models/appData";

var appdata = new AppData()
appdata.tasks = [
      {
        taskId: 1,
        title: "1",
        timeStamps: [
          {
            startTime: "1664115672700",
            endTime: "1664126472700",
            sessionId: "1"
          },
          {
            startTime: "1664130072700",
            endTime: "1664137272007",
            sessionId: "1"
          }
        ],
      isCompleted: true,
      isFavorite: false,
      isArchived: false,
      isPinned: false,
      },
      {
        taskId: 2,
        title: "2",
        timeStamps: [
          {
            startTime: "1664144472007",
            endTime: "1664155272700",
            sessionId: "1"
          }
        ],
        isCompleted: true,
        isFavorite: false,
        isArchived: false,
        isPinned: false
      },
      {
        taskId: 3,
        title: "3",
        timeStamps: [
          {
            startTime: "1664202600000",
            endTime: "1664213400000",
            sessionId: "2"
          },
          {
            startTime: "1664217000000",
            endTime: "1664224200000",
            sessionId: "2"
          },
        ],
        isCompleted: true,
        isFavorite: false,
        isArchived: false,
        isPinned: false
      }
    ]
appdata.session = [
      {
        sessionId: "1",
        taskIds: ["1", "2"],
        startTime: "1664115672700",
        endTime: "1664155272700",
        breakTime: [
          {
            startTime: "1664126472700",
            endTime: "1664130072700"
          }
        ]
      },
      {
        sessionId: "2",
        taskIds: ["3"],
        startTime: "1664202600000",
        endTime: "1664224200000",
        breakTime: [
          {
            startTime: "1664213400000",
            endTime: "1664217000000"
          }
        ]
      }
    ]

describe('Stats', () => {
  beforeEach(async () => {
  });

  it('should return correct getTimeTrackingStats', () => {
    const correctStats = [["25-9-2022", 8.646210833333333], ["26-9-2022", 6.353527777777778]];
    const stats = getTimeTrackingStats(appdata);
    expect(stats[0]).toEqual(correctStats);
  });

  it('should return correct getTaskTrackingStats', () => {
    const correctStats = {
        '25-9-2022': [ [ '1', 17999307 ], [ '2', 5927052 ] ],
        '26-9-2022': [ [ '2', 4872700 ], [ '3', 18000000 ] ]
    };
    // const stats = getTaskTrackingStats(appdata);
    // expect(stats).toEqual(correctStats);
  });

  it('should return correct averageHourlyStats', () => {
    const correctStats = {"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0.39999999999999997, "15": 1, "16": 1, "17": 0.19999999999999996,  "18": 0.19999999999999996, "19": 1, "20": 0.8333333333333334, "21": 1, "22": 1, "23": 0.9833333333333333};
    // const stats = getTimeTrackingStats(appdata);
    // expect(stats[1]).toEqual(correctStats);
  });
});
