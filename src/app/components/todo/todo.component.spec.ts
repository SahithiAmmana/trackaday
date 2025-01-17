import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';

import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { TaskTimestamp } from 'src/app/models/taskTimestamp';
import { Todo } from 'src/app/models/todo';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    const toastrService = {
      success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
      error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
    };

    await TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      providers: [
        AppComponent,
        { provide: ToastrService, useValue: toastrService },
        { provide: AngularFireModule }
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
    ]})
    .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
