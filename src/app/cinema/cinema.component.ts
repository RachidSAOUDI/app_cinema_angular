import {Component, OnInit} from '@angular/core';
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
  public currentPresentation : any;
  public host = environment.backhost;
  public selectedTickets: any[] = [];

  constructor(private cinemaService:CinemaService) { }

  ngOnInit(): void {
    this.onGetVilles();
  }

  onGetVilles(){
    this.cinemaService.getVilles().subscribe(
      data => {
        this.villes=data;
      },error => {
        console.log(error);
      })
  }

  onGetCinemas(ville: any) {
    this.currentVille=ville;
    this.salles=undefined;
    this.cinemaService.getCinemas(ville)
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

  onGetTicketsPlaces(presentation: any) {
    this.currentPresentation=presentation;
    this.cinemaService.getTicketsPlaces(presentation).subscribe(data=>{
      this.currentPresentation.tickets=data;
      this.selectedTickets=[];
    }, err => {
      console.log(err);
    })
  }

  onSelectTicket(t: any) {
    if(!t.selected){
      t.selected=true;
      this.selectedTickets.push(t);
    } else {
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
    }
    console.log(this.selectedTickets);
  }

  getTicketClass(t: any) {
    let str="btn ticket ";
    if (t.reserve==true){
      str+="btn-danger";
    } else if (t.selected) {
      str+="btn-warning";
    } else {
      str+="btn-success";
    }
    return str;
  }

  onPayTickets(dataForm: any) {
    let tickets:any=[];
    this.selectedTickets.forEach(t=>{
      tickets.push(t.id);
    });
    dataForm.tickets=tickets;
    this.cinemaService.payerTickets(dataForm).subscribe(data=>{
      alert("tickets reserves avec succes!")
      this.onGetTicketsPlaces(this.currentPresentation);
    },err=>{
      console.log(err);
    })
  }
}
