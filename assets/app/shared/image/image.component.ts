import { Component, Input, OnChanges } from '@angular/core';
import { AppSettings } from './../../app.settings';

@Component({
    selector: 'app-image',
    template: `
      <figure id="profile-info-picture-figure" [ngClass]="classFigure">
          <img [src]="imageUrl" [ngClass]="classImage">
      </figure>
    `,
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnChanges {
    @Input() url: string;
    @Input() size: string;
    @Input() type: string;
    imageUrl: string = "";
    classFigure: string = "";
    classImage: string = "";

    ngOnChanges() {
      if(this.url !== undefined && this.url !== '') {
        this.classFigure = `image is-${this.size}`;
        this.classImage = `round-${this.size}`;
        const token = localStorage.getItem('token') ? '&token=' + localStorage.getItem('token') : '';
        this.imageUrl= `${AppSettings.API_ENDPOINT}file/${this.type}?url=${this.url}${token}`;
      }
    }

}