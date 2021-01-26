// --- Objetivos --- //
// 1 - obter o numero de telefone de um usuário a partir do seu id
// 2 - obter o endereço do usuário pelo id

/// Refatoração de promises para async/await


// importamos um módulo interno do nodejs
const util = require('util');

const getAddressAsync = util.promisify(getUserAddress);

function getUser(){

  // quando der problema chama-se o reject
  // quando for sucesso usa-se o resolve
  return new Promise((resolve, reject)=>{

    setTimeout(function(){

      return resolve({
        id: 1,
        name: 'Jean',
        birthday: new Date()
      });
  
    }, 1000);

  });

}

function getUserPhone(idUser){

  return new Promise((resolve, reject)=>{

    setTimeout(function(){

      return resolve({
        number: '47999999',
        ddd: 47
      });
  
    }, 2000);

  });

}

function getUserAddress(idUser, callback){

  return new Promise((resolve, reject)=>{

    setTimeout(()=>{

      return callback(null, {
        road: 'Rua dos bobos',
        houseNumber: 0
      });
  
    }, 2000);

  });
  
}

// adicionar a palavra sync na função, que a faz retornar uma promise
main();
async function main(){

  try{

    console.time('Medida-promise');

    const user = await getUser();

    // **** Executa as promises em separado **** //
    // const  phone = await getUserPhone(user.id);
    // const address = await getAddressAsync(user.id);

    // executa as promises juntas //
    const result = await Promise.all([
      getUserPhone(user.id),
      getAddressAsync(user.id)
    ]);

    const phone = result[0];
    const address = result[1];

    console.log(`
      id: ${user.id},
      Nome: ${user.name},
      Telefone: (${phone.ddd}) ${phone.number},
      Endereço: ${address.road}, ${address.houseNumber}
    `);

    console.timeEnd('Medida-promise');

  } catch(error){

    console.log('Deu ruim', error);

  }

}