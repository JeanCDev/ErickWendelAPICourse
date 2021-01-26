const {
  deepStrictEqual,
  ok
} = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
  nome: "Lanterna Verde",
  poder: "Energia do Anel",
  id: 2
}

describe('Suíte de manipulação de Heróis', ()=>{

  before( async () => {

    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)

  });

  it('Deve pesquisar um herói usando arquivos', async ()=>{

    const expected = DEFAULT_ITEM_CADASTRAR;

    const [resultado] = await database.listar(expected.id);
  
    deepStrictEqual(resultado, expected);

  });

  it('Deve cadastrar o herói usando arquivos', async ()=>{

    const expected = {
      ...DEFAULT_ITEM_CADASTRAR,
      id: 2,
      nome: "Batman",
      poder: "Dinheiro"
    };

    const resultado = await database.cadastrar(expected);

    const [actual] = await database.listar(expected.id);

    deepStrictEqual(actual, expected);

  });

  it('Deve remover o herói pelo id', async ()=>{

    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepStrictEqual(resultado, expected);

  });

  it.only('Deve atualizar um herói pelo id', async ()=>{

    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "Batman",
      poder: "Dinheiro"
    };

    const novoDado = {
      nome: "Batman",
      poder: "Dinheiro"
    }

    await database.atualizar(
      DEFAULT_ITEM_ATUALIZAR.id, novoDado);

    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);

    deepStrictEqual(resultado, expected);
    
  });

})