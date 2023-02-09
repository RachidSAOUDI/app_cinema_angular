import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes : any;

  constructor(private cinemaService:CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles().subscribe(
      data => {
        this.villes=data;
    },error => {
        console.log(error);
      })
  }

}
