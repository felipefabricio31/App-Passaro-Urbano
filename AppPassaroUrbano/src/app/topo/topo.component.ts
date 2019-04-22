import { Component, OnInit } from '@angular/core';
import { OfertasServices, OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasServices ]
})
export class TopoComponent implements OnInit {

  constructor(private ofertasServices: OfertasService[]) { }

  ngOnInit() {

  }

  public pesquisa(termoDaBusca: string): void
  {
   console.log(termoDaBusca)
  }

}
