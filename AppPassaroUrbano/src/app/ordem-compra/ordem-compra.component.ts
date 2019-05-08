import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CarrinhoService } from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number = undefined
  public itensCarrinho: ItemCarrinho[] = []

  //Validação do formulário (forma mais correta)
  public formulario: FormGroup = new FormGroup({
    'Endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'Numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'Complemento': new FormControl(null, null),
    'FormaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()

    console.log(this.itensCarrinho)
  }

  public confirmarCompra(): void {

    if (this.formulario.status === 'INVALID') {
      this.formulario.get('Endereco').markAsTouched()
      this.formulario.get('Numero').markAsTouched()
      //this.formulario.get('Complemento').markAsTouched()
      this.formulario.get('FormaPagamento').markAsTouched()
    }
    else {
      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Você não selecionou nenhum item!')
      }
      else {
        let pedido: Pedido = new Pedido(
          this.formulario.value.Endereco,
          this.formulario.value.Numero,
          this.formulario.value.Complemento,
          this.formulario.value.FormaPagamento,
          this.carrinhoService.exibirItens()
        )

        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {
            this.idPedidoCompra = idPedido

            this.carrinhoService.limparCarrinho()
          })
      }
    }
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }

  public subtrair(item: ItemCarrinho): void {
    this.carrinhoService.subtrairQuantidade(item)
  }

}
