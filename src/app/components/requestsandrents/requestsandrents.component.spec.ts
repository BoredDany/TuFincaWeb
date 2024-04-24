import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestsandrentsComponent } from './requestsandrents.component';


describe('RequestsandrentsComponent', () => {
  let component: RequestsandrentsComponent;
  let fixture: ComponentFixture<RequestsandrentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsandrentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsandrentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
