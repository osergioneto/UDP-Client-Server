// Require dgram module.
const dgram = require('dgram');

// Create udp server socket object.
const server = dgram.createSocket('udp4');

// Make udp server listen on port 8089.
server.bind(8089);

const verifyMessage = function(msg) {
  const ptrn = /([A-Z]+)/gm;
  let match;
  const questoes = [];
  let i = 1;
  while ((match = ptrn.exec(msg)) !== null) {
    const questao = {
      questao: i,
      numeroAlternativas: match[0].length,
      respostas: match[0],
    };
    questoes.push(questao);
    i++;
  }
  return questoes;
};

// When udp server receive message.
server.on('message', function(message) {
  const obj = verifyMessage(message);
  // Create output message.
  const output = `Udp server receive message : ${message}\n`;
  // Print received message in stdout, here is log console.
  process.stdout.write(output);
});

// When udp server started and listening.
server.on('listening', function() {
  // Get and print udp server listening ip address and port number in log console.
  const address = server.address();
  console.log(`UDP Server started and listening on ${address.address}:${address.port}`);
});
