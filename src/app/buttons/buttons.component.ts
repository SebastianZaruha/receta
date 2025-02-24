import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  categorias: string[] = [];
  @Output() recetaSeleccionada = new EventEmitter<any>();
  recetaActual: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Obtener todas las categorías de la API
    this.http
      .get<any>('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .subscribe((data) => {
        this.categorias = data.meals.map((meal: any) => meal.strCategory);
      });
  }

  seleccionarRecetaAleatoria() {
    if (this.categorias.length === 0) return;

    const categoriaAleatoria =
      this.categorias[Math.floor(Math.random() * this.categorias.length)];

    this.http
      .get<any>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaAleatoria}`
      )
      .subscribe((data) => {
        const platos = data.meals;
        if (platos.length > 0) {
          this.recetaActual = platos[Math.floor(Math.random() * platos.length)];
          this.recetaSeleccionada.emit(this.recetaActual);
        }
      });
  }

  enviarRecetaPorCorreo() {
    if (!this.recetaActual) {
      alert('Primero selecciona una receta.');
      return;
    }

    const subject = encodeURIComponent(`Receta: ${this.recetaActual.strMeal}`);
    const body = encodeURIComponent(
      `Hola, te comparto esta receta:\n\nNombre: ${this.recetaActual.strMeal}\n\nMira la receta aquí: https://www.themealdb.com/meal/${this.recetaActual.idMeal}`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
}
