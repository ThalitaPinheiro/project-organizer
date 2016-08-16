# project-organizer

Trata-se de um organizador de projetos. Cada projeto é composto por tasks, que devem ser adicionadas posteriormente ao projeto.

Projeto construido com node, express e mongodb.
As configuraçoes pessoais podem ser setadas no arquivo de configuraçao, dento da pasta conf.
A aplicaçao roda, por padrao na porta 3000.

## Instruçoes
* Para a instalaçao das dependencias do projeto, execute:
```
npm install
```

* Para a execuçao dos testes automatizados do projeto, execute:
```
npm test
```
Essa execuçao de testes gera um relatorio de coverage, que demonstra graficamente a cobertura de codigo atingida pelos testes.

* Para gerar uma pasta "dist" com o conteúdo publicavel do sistema, execute
```
npm build
```

* Para executar a api, execute
```
npm start
```
Depois de iniciada a aplicaçao, torna-se acessível a documentaçao, construida com o swagger, através do endereço  [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/ "Swagger").
