# UDP-Client-Server
Correção de questionários utilizando um server udp

## Requisitos

Para executar o servidor UDP é necessário ter no seu computador [Node JS](https://nodejs.org/) e o [NPM](https://npmjs.com)


## Executando

1.1 Após instalar o NodeJS e o NPM. Faça o clone ou download desses [repositório](https://github.com/osergioneto/UDP-Client-Server). Vá até a pasta, a UDP-Client-Server.

1.2 Execute o comando ```npm install``` no seu terminal. Os pacotes necessários serão instalados

1.3 Em seguida, vá para a pasta /server então execute os comandos:

```bash
//Comando que executa o servidor
node udp-server.js

//Comando que executa um cliente (abra quantos quiser)
node udp-client.js
```

1.4 Após abrir os terminais com o servidor e os clientes. Vá até um cliente e envie o gabarito com as respostas. Para enviar um gabarito digite as informações seguindo o padrão, depois aperte a tecla **ENTER**, então digite **enviar**. Com isso a mensagem será enviada ao servidor.
Abaixo temos um exemplo.

```bash
// SERVIDOR
UDP Server iniciado e ouvindo em 0.0.0.0:8089 // Mensagem exibida ao iniciar o servidor

[ { questao: 1, acertos: 5, erros: 0 }, // Resposta 
  { questao: 2, acertos: 4, erros: 0 },
  { questao: 3, acertos: 5, erros: 0 },
  { questao: 4, acertos: 3, erros: 0 },
  { questao: 5, acertos: 5, erros: 0 } ]



```

```bash
// CLIENTE

1;5;VVFFV;2;4;VVVV;3;5;FFVFF;4;3;FFF;5;5;VVFVF // Gabarito enviado pelo usuário

enviar // palavra para enviar para o servidor

Input do usuário: 1;5;VVFFV;2;4;VVVV;3;5;FFVFF;4;3;FFF;5;5;VVFVF 

```

## Observações

A atividade foi desenvolvida em Linux (Ubuntu 19.04), pode ser que hajam erros ao ser executado em outros sistemas operacionais.