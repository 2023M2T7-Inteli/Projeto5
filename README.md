# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2022/04/28103439/Logo-Container.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Apotich

## Potich

## Integrantes: 
- <a href="https://www.linkedin.com/in/eduardo-hos/">Eduardo Henrique Oliveira Santos</a>
- <a href="https://www.linkedin.com/in/gabrielcolettosilva/">Gabriel Coletto Silva</a>
- <a href="https://www.linkedin.com/in/andr%C3%A9-hutzler-60aa28277/?originalSubdomain=br">André Hutzler</a>
- <a href="https://www.linkedin.com/in/mauro-das-chagas-junior-7306a71b9/">Mauro Das Chagas Junior</a>
- <a href="https://www.linkedin.com/in/lucasdeluccas/">Lucas Nogueira Storelli de Luccas</a>
- <a href="https://www.linkedin.com/in/patrick-savoia-4b26a126a/">Patrick Brett Savoia</a>
- <a href="https://www.linkedin.com/in/leonardokalid/">Leonardo Kalid Guene</a>

## Profesorres: 
- <a href="https://www.linkedin.com/in/andreluizbraga/">André Luiz Braga</a>
- <a href="https://www.linkedin.com/in/egondaxbacher/?locale=pt_BR">Egon Daxbacher</a>
- <a href="https://www.linkedin.com/in/filipe-gon%C3%A7alves-08a55015b/">Filipe Gonçalves</a>
- <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco Escobar</a>
- <a href="https://www.linkedin.com/in/geraldo-magela-severino-vasconcelos-22b1b220/">Geraldo Vasconcelos</a>
- <a href="https://www.linkedin.com/in/juliastateri/">Julia Stateri</a>
- <a href="https://www.linkedin.com/in/sergio-venancio-a509b342/">Sergio Venancio</a>



## 📝 Descrição

<br><br>
Somos a flor que pode te proporcionar os melhores fruto.
<br><br>
<p align="center">
<img src="/Codigo/app1.0/public/img/LogoPotich.png"" alt="Logo Potich" border="0" width="200">


<br><br>

&emsp; Nossa solução é uma aplicação web com duas rotas principais, cada uma delas focada em uma de nossas personas. <br>
&emsp; A primeira rota é destinada aos pesquisadores da Natura, ela terá a principal funcionalidade  de ser uma forma dinâmica e prática para que eles criem protocolos (formulários de preenchimento de pesquisa) de acordo com suas necessidades e desafios de pesquisa. Ademais, nessa parte, os pesquisadores  serão capazes de verificar quais os antigos protocolos que eles já fizeram, além de poderem baixar as informações dos mesmos. <br>
&emsp; A segunda rota é destinada aos coletores de matéria-prima da Natura, ela terá a principal funcionalidade de conectar esses agricultores com os protocolos gerados pelos pesquisadores, além de garantir que eles possam preenchê-los com a maior praticidade e facilidade possível. <br>
&emsp; Em suma, nossa solução é uma plataforma que vai conectar o trabalho de pesquisa dos coletores com a análise dos pesquisadores, fazendo com que o processo de compreensão das propriedades dos elementos da fauna brasileira sejam mais reconhecidos e melhor utilizados. <br>
<br>
<a href="youtube.com">Vídeo Demo (Subir no youtube)</a>
<br>
## 📁 Estrutura de pastas

raiz<br>
|<br>
|--> 📂 Documentos<br>
  &emsp;|--> 📂 Antigos<br>
  &emsp;| 📄 WAD_Sprint5.docx<br>
  &emsp;| 📄 WAD_Sprint5.pdf<br>
|--> 📂 src<br>
  &emsp;|--> 📂 backend<br>
  &emsp; &emsp;|--> 📂 app-source<br>
  &emsp; &emsp; &emsp;|--> 📂 controllers<br>
  &emsp; &emsp; &emsp;|--> 📂 security<br>
  &emsp;|--> 📂 data<br>
  &emsp;|--> 📂 frontend<br>
  &emsp; &emsp;|--> 📂 public<br>
  &emsp; &emsp; &emsp;|--> 📂 css<br>
  &emsp; &emsp; &emsp;|--> 📂 img<br>
  &emsp; &emsp; &emsp; &emsp;|--> 📂 icons<br>
  &emsp; &emsp; &emsp;|--> 📂 js<br>
  &emsp; &emsp;|--> 📂 views<br>
  &emsp; &emsp; &emsp;|--> 📂 main<br>
  &emsp; &emsp; &emsp;|--> 📂 produtor<br>
  &emsp; &emsp; &emsp;|--> 📂 researcher<br>
