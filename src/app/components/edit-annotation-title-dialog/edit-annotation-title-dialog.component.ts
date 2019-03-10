import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  caption: string;
}

@Component({
  selector: 'app-edit-annotation-title-dialog',
  templateUrl: './edit-annotation-title-dialog.component.html',
  styleUrls: ['./edit-annotation-title-dialog.component.css']
})
export class EditAnnotationTitleDialog {

  constructor(
    public dialogRef: MatDialogRef<EditAnnotationTitleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log("in dialog", this.data.caption);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
