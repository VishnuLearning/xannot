import { Annotation } from './annotation';
import { DiagnosticImage } from './diagnosticimage';

export class AnnotatedImage {
    annotations: Annotation[];
    meta: DiagnosticImage;
    maxAnnotationIndex: number;

    constructor(folder:string, name:string) {
        this.annotations = new Array<Annotation>();
        this.maxAnnotationIndex = 0;
        this.meta = new DiagnosticImage({});
        this.meta.imageid = name;
        this.meta.imagelocation = folder;
    }

    copyfrom(obj) {
        let i:number;
        this.maxAnnotationIndex = obj.maxAnnotationIndex?obj.maxAnnotationIndex:0;
        if(obj.annotations && obj.annotations.length>0) {
            for(i=0; i<obj.annotations.length; i++) {
                let a = new Annotation(obj);
                a.copyfrom(obj.annotations[i]);
                this.annotations.push(a);
            }
        }
        this.meta = new DiagnosticImage(obj.meta);
    }

    addAnnotation(l: number, t: number, r: number, b: number, c: string): void {
        for (var i = 0; i < this.annotations.length; i++) {
            console.log(this.annotations[i].caption);
        }
        this.maxAnnotationIndex++;
        let a: Annotation = new Annotation(this.maxAnnotationIndex, l, b, r, t, c);
        this.annotations.push(a);
        console.log(l, t, r, b);
    }

    removeAnnotation(id: number): void {
        for (var i = 0; i < this.annotations.length; i++) {
            if (this.annotations[i].id == id) break;
        }
        if (i < this.annotations.length) {
            this.annotations.splice(i, 1);
        }
    }

    editAnnotationCaption(id: number, caption: string): void {
        for (var i = 0; i < this.annotations.length; i++) {
            if (this.annotations[i].id == id) break;
        }
        if (i < this.annotations.length) {
            this.annotations[i].caption = caption;
        }
    }
}