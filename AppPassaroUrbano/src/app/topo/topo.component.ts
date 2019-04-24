import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Subject } from 'rxjs/Subject'

import { of } from 'rxjs';

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
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        console.log('Requisicao http para api')

        if (termo.trim() === '') {
          //retornar um observale de array de ofertas vazio.
          return of<Oferta[]>([])
        }

        return this.ofertasServices.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
        console.log(err)

        return Observable.of<Oferta[]>([])
      })

    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('Keyup caracter: ', termoDaBusca)
    this.subjetcPesquisa.next(termoDaBusca)
  }


}
