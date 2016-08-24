# project-organizer

[![bitHound Overall Score](https://www.bithound.io/github/ThalitaPinheiro/project-organizer/badges/score.svg)](https://www.bithound.io/github/ThalitaPinheiro/project-organizer)
[![bitHound Dependencies](https://www.bithound.io/github/ThalitaPinheiro/project-organizer/badges/dependencies.svg)](https://www.bithound.io/github/ThalitaPinheiro/project-organizer/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/ThalitaPinheiro/project-organizer/badges/code.svg)](https://www.bithound.io/github/ThalitaPinheiro/project-organizer)

[![Travis build status](https://img.shields.io/travis/ThalitaPinheiro/project-organizer/master.svg)](https://travis-ci.org/ThalitaPinheiro/project-organizer) 
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![GitHub license](https://img.shields.io/github/license/ThalitaPinheiro/project-organizer.svg)](https://github.com/ThalitaPinheiro/project-organizer)
[![GitHub issues](https://img.shields.io/github/issues/ThalitaPinheiro/project-organizer.svg)](https://github.com/ThalitaPinheiro/project-organizer)



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
