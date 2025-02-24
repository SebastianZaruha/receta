import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  constructor(private httpClient: HttpClient) {}
  // Obtener categorías de comidas
  getCategorias() {
    return this.httpClient.get<{ meals: { strCategory: string }[] }>(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    );
  }

  // Obtener comidas de una categoría específica
  getRecetasPorCategoria(categoria: string) {
    return this.httpClient.get<{
      meals: { strMeal: string; strMealThumb: string; idMeal: string }[];
    }>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
  }
}
