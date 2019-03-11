import { ChangeDetectionStrategy, Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, ChangeDetectorRef, HostListener } from '@angular/core';
import { AnnotationBoardComponent } from './components/annotation-board/annotation-board.component';
import { ElectronService } from 'ngx-electron';
import { AnnotationService } from './services/annotation.service';
import { MetadataComponent } from './components/metadata/metadata.component';
import { BehaviorSubject } from 'rxjs';
import { AnnotatedImage } from './models/AnnotatedImage';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'dentalDataTool';
  dirpath: string = "";
  files: string[] = [];
  displayFiles: string[] = [];
  filteredfiles = new BehaviorSubject<string[]>(this.displayFiles);
  currentfile: string = "";
  currentFileSource: string = "./assets/placeholder-image.png";
  currentMeta: AnnotatedImage;
  saving: boolean = false;
  openingfolder: boolean = false;
  isLoading: string = "false";

  @ViewChild('annotationBoard') annotationBoard: AnnotationBoardComponent;
  @ViewChild('metadata') metadata: MetadataComponent;

  constructor(private electronService: ElectronService,
    private annotationService: AnnotationService,
    private ref: ChangeDetectorRef, private snackBar: MatSnackBar) {
    this.electronService.remote.Menu.setApplicationMenu(null);
  }

  bootstrapAnnotations() {
    this.annotationService.nextAnnotation(this.dirpath, this.currentfile);
    this.isLoading = "false";
  }
  bootstrapNewAnnotation() {
    this.annotationBoard.getNewAnnotation();
  }


  saveData() {
    this.saving = true;
    let datafile: string = this.currentfile.substring(0, this.currentfile.lastIndexOf('.')) + ".json";
    this.files.push(datafile);
    this.electronService.ipcRenderer.once("saveAnnotationResponse", (event, arg: string) => {
      this.snackBar.open(arg, "", { duration: 5000 });
      this.saving = false;
    });
    this.electronService.ipcRenderer.send('save_annotations',
      {
        'filename': this.dirpath + "/" + datafile,
        'data': JSON.stringify(this.currentMeta)
      });
  }

  openFolder() {
    this.openingfolder = true;
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory'] },
      (path) => {
        if (path && path.length > 0) {
          this.getFiles(path[0]);
        } else {
          this.openingfolder = false;
        }
      })
  }

  setFiles(filelist: Array<string>, folderpath:string) {
    this.files = filelist;
    let x: Array<string> = new Array<string>();

    for (let i = 0; i < filelist.length; i++) {
      if (this.isImage(filelist[i])) {
        x.push(filelist[i]);
      }
    }
    this.displayFiles = x;
    if (this.displayFiles.length == 0) {
      this.snackBar.open("there are no images in this folder. Load another", "", { duration: 5000 });
    } else {
      this.filteredfiles.next(this.displayFiles);
      this.dirpath = folderpath;
    }

  }

  async getFiles(folderpath:string) {
    this.electronService.ipcRenderer.once("getDirectoryResponse", (event, arg: Array<string>) => {
      this.setFiles(arg, folderpath);
      this.openingfolder = false;
    });
    this.electronService.ipcRenderer.send("getDirectoryImages", folderpath);
  }

  filename(file: string): string {
    return file.substring(0, file.lastIndexOf("."));
  }

  isImage(file: string): boolean {
    if (file.toLowerCase().endsWith('.jpg')) return true;
    return false;
  }

  isSelected(file: string): boolean {
    return this.currentfile==file;
  }

  isAnnotated(file: string): string {
    let annotatedfile: string = this.filename(file) + ".json";
    if (this.files.find((arg) => { return arg == annotatedfile })) {
      return "true";
    } else {
      return "false";
    }
  }

  annotate(file: string) {
    this.currentfile = file;
    this.isLoading = "true";
    this.currentFileSource = "file://" + this.dirpath + "/" + file;
    this.annotationBoard.setImage(this.currentFileSource);
    this.bootstrapAnnotations();
  }

  async getUserSettings() {
    this.electronService.ipcRenderer.once("getSettingsResponse", (event, arg: string) => {
      try {
        let settings = JSON.parse(arg);
        if (settings.folder != undefined && settings.folder != '') {
          this.getFiles(settings.folder);
        } else {
          this.snackBar.open("no folder oepened", "", { duration: 2000 });
          this.openingfolder = false;
        }
      } catch (err) {
        this.snackBar.open(err, "", { duration: 2000 });
        this.openingfolder = false;
      }
    });
    this.electronService.ipcRenderer.send("getUserSettings", this.dirpath);
  }

  getHeight() {
    return window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.getUserSettings();
    this.annotationService.getAnnotataionData().subscribe(x => {
      this.currentMeta = x;
      this.metadata.setup(x);
      this.annotationBoard.setup(x);
      this.ref.detectChanges();
    })
  }
}
