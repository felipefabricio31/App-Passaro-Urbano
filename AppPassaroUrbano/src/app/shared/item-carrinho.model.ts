class ItemCarrinho {
    constructor(
        public id: number,
        public img: object,
        public titulo: string,
        public descricao_oferta: string,
        public valor: number,
        public quantidade: number
    ) { }
}

//Outra forma de exportação de classe no ES6
export { ItemCarrinho }