import { Component, OnInit} from '@angular/core';
import { DiagnosticImage } from 'src/app/models/diagnosticimage';
import { AnnotationService } from 'src/app/services/annotation.service';
import { AnnotatedImage } from 'src/app/models/AnnotatedImage';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  data: AnnotatedImage;


  constructor() { }

  setup(d: AnnotatedImage): void {
    this.data = d;
    //console.log(this.data);
  }

  update() {
    console.log(this.data);
    //this.annotationService.updateMeta(this.meta);
  }

  ngOnInit() {
    
  }

}
