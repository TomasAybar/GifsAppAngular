import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Fm1VDmxbiArxwi7PdCb6MVq3y1AY1GUL';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];


  get historial() { return [...this._historial] }



  constructor(private http: HttpClient) {

    if (localStorage.getItem('historial')) {

      // Con el signo de admiracion le aviso a angular que confie en mi, que es valido lo que estoy haciendo
      this._historial = JSON.parse(localStorage.getItem('historial')!);

    }

    if (localStorage.getItem('resultados')) {

      this.resultados = JSON.parse(localStorage.getItem('resultados')!);

    }

  }


  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {

      this._historial.unshift(query);

      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`, { params: params })
      .subscribe((resp) => {

        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

}
