import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  getVilles(){
    return this.http.get(this.host+"/villes");
  }

  getCinemas(v:any) {
    return this.http.get(v._links.cinemas.href);
  }

  getSalles(c: any) {
    return this.http.get(c._links.salles.href);
  }

  getPresentations(salle:any) {
    let url=salle._links.presentations.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1")
  }

  getTicketsPlaces(presentation : any){
    let url=presentation._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj")
  }
}
