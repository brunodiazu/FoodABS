import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodapiComponent } from './foodapi.component';

describe('FoodapiComponent', () => {
  let component: FoodapiComponent;
  let fixture: ComponentFixture<FoodapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
