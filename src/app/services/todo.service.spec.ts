import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';
import { TaskTimestamp } from '../models/taskTimestamp';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      AngularFireModule.initializeApp(environment.firebase),
      RouterTestingModule
  ],
  providers: [AngularFireAuth, TodoService, AppComponent, { provide: ToastrService, useValue: ToastrService }]
  });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const timeStamp: TaskTimestamp = {
      startTime: "12344",
      endTime: "12345",
      sessionId: "1"
    }
    const item: Todo = {
      taskId: 1,
      isCompleted: false,
      isFavorite: false,
      isPinned: false,
      date: new Date().toISOString(),
      title: "taskTitle",
      isArchived: false,
      timeStamps: [timeStamp]
    }
    service.todoList = [item];
    service.save()
    service.completed(item);
    service.updateFav(item);
    service.archiveTodo(item);
    service.updatePin(item);
    service.deleteTodo(item);
    service.addTodo("test1");
  });
});
