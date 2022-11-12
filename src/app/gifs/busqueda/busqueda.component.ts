import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {

  // operador para asegurarse de que el objeto nunca va a ser nulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor (private GifsService: GifsService) {}

  buscar() {

    let valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) return;

    this.GifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';

  }

  
}
