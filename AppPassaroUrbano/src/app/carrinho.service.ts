import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';

export class CarrinhoService
{
    public itens: ItemCarrinho[] = []

    constructor() {}

    public exibirItens(): ItemCarrinho[]
    {
        return this.itens
    }

    public incluirItem(oferta: Oferta)
    {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )
    }
}

//Outra forma de exportação de classe no ES6
//export default CarrinhoService