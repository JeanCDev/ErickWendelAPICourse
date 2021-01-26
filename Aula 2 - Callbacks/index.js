// --- Objetivos --- //
// 1 - obter o numero de telefone de um usuário a partir do seu id
// 2 - obter o endereço do usuário pelo id

function getUser(callback){

  setTimeout(function(){

    return callback(null,{
      id: 1,
      name: 'Jean',
      birthday: new Date()
    });

  }, 1000);

}

function getUserPhone(idUser, callback){

  setTimeout(function(){

    return callback(null,{
      number: '47999999',
      ddd: 47
    });

  }, 2000);

}

function getUserAddress(idUser, callback){

  setTimeout(()=>{

    return callback(null,{
      road: 'Rua dos bobos',
      houseNumber: 0
    });

  }, 2000);

}

function resolveUser(error, user){

  console.log('User' , user);

}

getUser(function resolveUser(error, user){

  // valor null, vazio ou 0 é igual a false
  if (error){
    console.log("Deu ruim em obter usuário", error);
    return;
  }

  getUserPhone(user.id, function resolvePhone(error1, phone){

    if (error1){
      console.log("Deu ruim em telefone", error1);
      return;
    }

    getUserAddress(user.id, function resolveAddress(error2, address){

      if (error2){
        console.log("Deu ruim em Endereço", error2);
        return;
      }

      console.log(`
        id:${user.id},
        Nome: ${user.name},
        Endereço: ${address.road}, ${address.houseNumber},
        Telefone: (${phone.ddd}) ${phone.number}.
      `);

    });

  });

});
//const phone = getUserPhone(user.id);
// console.log('Phone' , phone);