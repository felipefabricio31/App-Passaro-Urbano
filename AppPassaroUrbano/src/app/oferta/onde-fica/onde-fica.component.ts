import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService
    ) { }

  ngOnInit() {
    
    console.log('ID da rota Pai: ', this.route.parent.snapshot.params['id'])

    this.ofertaService.getOndeFicaOfertaPorId(this.route.parent.snapshot.params['id'])
    .then((descricao: string) => {
      this.ondeFica = descricao
    })
  }

}
