import { Component, effect, EventEmitter, Input, OnInit, Output, Signal } from '@angular/core';

import {NgIf,NgFor}from "@angular/common"
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-image',
  imports: [NgIf,NgFor],
  standalone:true,
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {

constructor() {
  effect(() => {
  const photos = this.Photos();
  if (photos) {
    this.photoFiles = photos.map(photo => ({url:URL.createObjectURL(photo),photoName:photo.name}));
 
  }
});
}

@Input()CurrentPictureUrl:string;
@Input()Photos: Signal<File[]>;
@Output() onPhotoDelete:EventEmitter<{photoUrl:string,NewPhoto:boolean,NewPhotoName:string}>=new EventEmitter();
photoFiles:{url:string,photoName:string}[]=[]
apiDomen=environment.apiUrl
  onDelete(photoUrl: string, newPhoto: boolean,NewPhotoName:string) {
   

   
      this.onPhotoDelete.emit({ photoUrl, NewPhoto: newPhoto ,NewPhotoName:NewPhotoName});
 

}

}
