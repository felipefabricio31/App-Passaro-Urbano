import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router'
import { OfertasService } from '../../ofertas.service'
import { Oferta } from 'src/app/shared/oferta.model';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService
    ) { }

  ngOnInit() {
    
    console.log('ID da rota Pai: ', this.route.parent.snapshot.params['id'])

    this.ofertaService.getComoUsarOfertaPorId(this.route.parent.snapshot.params['id'])
    .then((descricao: string) => {
      this.comoUsar = descricao
    })
  }

}
