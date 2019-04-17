import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) {
  }

  ngOnInit() {
    //console.log('id recuperado da rota: ', this.route.snapshot.params['id'])
    this.ofertasService.getOfertasPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
  }
}

/*
O Angular Router permite que você recupere facilmente parâmetros do URL,
que é uma funcionalidade essencial que é exigida pela maioria dos aplicativos da web.
Você pode usar os dois modos: o paramMapobservável ou o instantâneo, mas o segundo requer
que você tenha cuidado ao reutilizar componentes.

Subscribe -
this.route.params.subscribe((parametro: any) => {
console.log(parametro.id)
})

Snapshot
console.log('id recuperado da rota: ', this.route.snapshot.params['id'])
*/