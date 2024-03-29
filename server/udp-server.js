// Require dgram module.
const dgram = require('dgram');
const path = require('path');
const gabarito = require(path.resolve('./gabarito.json'));

const bd = [];

// Create udp server socket object.
const server = dgram.createSocket('udp4');

// Make udp server listen on port 8089.
server.bind(8089);

// When udp server receive message.
server.on('message', function(message) {
  // Verificando a mensagem que foi enviada
  const mensagemCliente = verifyMessage(message);
  // Corrigindo questões
  const respostasCorrigidas = verifyAnswers(gabarito, mensagemCliente);
  console.log('Correção: ', '\n', respostasCorrigidas);
  bd.push(respostasCorrigidas);
  const dadosQuestoes = estatisticas(bd);
  console.log('Dados Históricos: ', '\n', dadosQuestoes);
});

// When udp server started and listening.
server.on('listening', function() {
  // Get and print udp server listening ip address and port number in log console.
  const address = server.address();
  console.log(`UDP Server iniciado e ouvindo em ${address.address}:${address.port}`);
});

/* ------------------------- */

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

const verifyAnswers = (gabarito, respostasCliente) => {
  const respostasCorrigidas = [];
  const keys = Object.keys(gabarito);
  for (let i = 0; i < keys.length; i += 1) {
    let acertos = 0;
    let erros = 0;
    const respostaCliente = respostasCliente[i].respostas.split('');
    for (let j = 0; j < gabarito[(i + 1).toString()].respostas.length; j += 1) {
      if (gabarito[(i + 1).toString()].respostas[j] === respostaCliente[j]) {
        acertos += 1;
      } else {
        erros += 1;
      }
    }
    const questaoCorrigida = {
      questao: i + 1,
      acertos,
      erros,
    };
    respostasCorrigidas.push(questaoCorrigida);
  }
  return respostasCorrigidas;
};

const estatisticas = (bd) => {
  const questoesRespondidas = [];
  let acertosPorQuestao = [0,0,0,0,0];
  let errosPorQuestao = [0,0,0,0,0];
  const porcentagens = [];
  
  for(let i = 0; i < bd.length; i++){
    for(let j = 0; j < bd[i].length; j++){
      acertosPorQuestao[j] += parseInt(bd[i][j].acertos);
      errosPorQuestao[j] += parseInt(bd[i][j].erros);
      questoesRespondidas[j] = parseInt(bd[i][j].acertos) + parseInt(bd[i][j].erros);
    }
  } 
  
  for(let i = 0; i < 5; i++){
    const porcentagemAcertos = (((acertosPorQuestao[i] / (questoesRespondidas[i])) * 100) / bd.length).toFixed(2);
    const porcentagemErros = (((errosPorQuestao[i] / (questoesRespondidas[i])) * 100) / bd.length).toFixed(2);
    const porcentagem = {
      questao: i + 1,
      porcentagemAcertos: porcentagemAcertos+'%',
      porcentagemErros: porcentagemErros+'%',
    };
    porcentagens.push(porcentagem);
  }
  return porcentagens;
}
