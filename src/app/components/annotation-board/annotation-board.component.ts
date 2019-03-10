import { Component, OnInit, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { AnnotatedImage } from 'src/app/models/AnnotatedImage';
import { MatDialog } from '@angular/material';
import { EditAnnotationTitleDialog } from '../edit-annotation-title-dialog/edit-annotation-title-dialog.component';

@Component({
  selector: 'app-annotation-board',
  templateUrl: './annotation-board.component.html',
  styleUrls: ['./annotation-board.component.css']
})
export class AnnotationBoardComponent implements OnInit {
  annotateddata: AnnotatedImage;
  private mouseDown: boolean = false;
  startx: number = 0;
  starty: number = 0;
  private listen: boolean = false;
  scratchon: string = "hidden";
  scratchwidth: number = 0;
  scratchheight: number = 0;

  @ViewChild('container') containerDiv: ElementRef;
  @ViewChild('boardcontainer') boardcontainer: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('scratchpad') scratchpad: ElementRef;
  //@Input() imagesource: string;

  top: number;
  left: number;

  public get width(): number {
    return this.containerDiv.nativeElement.offsetWidth;
  }
  public get height(): number {
    return this.containerDiv.nativeElement.offsetHeight;
  }

  setImage(src: string) {
    this.image.nativeElement.src = src;
  }

  setextents() {
    let h: number = this.image.nativeElement.naturalHeight;
    let w: number = this.image.nativeElement.naturalWidth;
    let bh: number = this.boardcontainer.nativeElement.offsetHeight;
    let bw: number = this.boardcontainer.nativeElement.offsetWidth;

    if (w / h > bw / bh) {
      // if image is wider than the place to fit then adjust height of board as width will span full
      this.containerDiv.nativeElement.style.height =
        (Math.ceil(bw * h / w)).toString() + "px";
      this.containerDiv.nativeElement.style.width =
        bw.toString() + "px";
    }
    else {
      this.containerDiv.nativeElement.style.width =
        (Math.ceil(bh * w / h)).toString() + "px";
      this.containerDiv.nativeElement.style.height =
        bh.toString() + "px";
    }

    console.log(this.containerDiv.nativeElement.style.width);
  }


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.updateTopLeft();

    console.log(this.left, this.top);
  }

  setup(d: AnnotatedImage): void {
    this.annotateddata = d;
  }

  getX(x: number) {
    return x - this.left;
  }

  getY(y: number) {
    return y - this.top;
  }

  getNewAnnotation() {
    this.listen = true;
    console.log("listening");
  }

  enableScratchPad() {
    this.scratchon = "visible";
    console.log("scratch on");
  }

  updateTopLeft() {
    this.left = this.containerDiv.nativeElement.getBoundingClientRect().left;
    this.top = this.containerDiv.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateTopLeft();
    this.setextents();
  }

  disableScratchPad() {
    this.scratchon = "hidden";
    this.scratchwidth = 0;
    this.scratchheight = 0;
    this.listen = false;
  }

  onMouseenter(event: MouseEvent) {
    //this.listen = true;
  }

  onMouseleave(event: MouseEvent) {
    this.listen = false;
    this.mouseDown = false;
    this.disableScratchPad();
  }

  onMouseup(event: MouseEvent) {
    if (!this.listen) return;
    if (event.button != 0) return;
    if (this.mouseDown) {
      this.mouseDown = false;
      console.log(this.startx, this.starty, this.scratchwidth, this.scratchheight);
      let c: string = "specify caption";
      let l: number = this.startx / this.width;
      let t: number = this.starty / this.height;
      let w: number = (this.startx + this.scratchwidth) / this.width;
      let h: number = (this.starty + this.scratchheight) / this.height;

      const dialogRef = this.dialog.open(EditAnnotationTitleDialog, {
        width: '250px',
        data: { caption: c }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) c = result;
        this.annotateddata.addAnnotation(l, t, w, h, c);
      });
      this.disableScratchPad();
    }
  }

  onMousemove(event: MouseEvent) {
    if (!this.listen) return;
    if (event.button != 0) return;
    if (this.mouseDown) {
      let x = this.getX(event.clientX);
      let y = this.getY(event.clientY);
      this.scratchwidth = Math.abs(x - this.startx);
      this.scratchheight = Math.abs(y - this.starty);
      this.startx = Math.min(x, this.startx);
      this.starty = Math.min(y, this.starty);
      //console.log(this.startx, this.starty, x, y);
    }
  }


  onMousedown(event: MouseEvent) {
    if (!this.listen) return;
    if (event.button != 0) return;
    // later may need to add some cases for edit existing annotation
    this.mouseDown = true;
    this.startx = this.getX(event.clientX);
    this.starty = this.getY(event.clientY);
    console.log(this.startx, this.starty);
    this.enableScratchPad();
    console.log(this.left, this.top);
  }

}
