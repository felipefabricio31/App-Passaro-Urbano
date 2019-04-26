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
  public ofertas2: Oferta[]
  private subjetcPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasServices: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjetcPesquisa
      .debounceTime(1000) //Exceuta a ação do switchmap após 1 segundo
      .distinctUntilChanged() //Para fazer pesquisas distintas
      .switchMap((termo: string) => {

        if (termo.trim() === '') {
          //retornar um observale de array de ofertas vazio.
          return of<Oferta[]>([])
        }

        return this.ofertasServices.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
        //console.log(err)
        return Observable.of<Oferta[]>([])
      })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjetcPesquisa.next(termoDaBusca)
  }


}
