const {getPerson} = require('./service');

// reduce personalizado
Array.prototype.myReduce = function (callback, initialValue){

  let finalValue = typeof initialValue !== undefined ? 
    initialValue : this[0];

  for(let index = 0; index <= this.length -1; index++){

    finalValue = callback(finalValue, this[index], this);

  }

  return finalValue;

}

async function main() {

  try {

    const { results } = await getPerson('a');

    const weights = results.map(person => Number(person.height));
    console.log(weights);    

    // incio do reduce que soma os pesos
    /* const totalWeights = weights.reduce((previous, next)=>{
      
      return previous + next;

    }, 0); */
    // fim do reduce que soma os pesos

    // inicio do reduce personalizado
    const myList = [
      ['Jean', 'Carlos'],
      ['NodeBr', 'Nerdzão']
    ];

    const total = myList.myReduce((previous, next) =>{

      return previous.concat(next);

    }, []).join(', ');
    // fim do reduce personalizado

    // ver a lista concatenada
    console.log(total);

    // ver total dos pesos
    // console.log(totalWeights);

  } catch (err){ console.log(err); }

}

main();