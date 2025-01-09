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
  activosPorcentaje: number = 0;
  inactivosPorcentaje: number = 0;


  constructor(private pozosService: PozosService) {}

  ngOnInit(): void {
    this.loadPozos();
  }
  
  loadPozos(): void {
    this.pozosService.getPozos().subscribe({
      next: (data) => {
        this.pozos = data;
        console.log('Pozos cargados:', this.pozos);
        this.actualizarEstadisticas(); // Calcula los valores al cargar los datos
      },
      error: (error) => {
        console.error('Error al cargar los pozos:', error);
      },
    });
  }
  
  actualizarEstadisticas(): void {
    const totalPozos = this.pozos.length;
  
    // Calcula la cantidad de pozos activos e inactivos
    this.activos = this.pozos.filter((pozo) => pozo.estado === 'activo').length;
    this.inactivos = this.pozos.filter((pozo) => pozo.estado === 'inactivo').length;
  
    // Calcula los porcentajes
    this.activosPorcentaje = totalPozos > 0 ? (this.activos / totalPozos) * 100 : 0;
    this.inactivosPorcentaje = totalPozos > 0 ? (this.inactivos / totalPozos) * 100 : 0;
  
    // Calcula la producción total diaria solo para pozos activos
    this.produccionTotal = this.pozos
      .filter((pozo) => pozo.estado === 'activo')
      .reduce((total, pozo) => {
        const produccion = Number(pozo.produccion_diaria);
        return isNaN(produccion) ? total : total + produccion;
      }, 0);
  
    console.log(`Activos: ${this.activos} (${this.activosPorcentaje}%), Inactivos: ${this.inactivos} (${this.inactivosPorcentaje}%), Producción Total: ${this.produccionTotal} Barriles`);
  }
  

  cambiarEstado(pozo: any): void {
    const nuevoEstado = pozo.estado === 'activo' ? 'inactivo' : 'activo';
  
    this.pozosService.updatePozoEstado(pozo.id, nuevoEstado).subscribe({
      next: (response) => {
        console.log(`Estado del pozo ${pozo.id} actualizado a ${nuevoEstado}`);
        // Actualiza el estado localmente para reflejar los cambios en la tabla
        pozo.estado = nuevoEstado;
        this.actualizarEstadisticas(); // Recalcula las estadísticas
      },
      error: (error) => {
        console.error('Error al actualizar el estado del pozo:', error);
        alert('Error al cambiar el estado. Inténtelo de nuevo.');
      },
    });
  }
}
