import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Session } from '../models/session';
import { TimerService } from './timer.service';

describe('TimerService', () => {
describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [AngularFireAuth, AppComponent, { provide: ToastrService, useValue: ToastrService }]
    });
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    const session: Session = {
      sessionId: "0",
      taskIds: ["1","2"],
      startTime: "123456",
      endTime: "123488"
    }
    service.delay(10);
    service.readDataStore()
    service.save()
    console.log(service.sessionList)
    service.saveSessionData(session)
    });
  });
});
