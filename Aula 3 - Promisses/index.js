// --- Objetivos --- //
// 1 - obter o numero de telefone de um usuário a partir do seu id
// 2 - obter o endereço do usuário pelo id

/// Refatoração de callback para promises


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

// para manipular sucesso usas-se o .then
// para manipular erros usa-se p .catch
const userPromise = getUser();

userPromise
  .then(user =>{

    return getUserPhone(user.id)
      .then(phone =>{

        return {
          user:{
            name: user.name,
            id: user.id,
          }, 
          phone
        }

      });

  })
  .then(result => {
    
    const address = getAddressAsync(result.user.id);
    return address.then(address =>{

      return {
        user: result.user,
        phone: result.phone,
        address
      }

    });

  })
  .then(function(result) {

  console.log(`
    id: ${result.user.id},
    Nome: ${result.user.name},
    Telefone: (${result.phone.ddd}) ${result.phone.number},
    Endereço: ${result.address.road}, ${result.address.houseNumber}
  `);

}).catch(err =>{

  console.log('Deu ruim', err);

});
