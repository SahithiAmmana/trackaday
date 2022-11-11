![Screenshot](https://github.com/vishalsh94/trackaday/blob/main/images/screenshot.jpg?raw=true)


<h2 align="center">Track-a-Day</h2>

<a href="https://github.com/vishalsh94/trackaday/actions"><img alt="Build Status" src="https://github.com/vishalsh94/trackaday/actions/workflows/node.js.yml/badge.svg"></a> <a href="https://github.com/vishalsh94/trackaday/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/vishalsh94/trackaday"></a> [![DOI](https://zenodo.org/badge/528539896.svg)](https://zenodo.org/badge/latestdoi/528539896) [![GitHub top language](https://img.shields.io/github/languages/top/vishalsh94/trackaday)](https://docs.python.org/3/) [![GitHub last commit](https://img.shields.io/github/last-commit/vishalsh94/trackaday)](https://github.com/vishalsh94/trackaday/commits/main) [![codecov.io Code Coverage](https://img.shields.io/codecov/c/github/vishalsh94/trackaday.svg?maxAge=2592000)](https://codecov.io/github/vishalsh94/trackaday?branch=master) [![Github](https://img.shields.io/badge/language-typescript-red.svg)](https://www.typescriptlang.org/)



> “Your accountability partner for focused work.”



This desktop programme helps you monitor and enhance your productivity.

A desktop programme called Track-a-Day can be utilized to keep track of daily tasks. The tasks that users wish to finish are added.
The user then adjusts the timer to retain track of their progress. Every hour, a pop-up encourages the user with an encouraging phrase. After the timer has begun, a pause and stop button is presented. The timer can be halted by users for breaks. Users can suspend the timer at the end of the day to get an overview of the current session.
User can access a report on their session evaluation. Users receive up to 30 sessions to assess.


## Demo Video
https://drive.google.com/file/d/1YQajSqeIZ3xLBDmzofZ_2pLaI2lc6nsD/view 

## Installation and Usage

You must have npm installed on your system. 

Run the following commands to install Angular and Electron.js- 

```sh
npm install -g @angular/cli
```
```sh
npm install --save-dev electron@latest
```

Clone the repository and cd into the root directory. Then run the following commands - 
```sh
npm install
```
```sh
npm start
```
The desktop application should open in a new window.

The home page has a timer and a ToDo List. You can add your items in the ToDo list and press START to begin tracking your progress. 

Click PAUSE if you want to take a break and STOP if you want to close out the work session. 

While the timer is RUNNING or is PAUSED (not STOPPED) you will receive a desktop notification (works on both Windows and Mac) every hour to make sure you are engaged and not distracted during your session. (This will run at the beginning of every hour e.g. at 1PM, 2PM, 3PM etc according to the local clock of your computer) 

![Screenshot](https://github.com/vishalsh94/trackaday/blob/main/images/hourly_notification.png?raw=true)


When you click STOP and close out the session, the amount of time you worked, took a break and the number of activities you completed will be logged in the database. 

When you click on the Analytics tab, you can see information about your weekly performance. 

![Screenshot](https://github.com/vishalsh94/trackaday/blob/main/images/graphs.png?raw=true)

It shows you the number of hours worked per day as well as when you usually work during the day. 


## Documentation
https://arnab-95.github.io/ 


