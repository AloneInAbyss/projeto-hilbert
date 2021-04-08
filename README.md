# PROJETO HILBERT

## Guia de Instalação

**Programas Necessários**:
- NodeJS
- MongoDB

O *NodeJS* será usado para executar o JavaScript em um *web server* em nossa própria máquina. O *MongoDB* é um banco de dados onde os dados da aplicação ficam armazenados. 

Veja abaixo o guia de instalação de cada um desses programas.
- [Clique aqui](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/GUIA-NODEJS.md) para ver o guia de instalação do NodeJS
- [Clique aqui](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/GUIA-MONGODB.md) para ver o guia de instalação do MongoDB

### Baixando e Rodando o Projeto
1. Nesta mesma página do GitHub, clique em "Code" e na opção "Download ZIP" para baixar os arquivos do projeto. Para facilitar o acesso pelo Prompt de Comando, salve os arquivos na Área de Trabalho.

![projeto-01](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-01.png)

2. Extraia os arquivos. Novamente, para facilitar o acesso extraia na Área de Trabalho.

![projeto-02](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-02.png)
![projeto-03](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-03.png)

3. Agora precisamos acessar a pasta dos arquivos através do Prompt de Comando do Windows. Abra o Prompt e digite `cd Desktop` para acessar a Área de Trabalho. Se você salvou em outro lugar, deverá usar caminho escolhido. Então digite `cd projeto-hilbert-main` para acessar a pasta.

![projeto-04](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-04.png)
![projeto-05](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-05.png)
![projeto-06](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-06.png)

4. Agora que estamos com o Prompt no diretório do projeto, use o comando `npm install` para instalar as dependências necessárias.

![projeto-07](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-07.png)

5. Ao finalizar, já estamos prontos para iniciar o servidor. Para isso use o comando `npm start`.

![projeto-08](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-08.png)

6. Agora o servidor está pronto para ser acessado através do endereço http://localhost:3000/. Não feche o Prompt de Comando senão o servidor também será encerrado.

![projeto-09](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/projeto-09.png)

### Overview do Projeto
Se tudo deu certo até aqui, acessando http://localhost:3000/ você irá se deparar com a página de login do *site*. O passo inicial é realizar o cadastro através do botão "Cadastre-se".

![guia-01](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/guia-01.png)

Na página inicial haverá alguns desafios que são criados automaticamente para novos usuários. No fim da página há um desafio marcado como concluído que tem algumas dicas sobre o site.

![guia-02](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/guia-02.png)

Ao clicar em algum desafio, é possível ver sua descrição e marcar como concluído quando desejar. Quando um desafio for concluído, o botão para acessar a recompensa será desbloqueado.

![guia-03](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/guia-03.png)

![guia-04](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/guia-04.png)

Além do sistema de desafios e recompensas, há uma área administrativa para gerenciar os conteúdos do site. Experimente sair do usuário atual e fazer login com o usuário `admin` e a senha `admin123`. No topo da página inicial, haverá um link para a página **"Admin"**.

![guia-05](https://github.com/AloneInAbyss/projeto-hilbert/blob/main/github/guia-05.png)


## Mais Informações

Tecnologias utilizadas:
- HTML, CSS, JS
- Framework [Bootstrap](https://getbootstrap.com/)
- [NodeJS](https://nodejs.org/)
- Framework [Express](https://expressjs.com/)
- Template engine [Handlebars](https://handlebarsjs.com/)
- Banco de dados [MongoDB](https://www.mongodb.com/)

Módulos:
- [express](https://www.npmjs.com/package/express)
- [validator](https://www.npmjs.com/package/validator)
- [hbs](https://www.npmjs.com/package/hbs)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

Gerenciamento do projeto:
- [Figma](https://www.figma.com/)
- [Trello](https://trello.com/)
