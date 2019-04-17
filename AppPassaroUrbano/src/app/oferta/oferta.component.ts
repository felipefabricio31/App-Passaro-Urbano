import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit() {
    console.log('id recuperado da rota: ', this.route.snapshot.params['id'])
  }
}

/*
O Angular Router permite que você recupere facilmente parâmetros do URL, 
que é uma funcionalidade essencial que é exigida pela maioria dos aplicativos da web. 
Você pode usar os dois modos: o paramMapobservável ou o instantâneo, mas o segundo requer 
que você tenha cuidado ao reutilizar componentes. 
*/