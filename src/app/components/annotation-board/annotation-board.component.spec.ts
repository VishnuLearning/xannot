import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationBoardComponent } from './annotation-board.component';

describe('AnnotationBoardComponent', () => {
  let component: AnnotationBoardComponent;
  let fixture: ComponentFixture<AnnotationBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
