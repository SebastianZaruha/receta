import { Component } from '@angular/core';
import { SelectComponent } from './select/select.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SelectComponent,
    CarouselComponent,
    RouterOutlet,
    SelectComponent,
    CarouselComponent,
    ButtonsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  categoriaSeleccionada: string = '';
  recetaSeleccionada: any = null;

  actualizarReceta(receta: any) {
    this.recetaSeleccionada = receta;
  }
}
