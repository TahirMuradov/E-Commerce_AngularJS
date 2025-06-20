import { Directive, ElementRef, HostBinding, HostListener, Input, input } from '@angular/core';

@Directive({
  selector: '[appHeader]'
})
export class HeaderDirective {
constructor(private el: ElementRef) {}

/*
       Mouse Events:
click: When the mouse button is clicked on the element.
dblclick: When the mouse button is double-clicked on the element.
mousedown: When a mouse button is pressed down over the element.
mouseup: When a mouse button is released over the element.
mouseenter: When the mouse pointer enters the element's area.
mouseleave: When the mouse pointer leaves the element's area.
mousemove: When the mouse pointer moves while over the element.
mouseover: When the mouse pointer enters the element or one of its children.
mouseout: When the mouse pointer leaves the element or one of its children.
contextmenu: When the right mouse button is clicked on the element.
      Keyboard Events:
keydown: When a key is pressed down.
keyup: When a key is released.
keypress: When a key is pressed and released.
       Input/Form Events:
change: When the value of an input element changes and is committed (e.g., blur, enter key).
input: When the value of an input element changes (immediately).
focus: When an element receives focus.
blur: When an element loses focus.
submit: When a form is submitted.
       Window/Document Events (with prefix):
window:scroll: When the window is scrolled.
document:click: When a click occurs anywhere on the document.
window:resize: When the browser window is resized.
window:beforeunload: Before the browser window or tab is closed. */

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
