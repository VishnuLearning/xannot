import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Annotation } from 'src/app/models/annotation';
import { MatDialog } from '@angular/material';
import { EditAnnotationTitleDialog } from '../edit-annotation-title-dialog/edit-annotation-title-dialog.component';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  @Input() annotation:Annotation;
  @Input() imageWidth:number;
  @Input() imageHeight:number;

  @Output() delete:EventEmitter<void> = new EventEmitter<void>();

  remove() {
    this.delete.emit();
  }
  
  public get width() : number {
    return (this.annotation.right - this.annotation.left)*this.imageWidth;
  }
  
  public get height() : number {
    return (this.annotation.bottom - this.annotation.top)*this.imageHeight;
  }

  public get left() : number {
    return (this.annotation.left)*this.imageWidth;
  }

  public get top() : number {
    return (this.annotation.top)*this.imageHeight;
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditAnnotationTitleDialog, {
      width: '250px',
      data: {caption: this.annotation.caption}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.annotation.caption = result;
    });
  }


  ngOnInit() {
    console.log(this.annotation.caption);
  }

  getLeft():number {
    return this.annotation.left; //consider as a number between 0/1
    //get the image dimensions and multiply by image width
  }

}
