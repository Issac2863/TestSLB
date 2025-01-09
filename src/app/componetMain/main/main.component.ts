import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PozosService } from '../../services/pozos.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  pozos: any[] = [];

  constructor(private pozosService: PozosService) {}

  ngOnInit(): void {
    this.pozosService.getPozos().subscribe((data) => {
      this.pozos = data;
    });
  }
}
