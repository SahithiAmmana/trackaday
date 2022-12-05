import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';


describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

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
      declarations: [ TodoListComponent ],
      providers: [
        AppComponent,
        { provide: ToastrService, useValue: toastrService },
        { provide: AngularFireModule }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.toggleClass()
  });
});
