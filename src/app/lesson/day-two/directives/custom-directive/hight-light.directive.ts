import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHightLight]'
})
export class HightLightDirective {

  constructor(private ele: ElementRef, private reder: Renderer2) { }

  @HostBinding('style.backgroundColor') bgColor = 'aqua';

  @HostListener('mouseenter') suKienHover(): void {
    // this.ele.nativeElement.style.backgroundColor = 'green';
    const divChild = this.reder.createElement('div');
    this.reder.setStyle(divChild, 'backgroundColor', 'black');
    this.reder.setStyle(divChild, 'height', '20px');

    this.reder.appendChild(this.ele.nativeElement, divChild);
    this.reder.setStyle(this.ele.nativeElement, 'backgroundColor', 'green');
  }
  @HostListener('mouseleave') suKienLeave(): void {
    this.ele.nativeElement.style.backgroundColor = 'orange';
  }
 
}
