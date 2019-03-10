import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnnotatedImage } from '../models/AnnotatedImage';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  observer: Observer<AnnotatedImage>;
  meta: Observable<AnnotatedImage> = new Observable(observer => {
    this.observer = observer;
    this.observer.next(new AnnotatedImage("", ""));
  });

  constructor(private http: HttpClient) {
  }

  getAnnotatedObject() {
    return this.meta;
  }


  getAnnotataionData():Observable<AnnotatedImage> {
    return this.meta;
  }

  nextAnnotation(folder: string, imagename: string) {
    //store a copy to handle multiple subscribers not reading again and again
    let url: string = "file://" + folder + "/" + imagename.substring(0, imagename.lastIndexOf('.')) + ".json";
    let x = new AnnotatedImage(folder, imagename);
    this.http.get<AnnotatedImage>(url).pipe(
      catchError(err=>of(x))
    ).subscribe(o=>{x.copyfrom(o); this.observer.next(x)});
  }

}
