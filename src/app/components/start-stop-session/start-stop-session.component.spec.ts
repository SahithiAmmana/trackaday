import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

import { StartStopSessionComponent } from './start-stop-session.component';

describe('StartStopSessionComponent', () => {
  let component: StartStopSessionComponent;
  let fixture: ComponentFixture<StartStopSessionComponent>;

  beforeEach(async () => {
    const toastrService = {
      success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
      error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
    };

    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        MatDialogModule,
        RouterTestingModule
      ],
      declarations: [ StartStopSessionComponent ],
      providers: [
        AppComponent,
        { provide: ToastrService, useValue: toastrService },
        { provide: AngularFireModule }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartStopSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.startTimer()
    component.pauseTimer()
    component.resumeTimer()
    component.stopTimer()
  });
});
