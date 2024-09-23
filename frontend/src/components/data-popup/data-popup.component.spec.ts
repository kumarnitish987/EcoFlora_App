import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPopupComponent } from './data-popup.component';

describe('DataPopupComponent', () => {
  let component: DataPopupComponent;
  let fixture: ComponentFixture<DataPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
