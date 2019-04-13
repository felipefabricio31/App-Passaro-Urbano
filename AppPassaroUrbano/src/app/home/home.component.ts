import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService] //Array de metadados
})
export class HomeComponent implements OnInit
{
  public Ofertas: Oferta[]

  constructor(private ofertasServices: OfertasService) 
  { 
  }

  ngOnInit()
  {
    this.Ofertas = this.ofertasServices.getOfertas()
    console.log(this.Ofertas)
  }
}
