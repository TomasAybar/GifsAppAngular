import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Fm1VDmxbiArxwi7PdCb6MVq3y1AY1GUL';
  private _historial: string[] = [];
  public resultados: Gif[] = [];


  get historial() { return [...this._historial] }


  
  constructor(private http: HttpClient) {

    if (localStorage.getItem('historial')) {

      // Con el signo de admiracion le aviso a angular que confie en mi, que es valido lo que estoy haciendo
      this._historial = JSON.parse(localStorage.getItem('historial')!);

      console.log(this._historial);
    }

  }


  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {

      this._historial.unshift(query);

      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }


    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}z&limit=10`)
      .subscribe((resp) => {

        console.log(resp.data);

        this.resultados = resp.data;

        console.log(this.resultados);
      });
  }

}
