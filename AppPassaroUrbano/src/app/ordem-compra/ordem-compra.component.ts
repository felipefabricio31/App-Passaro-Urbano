import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario') public f: NgForm

  public idPedidoCompra: number

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompras(): void {

    //Cria um pedido com as informações recebidas do formulário
    let pedido: Pedido = new Pedido(
      this.f.value.endereco,
       this.f.value.numero,
       this.f.value.complemento,
       this.f.value.formaPagamento)

    this.ordemCompraService.efetivarCompra(pedido)
    .subscribe((idPedido: number) => {
      //console.log('Pedido cadastrado com sucesso - Pedido: ' + idPedido)
      this.idPedidoCompra = idPedido
    })
  }
}
