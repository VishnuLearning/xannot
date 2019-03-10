import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnotationTitleDialog } from './edit-annotation-title-dialog.component';

describe('EditAnnotationTitleDialog', () => {
  let component: EditAnnotationTitleDialog;
  let fixture: ComponentFixture<EditAnnotationTitleDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnnotationTitleDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnotationTitleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
