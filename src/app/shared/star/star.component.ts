import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: [ './star.component.css' ]
})
export class StarComponent implements OnChanges{
    @Input() rating: number = 4;
    cropWidth: number = 75;
    @Output() ratingEmmit: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        this.cropWidth = this.rating * 75/5;
    }

    ratingClicked(): void {
        this.ratingEmmit.emit(` Current Rating is ${this.rating} emmited`);
    }
}