import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private GifsService: GifsService) { }

  get historial() { return this.GifsService.historial }

  buscar(item: string) { this.GifsService.buscarGifs(item) }

}
