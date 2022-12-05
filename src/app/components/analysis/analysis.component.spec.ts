import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

import { AnalysisComponent } from './analysis.component';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(async () => {
    const toastrService = {
      success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
      error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
    };
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
      ],
      providers: [AppComponent, { provide: ToastrService, useValue: toastrService }, { provide: AngularFireModule }],
      declarations: [AnalysisComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
