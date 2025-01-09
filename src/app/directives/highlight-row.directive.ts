import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResaltarEstado]', // Asegúrate de que el selector coincida
  standalone: true,
})
export class HighlightRowDirective implements OnInit {
  @Input('appResaltarEstado') estado!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.estado === 'activo') {
      this.el.nativeElement.style.backgroundColor = 'green';
      this.el.nativeElement.style.color = 'white';
    } else if (this.estado === 'inactivo') {
      this.el.nativeElement.style.backgroundColor = 'red';
      this.el.nativeElement.style.color = 'white';
    }
  }
}
