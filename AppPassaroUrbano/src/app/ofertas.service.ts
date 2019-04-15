import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'
//import 'rxjs/operator/toPromise'

@Injectable()
export class OfertasService {

    constructor(private http: Http)
    {

    }

    public getOfertas(): Promise<Oferta[]> {
        //Efeturar uma requisição http
        return this.http.get('http://localhost:3000/ofertas?destaque=true')
            .toPromise()
            .then(( resposta: any)  =>  resposta.json())
        //Retornar um promisse Oferta[]
    }

}