const { getPerson } = require('./service');

// filter personalizado
Array.prototype.myFilter = function(callback) {

  const list = [];

  for(index in this){
    
    const item = this[index];
    const result = callback(item, index, this);

    if(!result) continue;

    list.push(item);

  }

  return list;

}

async function main() {

  try {

    // adiciona na lista somente os valores true
    const { results } = await getPerson('a');
    
    // inicio filter
    /* const larsFamily = results.filter(result => {

      const family = result.name.toLowerCase().indexOf(`lars`) !== -1;

      return family;

    }); */
    // fim filter

    //inicio do filter personalizado
    const larsFamily = results.myFilter((result, index, list) =>{
      console.log('Index', index);
      console.log(list.length);
      return result.name.toLowerCase().indexOf('lars') !== -1;

    });

    // fim do filter personalizado

    const names = larsFamily.map(person => person.name);

    console.log(names);

  } catch (err){console.log(err)}

}

main();
