import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

import { SigninComponent } from './signin.component';


describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
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
      providers: [AppComponent,
        { provide: ToastrService, useValue: toastrService },
        { provide: AngularFireModule }
      ],
      declarations: [ SigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.email="saipavanyalla@gmail.com"
    component.password="saipavan99."
    component.name="Sai Pavan"
    component.signUp()
    component.signIn();
    expect(component).toBeTruthy();
  });
});
