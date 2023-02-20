import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/interfaces';
import { GameService } from '../../services/game.service';
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {

    this.gameService.getNominados()
      .subscribe(resp => {
        console.log(Object.values(resp));
        this.juegos = resp;
      })
  }

  votarJuego(id:string){
    this.gameService.votarJuego(id)
      .subscribe((data:any) => {
        if (data.ok) {
          Swal.fire("Gracias", data.mensaje, 'success');
        } else {
          Swal.fire("ndeeera", data.mensaje, 'error');
        }
        console.log(data);
      })
  }

}
