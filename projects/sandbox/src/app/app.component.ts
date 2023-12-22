import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HighlightDirective } from './highlight.directive';
import { NoOpenDirective } from './no-open.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HighlightDirective, NoOpenDirective],
  template: `
  <h1>Découverte des directives d'attributs!</h1>

  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquam distinctio illum iste dolore excepturi vitae optio vero repellendus reiciendis libero dignissimos velit consequuntur earum ab, ea sed modi facilis!<p>
  <p highlight bg-color="blue" default-color="purple">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, alias obcaecati harum atque perferendis laudantium provident ab quidem et quas iusto. Perferendis beatae necessitatibus, odit nihil rem commodi consequatur vitae.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit rem quia accusantium aliquam nam veniam facere earum unde nemo dolor quo numquam eum quod, vitae cupiditate eos ducimus non id!</p>
  
  <button a>Clique ici</button>
  <a href="https://www.example.com" appNoOpen>Cliquez ici</a>
  `,
  styles: []
})
export class AppComponent {
  title = 'sandbox';
}
