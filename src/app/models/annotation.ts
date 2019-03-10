import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';

export class Annotation {
    caption: string = "PROVIDE CAPTION";
    left: number;
    right: number;
    top: number;
    bottom: number;
    id:number;

    copyfrom(obj) {
        this.caption = obj.caption;
        this.left = obj.left;
        this.right= obj.right;
        this.top = obj.top;
        this.bottom = obj.bottom;
        this.id = obj.id;
    }
    
    constructor(id:number, l:number=0, b:number=0, r:number=0, t:number=0, c:string="Add Caption") {
        this.id = id;
        this.left = l;
        this.right = r;
        this.top = t;
        this.bottom = b;
        this.caption = c;
    }

    width():number {
        return this.right - this.left;
    }

    height():number {
        return this.bottom - this.top;
    }
}