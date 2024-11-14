import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvisoryAdvisorComponent } from './create-advisory-advisor.component';

describe('CreateAdvisoryAdvisorComponent', () => {
  let component: CreateAdvisoryAdvisorComponent;
  let fixture: ComponentFixture<CreateAdvisoryAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdvisoryAdvisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdvisoryAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
