const service = require('./service');

// prototype do map personalizado
Array.prototype.myMap = function(callback) {

  const newMappedArray = [];

  for(let index = 0; index <= this.length -1; index++) {
    const result = callback(this[index], index);
    newMappedArray.push(result);

  }

  return newMappedArray;

}

async function main() {

  try {

    const result = await service.getPerson('a');
    //const names = [];

    // lista de nomes usando forEach
    /* result.results.forEach(person => {

      names.push(person.name);

    }); */
    // fim da lista de nomes usando forEach

    // lista de nomes usando map
    /* const names = result.results.map(person => {

      return person.name;

    }); */
    // fim da lista de nomes usando map

    // Map personalizado
    const names = result.results.myMap((person, index) =>{

      return `[${index}] - ${person.name}`;

    });
    // fim do map personalizado


    console.log(names);

  } catch (err) {console.log(err);}

}

main();