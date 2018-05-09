import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemployeeworkComponent } from './editemployeework.component';

describe('EditemployeeworkComponent', () => {
  let component: EditemployeeworkComponent;
  let fixture: ComponentFixture<EditemployeeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditemployeeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditemployeeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
