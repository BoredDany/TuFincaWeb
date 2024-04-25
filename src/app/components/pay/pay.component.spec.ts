import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayComponent } from './pay.component';

describe('MyPropertiesComponent', () => {
  let component: PayComponent;
  let fixture: ComponentFixture<PayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayComponent],
      imports: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
