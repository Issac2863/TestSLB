import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import { PozosService } from '../../services/pozos.service'; // Importa el servicio
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  pozoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pozosService: PozosService,
    private router: Router // Inyecta el Router
  ) {
    this.pozoForm = this.fb.group({
      pozo_nombre: ['', Validators.required],
      pozo_ubicacion: ['', Validators.required],
      pozo_estado: ['activo', Validators.required],
      produccion_cantidad: [0, [Validators.required, Validators.min(0)]],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.pozoForm.valid) {
      const nuevoPozo = {
        nombre: this.pozoForm.value.pozo_nombre,
        ubicacion: this.pozoForm.value.pozo_ubicacion,
        produccionDiaria: Number(this.pozoForm.value.produccion_cantidad),
        estado: this.pozoForm.value.pozo_estado,
      };

      this.pozosService.createPozo(nuevoPozo).subscribe({
        next: (response) => {
          console.log('Pozo creado:', response);
          alert('Pozo registrado correctamente.');
          this.router.navigate(['/']); // Redirige al inicio
        },
        error: (error) => {
          console.error('Error al crear el pozo:', error);
          alert('Error al registrar el pozo.');
        },
      });
    } else {
      console.error('Formulario inválido');
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}
