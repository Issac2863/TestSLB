import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnits'
})
export class ConvertUnitsPipe implements PipeTransform {
  transform(value: number, unit: 'barriles' | 'galones' | 'litros'): string {
    const conversionRates = {
      barriles: 1,
      galones: 42, // 1 barril = 42 galones
      litros: 159 // 1 barril = 159 litros
    };

    const convertedValue = value * conversionRates[unit];
    return `${convertedValue.toFixed(2)} ${unit}`;
  }
}
