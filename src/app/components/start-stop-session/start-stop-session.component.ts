import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Session } from 'src/app/models/session';
import { Break } from 'src/app/models/break';
import { TimerService } from 'src/app/services/timer.service';
// import { PromptComponent } from '../prompt/prompt.component';

const timerMessages = {
  start: 'Let the countdown begin!!',
  running: 'Greatness is within sight!!',
  stop: 'Never quit keep going!!'
};

enum Status {
    STOP = 'STOP',
    PAUSE = 'PAUSE',
    RUNNING = 'RUNNING'
};

const qoutes = [
  "Good Work!!",
  "Keep it up!! You are doing great!",
  "Nothing is impossible!",
  "Stay Hydrated !!",
  "Dont Give up. You can achieve it!",
  "Dont Wish for it, Work for it!",
  "Dont let yesterday take too much of today.",
  "It might not be easy but it'll be worth it.",
  "Believe you can and you are halfway there.",
  "Stay hopeful.",
  "Make each day your masterpiece.",
  "Dont stop. Keep going!",
  "Focus.",
  "Be a voice not an echo."
]
const TOTAL_SECONDS = 0;

@Component({
  selector: 'app-start-stop-session',
  templateUrl: './start-stop-session.component.html',
  styleUrls: ['./start-stop-session.component.scss']
})
export class StartStopSessionComponent implements OnInit, OnDestroy {

  message: string = '';
  strHours: string = '';
  strMinutes: string = '';
  strSeconds: string = '';
  totalSeconds: number = TOTAL_SECONDS;
  timerId: any = null;
  status = Status.STOP;
  // promptComponent: PromptComponent | undefined;
  currentTimeMinutes: number | any;
  currentTimeSeconds: number | any;

  sessionList: Session[] = [];
  session:Session | any;

  constructor(public timerService:TimerService, public appComponent: AppComponent, private dialogRef: MatDialog){ }

  ngOnInit() {
    this.message = timerMessages.start;
    this.displayTime();
    this.timerService.waitForData().subscribe((sessionList:Session[])=>{
      this.sessionList = sessionList;
    })
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  countdown() {

    this.timerId = setInterval(() => {
    this.totalSeconds += 1;
    console.log(this.totalSeconds);
    this.displayTime();    }, 1000);

  }


  displayTime() {
    const seconds = this.totalSeconds % 60;
    const minutes = Math.floor((this.totalSeconds / 60) % 60);
    const hours = Math.floor(this.totalSeconds / 3600);

    this.strHours = (hours < 10) ? `0${hours}` : `${hours}`;
    this.strMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    this.strSeconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    this.pollCheckpointTimer();
  }

  startTimer() {
    if(this.status == Status.PAUSE){
      this.resumeTimer();
    } else {
      this.setStatus(Status.RUNNING);
      var timeStr = this.getTimeStr();
      const session:Session = {
        sessionId: this.sessionList.length.toString(),
        startTime: timeStr,
        endTime: timeStr,
        breakTime: [],
        taskIds: []
      }
      this.session = session;
      this.countdown();
    }
  }

  resumeTimer(){
    this.setStatus(Status.RUNNING);
    this.session.breakTime.at(-1).endTime = this.getTimeStr();
    this.countdown();
  }

  pauseTimer() {
    clearInterval(this.timerId);
    this.setStatus(Status.PAUSE);
    var timeStr = this.getTimeStr();
    const breakItem:Break = {
      startTime: timeStr,
      endTime: timeStr
    }
    this.session.breakTime.push(breakItem);
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.setStatus(Status.STOP);
    this.displayTime();

    this.session.endTime = this.getTimeStr();
    this.sessionList.push(this.session);
    this.appComponent.saveSessionData(this.sessionList);
    // this.openNotification();
  }

  setStatus(newStatus: Status) {
    this.status = newStatus;
    switch (newStatus) {
      case Status.STOP:
        this.message = timerMessages.start;
        this.totalSeconds = TOTAL_SECONDS;
        break;
      case Status.RUNNING:
        this.message = timerMessages.running;
        break;
      case Status.PAUSE:
        this.message = timerMessages.stop;
        break;
      default:
        break;
    }
  }

  openNotification()
  {
    // this.dialogRef.closeAll()
    // this.dialogRef.open(PromptComponent);
    this.appComponent.showCpNotification(this.getCheckpointStr(), this.getQoute());
  }

  getTimeStr(){
    return (Date.now()).toString();
  }

  pollCheckpointTimer() {
    if(this.status != Status.STOP){
      if(this.totalSeconds > 15*60){
        var currTime = new Date();
        this.currentTimeSeconds = currTime.getSeconds();
        this.currentTimeMinutes = currTime.getMinutes();
        if(this.currentTimeMinutes == 0 && this.currentTimeSeconds == 0){
          this.openNotification();
        }
      }
    }
  }

  getQoute(){
    var randomIndex = Math.floor(Math.random() * qoutes.length)
    return qoutes[randomIndex]
  }

  getCheckpointStr(){
    var currTime = new Date();
    var hour = currTime.getHours();
    var period = "AM";
    if(hour == 0){
      period = "AM";
      hour = 12;
    }else if(hour < 12){
      period = "AM";
    } else if(hour == 12){
      period = "PM";
    } else{
      period = "PM";
      hour -= 12;
    }
    return (hour+" "+period+" Checkpoint");
  }
}
