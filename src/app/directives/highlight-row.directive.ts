import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightRow]'
})
export class HighlightRowDirective implements OnChanges {
  @Input() appHighlightRow: 'activo' | 'inactivo';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const color = this.appHighlightRow === 'activo' ? 'green' : 'red';
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
  }
}
