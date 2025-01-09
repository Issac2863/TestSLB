import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversionProduccion',
  standalone: true,
})
export class ConvertUnitsPipe implements PipeTransform {
  transform(value: any, unidad: 'barriles' | 'galones' | 'litros'): string {
    // Convierte el valor a número si es necesario
    const numero = Number(value);

    // Si el valor no es un número válido, retorna un mensaje predeterminado
    if (isNaN(numero)) {
      return 'Valor no válido';
    }

    switch (unidad) {
      case 'galones':
        return `${(numero * 42).toFixed(2)} galones`;
      case 'litros':
        return `${(numero * 159).toFixed(2)} litros`;
      case 'barriles':
      default:
        return `${numero.toFixed(2)} barriles`;
    }
  }
}
