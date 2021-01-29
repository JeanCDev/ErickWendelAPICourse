const Hapi = require('hapi');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const Context = require('./db/strategies/base/contextStrategy');
const heroSchema = require('./db/strategies/mongodb/schemas/heroesSchema');
const HeroRoute = require('./routes/heroRoutes');

const app = new Hapi.Server({
  port: 5000
});

// mapeia dinamicamente o objeto HeroRoutes e executa seus métodos
function mapRoutes(instance, methods) {
  
  return methods.map(method => instance[method]());

}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, heroSchema));

  // Pega todas as rotas baseadas nos nome do métodos de HeroRoute
  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
  ]);

  await app.start();
  console.log('Server running');

  return app;

}

module.exports = main();