| 📄 LICENSE.txt<br>
| 📄 README.md<br>

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2.  Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após, abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```

5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.

```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

1. Certifique-se que há um arquivo "package.json" na pasta backend do projeto.

2. Dentro deste arquivo, encontre a propriedade "scripts", e adicione um atributo de nome "start"
com o valor "node <CAMINHO_DO_ARQUIVO_DO_SERVIDOR>." Atenção: "<CAMINHO_DO_ARQUIVO_DO_SERVIDOR>"
deve ser substituído pelo caminho para o arquivo principal da aplicação, utilizado para subir o
servidor. Por exemplo, se o arquivo utilizado para subir o servidor é "app.js", o atributo start
deve possuir o valor "node app.js".

3. No arquivo utilizado para subir a aplicação, defina a porta padrão de execução para "1234".
```

## 🗃 Histórico de lançamentos

1.0.0 - 05/05/2023
  - NEW: WAD v1
  - NEW: Back-end
  - NEW: Front-end
  - NEW: Database

1.1.0 - 12/05/2023
  - UPDATE: Integração Back e Front-end
  - UPDATE: Comentário Código Back-end
  - UPDATE: Criação do Método JOIN
  - UPDATE: Front-end
  - UPDATE: Readme.md
  - UPDATE: Modularização da Funções de CRUD

1.2.0 - 19/05/2023
  - UPDATE: Database
  - NEW: Protocol Creation feature

 2.0.0 - 26/05/2023
   - NEW: Front-end Coletor
   - UPDATE: Protocol Creation feature
   - NEW: Paleta de cores
   - UPDATE: CSS Main e Coletor
   - UPDATE: Routes to Express Default

2.1.0 - 02/06/2023
  - NEW: CSS Pesquisador
  - NEW: Dynamic Generation of Protocols
  - UPDATE: Refactoring Endpoints
  - UPDATE: Folder Structure
  - UPDATE: Readme.md
  - UPDATE: CSS Main e Coletor

3.0.0 - 09/06/2023
  - NEW: Dynamic Step Creation
  - NEW: Dynamic FIeld Creation
  - NEW: Login System
  - UPDATE: Major Changes in DB
  - UPDATE: Modularizing Cryptography
  - UPDATE: CSS Pesquisadores
  - NEW: Notifications HTML

4.0.0 - 16/06/2023
  - UPDATE: Integration of Protocols in Progress
  - NEW: Internet Checking Feature
  - UPDATE: Securing Data Integrity
  - UPDATE: Front-end Coletores
  - NEW: Dynamic Protocol Displaying
  - NEW: Local Storage Feature!!!

5.0.0 - 23/06/2023
  - UPDATE: Database Refactoring
  - UPDATE: It is possible to send images
  - UPDATE: Readme.md
  - UPDATE: Index.html
  - UPDATE: Folder Refactoring
  - UPDATE: Status Integration
  - UPDATE: Radio Buttons in HTML and Database
  - UPDATE: Answers Integration
  - NEW: Protocol Filtering
  - NEW: CSS Responsivity
  - UPDATE: Major Changes in Front-end
  - UPDATE: Dynamic Card Image Integration
  - UPDATE: Radio Buttons
  - UPDATE: Login Page
  - UPDATE: Modularization of Dynamic Protocol Functions
  - UPDATE: Comentários no Código
  - UPDATE: Major Changes in Back-end


## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2023M2T7-Inteli/Projeto5">Apotich</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/2023M2T7-Inteli/Projeto5">Inteli, André Hutzler, Eduardo Henrique Oliveira Santos, Gabriel Coletto Silva, Leonardo Kalid Guene, Lucas Nogueira Storelli de Luccas, Mauro Das Chagas Junior, Patrick Brett Savoia</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>
