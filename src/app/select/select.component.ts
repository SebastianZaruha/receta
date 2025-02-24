import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { RecetaService } from '../services/receta.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-select',
  imports: [SelectModule, FormsModule, DropdownModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  categorias: any[] = [];
  @Output() categoriaCambiada = new EventEmitter<string>();

  constructor(private recetaService: RecetaService) {}

  ngOnInit() {
    this.recetaService.getCategorias().subscribe((data: any) => {
      if (data.meals) {
        this.categorias = data.meals.map((cat: any) => ({
          label: cat.strCategory,
          value: cat.strCategory,
        }));
      }
    });
  }

  onCategoriaSeleccionada(event: any) {
    this.categoriaCambiada.emit(event.value);
  }
}