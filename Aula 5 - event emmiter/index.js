const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter();
const eventName = 'userClick';

myEmitter.on(eventName, click =>{

  console.log('O usuário clicou', click);

});

/// simula um evento de click ///
/* myEmitter.emit(eventName, 'Clicou na barra de rolagem');
myEmitter.emit(eventName, 'Clicou em ok');

let count = 0;
setInterval(()=>{

  myEmitter.emit(eventName, `Clicou no ok ${count++}`);

}, 1000); */

// adiciona um evento para quando o usuário digita no terminal
const stdin = process.openStdin();
stdin.addListener('data', value =>{

  console.log(`Você digitou: ${value.toString().trim()}`);

});
