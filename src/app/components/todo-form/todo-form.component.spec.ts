import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    const toastrService = {
      success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
      error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
    };

    await TestBed.configureTestingModule({
      declarations: [ TodoFormComponent ],
      providers: [AppComponent, { provide: AngularFireModule },{ provide: ToastrService, useValue: toastrService }],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        FormsModule
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
