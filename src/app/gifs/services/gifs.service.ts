import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) { }

  private apiKey: string = 'Fm1VDmxbiArxwi7PdCb6MVq3y1AY1GUL';
  private _historial: string[] = [];

  // TODO: Cabmiar any por su tipo 
  public resultados: any[] = [];
  


  get historial() {

    return [...this._historial];

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {

      this._historial.unshift(query);

      this._historial = this._historial.splice(0, 10);
    }

    // let query!: string = 'gatito';

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=Fm1VDmxbiArxwi7PdCb6MVq3y1AY1GUL&q=${query}z&limit=10`)
      .subscribe(( resp: any ) => {
        
        console.log(resp.data);

        this.resultados = resp.data;
      })

  }

}
