import { AppData } from "../models/appData";
import { Break } from "../models/break";

// Function to initialise the averageHourlyStats array. That is initialise all the average hour values to zero.
function initialise_average_hourly_stats(averageHourlyStats: any) {
  for (let hour = 0; hour < 24; hour++) {
    averageHourlyStats[hour] = 0;
  }
}

// Function to add the hours to the total averageHourlyStats during the over all session time and remove the hours during the break time.
function add_or_remove_hours(hour: any, hour_fraction: any, daysSoFar: any, averageHourlyStats: any, toAdd: any) {
  if (toAdd) {
    averageHourlyStats[hour] = ((averageHourlyStats[hour] * (daysSoFar - 1)) + hour_fraction) / daysSoFar;
  }
  else {
    averageHourlyStats[hour] = ((averageHourlyStats[hour] * (daysSoFar - 1)) - hour_fraction) / daysSoFar;
  }
}

// Funtion to  add the hours to the total averageHourlyStats during a particular start and end dates.
function add_hour_data(startDate: any, endDate: any, daysSoFar: any, averageHourlyStats: any, toAdd: any) {
  let startHour = startDate.getUTCHours();
  let endHour = endDate.getUTCHours();
  let hour = startHour;
  while (hour <= endHour) {
    if (hour == startHour) {
      let hour_fraction = (startDate.getUTCMinutes()) / 60;
      add_or_remove_hours(hour, hour_fraction, daysSoFar, averageHourlyStats, toAdd);
    }
    else if (hour == endHour) {
      let hour_fraction = (endDate.getUTCMinutes()) / 60;
      add_or_remove_hours(hour, hour_fraction, daysSoFar, averageHourlyStats, toAdd);
    }
    else {
      add_or_remove_hours(hour, 1, daysSoFar, averageHourlyStats, toAdd);
    }
    hour += 1;
  }
}

// Function to remove the hours that were added as part of the session time but were not active as they were part of the break time.
function removeBreakTime(breakTime: any, totalTimeForDay: any, startDate: any, endDate: any, daysSoFar: any, averageHourlyStats: any) {
  if (breakTime.length != 0) {
    for (let breakIdx in breakTime) {
      var breakStart = new Date(parseInt(breakTime[breakIdx].startTime));
      if (breakStart.getUTCDate() == startDate.getUTCDate() && breakStart.getTime() < endDate.getTime()) {
        var breakEnd = new Date(parseInt(breakTime[breakIdx].endTime));
        if (breakEnd.getUTCDate() == startDate.getUTCDate() && breakEnd.getTime() < endDate.getTime()) {
          totalTimeForDay -= breakEnd.getTime() - breakStart.getTime();
          add_hour_data(breakStart, breakEnd, daysSoFar[0], averageHourlyStats, false);
        }
        else {
          totalTimeForDay -= endDate.getTime() - breakStart.getTime();
          add_hour_data(breakStart, endDate, daysSoFar[0], averageHourlyStats, false);
        }
      }
    }
  }
  return totalTimeForDay;
}

// Function to add the session details to the time Tracking Stats array
function addSessionToTimeTrackingStats(dateString: any, sessionDetails: any, timeTrackingStats: any) {
  if (timeTrackingStats.hasOwnProperty(dateString)) {
    timeTrackingStats[dateString].push(sessionDetails); // Session Id, Total Time of the session (in ms)
  }
  else {
    timeTrackingStats[dateString] = [sessionDetails];
  }
}

// Function to add the task details to the task Tracking Stats array
function addTaskToTaskTrackingStats(dateString: any, taskDetails: any, taskTrackingStats: any) {
  if (taskTrackingStats.hasOwnProperty(dateString)) {
    taskTrackingStats[dateString].push(taskDetails); // Task Id, Total Time of the task (in ms)
  }
  else {
    taskTrackingStats[dateString] = [taskDetails];
  }
}

// Function to split the session in between two days if the session is extended to the next day and use the days as seperate info
function spiltBtwTwoDays(startDate: any, endDate: any) {
  var endOfDayOne = new Date(startDate);
  endOfDayOne.setUTCHours(23, 59, 59, 59);
  var startOfDayTwo = new Date(endDate);
  startOfDayTwo.setUTCHours(0, 0, 0, 0);
  var totalTimeForDayOne = endOfDayOne.getTime() - startDate.getTime();
  var totalTimeForDayTwo = endDate.getTime() - startOfDayTwo.getTime();
  return [totalTimeForDayOne, totalTimeForDayTwo];
}

// Function to the Date String from the UTC Date format to DD-MM-YYYY format
function getDateString(date: any) {
  return date.getUTCDate().toString() + "-" + (date.getUTCMonth() + 1).toString() + "-" + date.getUTCFullYear().toString();
}

