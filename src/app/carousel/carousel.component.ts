import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  imports: [CarouselModule, FormsModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnChanges {
  @Input() categoriaSeleccionada!: string;
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.categoriaSeleccionada) {
      this.cargarPlatosPorCategoria(this.categoriaSeleccionada);
    }
  }

  cargarPlatosPorCategoria(categoria: string): void {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
    this.http.get<any>(url).subscribe((response) => {
      this.products = response.meals || [];
      console.log('Platos cargados:', this.products);
    });
  }
}
