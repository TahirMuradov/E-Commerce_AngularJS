import { Directive, ElementRef, HostBinding, HostListener, Input, input } from '@angular/core';

@Directive({
  selector: '[appHeader]'
})
export class HeaderDirective {
constructor(private el: ElementRef) {}


/*
for structural directive

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
   
    this.viewContainer.createEmbeddedView(this.templateRef);}

visible=false
    @Input()
    //The @Input() setter name must match the directive selector when used as a structural directive.
    // or @Input('ngxExampleDirective')  Bind this input to the selector name
//set condition(condition: boolean) {
 // ...
//}
    set ngxExampleDirective(condition:boolean){
    if(!condition && !visible)
    this.viewContainer.createEmbeddedView(this.templateRef);
    visible=true
}else if(this.condition && this.visible){
this.viewContainer.clear();
this.visible=false;
}
    
}





*/









// @Input("appHeader")
// isVisible:boolean
// =false;


  // private _isVisible = false;

// @HostBinding("class.hidden")
// get getVisibleStatus(){
//   return this._isVisible;
// }
// set setVisibleStatus(isVisible:boolean){
//   this._isVisible=isVisible
// }
@HostListener('mouseover',['$event'])
onMouseOver($event){
console.log($event)
}
@HostListener('mouseleave',['$event'])
onMouseLeave($event){
console.log($event)
}

  @HostListener('click')
  toggleHiddenClass() {

  // this.setVisibleStatus=!this._isVisible
  


    const nativeElement: HTMLElement = this.el.nativeElement;

console.log(nativeElement)
    const ulElement = nativeElement.querySelector('ul');

    if (ulElement) {
   
      ulElement.classList.toggle('hidden');
    }
  }
}