// Function to get the over all time tracking stats based on all the sessions so far
export function getTimeTrackingStats(data: AppData) {
  var timeTrackingStats: any = new Object(); // Array of Days-Day Dictionary - key: Day and value is array of sessions
  var averageHourlyStats: any = new Object(); // Array of Hours-Hour Dictionary - key: Hour and value is average number of hours over the days
  var daysSoFar: any = [0];
  initialise_average_hourly_stats(averageHourlyStats);
  for (let index in data.session) {
    var session = data.session[index];
    console.log(session);

    var startDate = new Date(parseInt(session.startTime));
    var endDate = new Date(parseInt(session.endTime));
    var breakTime: Break[] = [];
    if (session.breakTime != null) {
      breakTime = session.breakTime
    }
    var dateStartString = getDateString(startDate);
    daysSoFar[0] += 1;
    if (startDate.getUTCDate() != endDate.getUTCDate()) {
      var dateEndString = getDateString(endDate);
      var totalTimeForDayList = []
      var totalTimeForDayOne = 0
      var totalTimeForDayTwo = 0
      var endOfDayOne = new Date(startDate);
      endOfDayOne.setUTCHours(23, 59, 59, 59);
      var startOfDayTwo = new Date(endDate);
      startOfDayTwo.setUTCHours(0, 0, 0, 0);
      totalTimeForDayList = spiltBtwTwoDays(startDate, endDate);
      add_hour_data(startDate, endOfDayOne, daysSoFar[0], averageHourlyStats, true);
      totalTimeForDayOne = removeBreakTime(breakTime, totalTimeForDayList[0], startDate, endOfDayOne, daysSoFar, averageHourlyStats);
      daysSoFar[0] += 1;
      add_hour_data(startDate, endOfDayOne, daysSoFar[0], averageHourlyStats, true);
      totalTimeForDayTwo = removeBreakTime(breakTime, totalTimeForDayList[1], startOfDayTwo, endDate, daysSoFar, averageHourlyStats);
      addSessionToTimeTrackingStats(dateStartString, [session.sessionId, totalTimeForDayOne], timeTrackingStats);
      addSessionToTimeTrackingStats(dateEndString, [session.sessionId, totalTimeForDayTwo], timeTrackingStats);
    }
    else {
      var totalTimeForDay = endDate.getTime() - startDate.getTime();
      add_hour_data(startDate, endDate, daysSoFar[0], averageHourlyStats, true);
      totalTimeForDay = removeBreakTime(breakTime, totalTimeForDay, startDate, endDate, daysSoFar, averageHourlyStats);
      addSessionToTimeTrackingStats(dateStartString, [session.sessionId, totalTimeForDay], timeTrackingStats);
    }
  }
  console.log('timeTrackingStats - ', timeTrackingStats);
  console.log('averageHourlyStats - ', averageHourlyStats);

  return [Object.keys(timeTrackingStats).map(day => {
    let sum = 0;
    Object.values(timeTrackingStats[day]).forEach(val => {
      sum += (val as any[])[1];
    });
    console.log({ [day]: sum });
    return [day, sum / (36 * (10 ** 5))];
  }), averageHourlyStats];
}

// Function to get the over all task tracking stats based on all the tasks so far
export function getTaskTrackingStats(data: any) {
  var taskTrackingStats: any = new Object(); // Array of Days-Day Dictionary - key: Day and value is array of tasks
  for (let index in data.tasks) {
    var task = data.tasks[index];
    var dateStartString = "";
    var totalTimeForDay = 0;
    for (let timeIdx in task.timeStamps) {
      var timeStamp = task.timeStamps[timeIdx];
      var startDate = new Date(parseInt(timeStamp.startTime));
      var endDate = new Date(parseInt(timeStamp.endTime));
      dateStartString = getDateString(startDate);
      if (startDate.getUTCDate() != endDate.getUTCDate()) {
        var totalTimeForDays = spiltBtwTwoDays(startDate, endDate);
        totalTimeForDay += totalTimeForDays[0];
        addTaskToTaskTrackingStats(dateStartString, [task.taskId, totalTimeForDay, task.title, task.isCompleted], taskTrackingStats);
        totalTimeForDay = totalTimeForDays[1];
        dateStartString = getDateString(endDate);
      }
      else {
        totalTimeForDay += endDate.getTime() - startDate.getTime();
      }
    }
    addTaskToTaskTrackingStats(dateStartString, [task.taskId, totalTimeForDay, task.title, task.isCompleted], taskTrackingStats);
  }
  console.log('taskTrackingStats - ', taskTrackingStats);

  return taskTrackingStats;
}
