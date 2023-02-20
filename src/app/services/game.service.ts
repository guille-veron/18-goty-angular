import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados(){

    if (this.juegos.length === 0) {
      return this.http.get(`${environment.url}/api/goty`)
          .pipe(
            map( resp => {
              this.juegos = Object.values(resp)[0];
              return this.juegos;
            })
          )  
    } else {    
      return of(this.juegos)
    }  
    
  }

  votarJuego(id:string){
    return this.http.post(`${environment.url}/api/goty/${id}`,{})
      .pipe(
        catchError(err => {
          return of(err.error)
        })
      )
  }
}
