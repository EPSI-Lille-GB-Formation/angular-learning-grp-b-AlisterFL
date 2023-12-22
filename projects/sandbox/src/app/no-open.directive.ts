import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoOpen]',
  standalone: true
})
export class NoOpenDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: Event){
    event.preventDefault();

  }
}
