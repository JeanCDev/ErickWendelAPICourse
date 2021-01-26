const {
  readFile,
  writeFile,
} = require('fs');

const {
  promisify
} = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {

  constructor(){

    this.nomeArquivo = 'herois.json';

  }

  async obterDadosArquivo(){

    const arquivo = await readFileAsync(this.nomeArquivo, 'utf8');
    return JSON.parse(arquivo.toString());

  }

  async escreverArquivo(dados){

    await writeFileAsync(this.nomeArquivo, JSON.stringify(dados));
    return true;

  }

  async cadastrar(heroi){

    const dados = await this.obterDadosArquivo();
    const id = heroi.id <=2 ? heroi.id : Date.now();

    const heroiComId = {
      id, 
      ...heroi
    }

    const dadosFinal = [
      ...dados,
      heroiComId
    ];

    const resultado = await this.escreverArquivo(dadosFinal);
    return resultado;

  }

  async remover(id){

    if(!id){
      return await this.escreverArquivo([]);
    }

    const dados = await this.obterDadosArquivo();
    const index = dados.findIndex(item=> item.id === parseInt(id));

    if(index === -1){
      throw Error('O Herói informado não existe');
    }

    dados.splice(index, 1);
    return await this.escreverArquivo(dados);

  }

  async listar(id){

    const dados = await this.obterDadosArquivo();

    const dadosFiltrados = dados
      .filter(item => (id ? item.id === id :  true));
    
    return dadosFiltrados;

  }

  async atualizar(id, modificacoes){

    const dados = await this.obterDadosArquivo();
    
    const indice = dados.findIndex(item => item.id === parseInt(id));

    if(indice === -1){

      throw Error('O herói informado não existe');

    }

    const atual = dados[indice];
    const objetoAtualizar = {
      ...atual,
      ...modificacoes
    }
    dados.splice(indice, 1);

    return await this.escreverArquivo([
      ...dados,
      objetoAtualizar
    ]);

  }

}

module.exports = new Database();