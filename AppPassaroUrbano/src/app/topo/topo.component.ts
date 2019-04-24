import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjetcPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasServices: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjetcPesquisa
    .debounceTime(1000) //Exceuta a ação do switchmap após 1 segundo
    .switchMap((termo: string) => {
      console.log('Requisicao http para api')
      return this.ofertasServices.pesquisaOfertas(termo)
    })

    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('Keyup caracter: ', termoDaBusca)
    this.subjetcPesquisa.next(termoDaBusca)
  }


}
