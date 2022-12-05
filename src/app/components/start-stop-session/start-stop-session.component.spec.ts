import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { TimerService } from 'src/app/services/timer.service';

import { StartStopSessionComponent } from './start-stop-session.component';

describe('StartStopSessionComponent', () => {
  let component: StartStopSessionComponent;
  let fixture: ComponentFixture<StartStopSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartStopSessionComponent ],
      providers: [AppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartStopSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // component.startTimer()
    // component.pauseTimer()
    // component.resumeTimer()
    // component.stopTimer()
  });
});
