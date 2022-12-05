import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      ToastrModule.forRoot(), // added this works for me
      AngularFireModule.initializeApp(environment.firebase),
      RouterTestingModule
  ],
  providers: [AngularFireAuth, TodoService, AppComponent]
  });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
