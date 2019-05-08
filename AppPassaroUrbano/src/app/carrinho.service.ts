import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';

export class CarrinhoService {
    public itens: ItemCarrinho[] = []

    constructor() { }

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta) {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        //Verificar se o item em questão já existe dentro do this.itens
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {

            itemCarrinhoEncontrado.quantidade += 1
        }
        else {
            this.itens.push(itemCarrinho)
        }
    }

    //Realiza a soma no array de produtos selecionados no carrinho de compras
    public totalCarrinhoCompras(): number {

        let total: number = 0

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade)
        })

        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        //Incrementar quantidade
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        }

    }

    public subtrairQuantidade(itemCarrinho: ItemCarrinho): void {

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        //Decrementar quantidade
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade -= 1

            if (itemCarrinhoEncontrado.quantidade === 0) {
                //Remove um item do array de itens
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = []
    }
}
