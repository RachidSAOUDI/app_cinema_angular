import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes : any;
  public cinemas : any;
  public salles : any;
  public currentVille : any;
  public currentCinema : any;
  public host = environment.backhost;

  constructor(private cinemaService:CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles().subscribe(
      data => {
        this.villes=data;
    },error => {
        console.log(error);
      })
  }

  onGetCinemas(v: any) {
    this.currentVille=v;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
      this.cinemas=data;
    },error =>{
      console.log(error);
    })
  }

  onGetSalles(c: any) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach((salle:any)=>{
          this.cinemaService.getPresentations(salle)
            .subscribe((data:any)=>{
              salle.presentations=data;
          }, (err:any)=>{
            console.log(err);
          })
        })
      },error =>{
        console.log(error);
      })
  }
}
