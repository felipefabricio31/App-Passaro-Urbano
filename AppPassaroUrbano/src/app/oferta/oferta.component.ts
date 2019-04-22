import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Observable } from 'rxjs/observable';
import 'rxjs/Rx'
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Rx';

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
    /*
          //Observables na Pratica
          this.route.params.subscribe(
            (parametro: any) =>  { console.log(parametro) }),
            (erro: any) => {}
            () => console.log('Processamento foi classificado como concluído!')
    
    */
    let tempo = Observable.interval(2000)
    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })


    //Observable (Observável)
    let meuObservaleTeste = Observable.create((observer: Observer<number>) => {
      observer.next(1)
      observer.next(2)
      observer.error('Algum erro foi encontrado na stream de eventos.')
      observer.complete()
    })

    //Observable (Observador)
    this.meuObservableTesteSubscription = meuObservaleTeste.subscribe(
      (resultado: any) => console.log(resultado),
      (erro: string) => console.log(erro),
      () => console.log('Complete observer.')
    )
  }

  ngOnDestroy() {
    this.meuObservableTesteSubscription.unsubscribe()
    this.tempoObservableSubscription.unsubscribe()
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