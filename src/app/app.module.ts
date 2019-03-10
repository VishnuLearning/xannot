import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxElectronModule } from 'ngx-electron';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatListModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatSelectModule, MatProgressSpinnerModule, MatIconModule, MatDialogModule, MatSnackBarModule} from '@angular/material';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { AnnotationBoardComponent } from './components/annotation-board/annotation-board.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MetadataComponent } from './components/metadata/metadata.component';
import { ScrollingModule, ScrollDispatcher} from '@angular/cdk/scrolling';
import { EditAnnotationTitleDialog } from './components/edit-annotation-title-dialog/edit-annotation-title-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationComponent,
    AnnotationBoardComponent,
    MetadataComponent,
    EditAnnotationTitleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSelectModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [ScrollDispatcher],
  bootstrap: [AppComponent],
  entryComponents: [EditAnnotationTitleDialog]
})
export class AppModule { }
