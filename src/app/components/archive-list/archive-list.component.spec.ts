import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

import { ArchiveListComponent } from './archive-list.component';

describe('ArchiveListComponent', () => {
  let component: ArchiveListComponent;
  let fixture: ComponentFixture<ArchiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      declarations: [
        // AppComponent,
        ArchiveListComponent
      ],
      providers: [
        { provide: AngularFireModule },
        // { provide: ToastrService, useValue: ToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
