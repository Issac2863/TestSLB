import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { PozosService } from '../../services/pozos.service';

import { ConvertUnitsPipe } from '../../pipes/convert-units.pipe';
import { HighlightRowDirective } from '../../directives/highlight-row.directive';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule, // Incluye FormsModule
    NgFor,
    ConvertUnitsPipe,
    HighlightRowDirective,
  ],
})
export class MainComponent implements OnInit {
  unidadSeleccionada: 'barriles' | 'galones' | 'litros' = 'barriles';
  actualizarUnidad(): void {
    console.log(`Unidad seleccionada: ${this.unidadSeleccionada}`);
  }
  pozos: any[] = [];
  activos: number = 0;
  inactivos: number = 0;
  produccionTotal: number = 0;

  constructor(private pozosService: PozosService) {}

  ngOnInit(): void {
    this.loadPozos();
  }
  
  loadPozos(): void {
    this.pozosService.getPozos().subscribe({
      next: (data) => {
        this.pozos = data;
        console.log('Pozos cargados:', this.pozos);
      },
      error: (error) => {
        console.error('Error al cargar los pozos:', error);
      },
    });
  }
  
  actualizarEstadisticas(): void {
    this.activos = this.pozos.filter((pozo) => pozo.estado === 'activo').length;
    this.inactivos = this.pozos.filter((pozo) => pozo.estado === 'inactivo').length;
    this.produccionTotal = this.pozos.reduce(
      (total, pozo) => total + Number(pozo.produccionDiaria),
      0
    );
  
    console.log(`Activos: ${this.activos}, Inactivos: ${this.inactivos}, Producción Total: ${this.produccionTotal} Barriles`);
  }
}
