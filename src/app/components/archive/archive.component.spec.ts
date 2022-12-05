import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { TodoService } from 'src/app/services/todo.service';
import { environment } from 'src/environments/environment';

import { ArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async () => {

    const toastrService = {
      success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
      error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
    };

    await TestBed.configureTestingModule({imports: [
        RouterTestingModule, AngularFireModule.initializeApp(environment.firebase),
    ],
      providers: [AppComponent,{ provide: AngularFireModule },{ provide: ToastrService, useValue: toastrService },],
      declarations: [ ArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
