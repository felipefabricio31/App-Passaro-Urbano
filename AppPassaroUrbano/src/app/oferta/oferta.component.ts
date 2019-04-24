import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
  private tempoObservableSubscription: Subscription
  private meuObservableTesteSubscription: Subscription

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

  ngOnDestroy() {
  }
}