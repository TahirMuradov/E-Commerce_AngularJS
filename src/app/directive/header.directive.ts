import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHeader]'
  
})
export class HeaderDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
   
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

}
