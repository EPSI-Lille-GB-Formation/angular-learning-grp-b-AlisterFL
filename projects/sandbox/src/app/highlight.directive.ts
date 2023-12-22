import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor')
  bgColor = 'transparent'

  @Input('bg-color')
  bgHighlightcolor ='yellow';

  @Input('default-color')
  bgHighlightcolordefault ='red';

  constructor( ) { }

  ngAfterViewInit() {
    this.bgColor = this.bgHighlightcolordefault
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.bgColor = this.bgHighlightcolor
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    this.bgColor = this.bgHighlightcolordefault
  }

}