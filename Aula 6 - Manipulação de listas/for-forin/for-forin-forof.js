const service = require('./service');

async function main() {

  try {

    const result = await service.getPerson('a');
    const names = [];

    // lista de nome usando o for
    /* console.time('For');
    for(let i=0; i <= result.results.length -1; i++) {

      const person = result.results[i];
      names.push(person.name);

    }
    console.timeEnd('For'); */
    // fim da lista de nomes usando o for

    // lista de nomes usando o forIn
    /* console.time('ForIn');
    for(let i in result.results){

      const person = result.results[i];
      names.push(person.name);

    }
    console.timeEnd('ForIn'); */
    // fim da lista de nomes usando forIn

    // lista de nomes usando o forOf
    console.time('ForOf');
    for(person of result.results){

      names.push(person.name);

    }
    console.timeEnd('ForOf');

    console.log(names);

  } catch (err) {

    console.log(err)

  }

}


main();