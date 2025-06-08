import { Component, effect, EventEmitter, Input,  Output, Signal } from '@angular/core';

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
 let photos ;
   let currentUrls;
   if (this.CurrentPictureUrls) {
    
     currentUrls  = this.CurrentPictureUrls()??null;
   }
      
  if ( this.Photos) {
    photos=this.Photos()
    this.photoFiles = photos.map(photo => ({url:URL.createObjectURL(photo),photoName:photo.name}));
 
  }
     if (currentUrls) {
     this.currentPicturePath=currentUrls
      }
});
}

@Input()CurrentPictureUrls:Signal<string[]>|null|undefined;
@Input()Photos: Signal<File[]>|null|undefined;
@Output() onPhotoDelete:EventEmitter<{photoUrl:string,NewPhoto:boolean,NewPhotoName:string}>=new EventEmitter();
photoFiles:{url:string,photoName:string}[]=[]
currentPicturePath:string[]=[]
apiDomen=environment.apiUrl
  onDelete(photoUrl: string, newPhoto: boolean,NewPhotoName:string) {
   

   
      this.onPhotoDelete.emit({ photoUrl, NewPhoto: newPhoto ,NewPhotoName:NewPhotoName});
 

}
getImageUrl(path: string): string {
  const baseUrl = this.apiDomen.replace('/api', '');
  if (!path) {
    console.warn('Empty path provided!');
    return '';  
  }


  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return baseUrl + path;
}

}
