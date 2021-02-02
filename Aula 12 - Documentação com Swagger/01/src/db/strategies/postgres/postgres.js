const ICrud = require('./../interfaces/interfaceCrud');
const Sequelize = require('sequelize');

// classe que gerencia o postgresSQL
class Postgres extends ICrud{

  constructor(connection, schema){
    super();

    this._connection  = connection;
    this._schema = schema;

  }

  static async defineModel(connection, schema){
    
    const model = connection.define(
      schema.name,
      schema.schema,
      schema.options
    );

    // conecta ao banco de dados
    await model.sync();

    return model;

  }

  static async connect(){

    // cria a instância de conexão com o banco de dados
    const connection = new Sequelize(
      'heroes',
      'jeancdev',
      '19029696',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false,
        logging: false
      }
    );

    return connection;

  }

  async isConnected(){
    try{

      await this._connection.authenticate();
      return true;

    } catch(e){
      console.log(e)
      return false;
    }
  }

  async create(item){
    const {dataValues} = await this._schema.create(item, {raw: true});

    return dataValues;
  }

  async read(item = {}){

    return this._schema.findAll({
      where: item,
      raw: true
    });

  }

  async update(id, item){

    return this._schema.update(item, {
      where:{id: id}
    });

  }

  async delete(id){

    const query = id ? {id} : {};

    return this._schema.destroy({where: query});

  }

}

module.exports = Postgres;