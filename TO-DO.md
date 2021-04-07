# TO-DO

## FUTURAS IMPLEMENTAÇÕES
- Página inicial:
  * Fazer com que os desafios sejam divididos em várias colunas em telas grandes
- Área administrativa:
  * Exibir uma mensagem de confirmação ao deletar dados
  * Separar em páginas os dados advindos do banco de dados
- Adicionar a possibilidade de fazer upload de vídeos para as recompensas
- Tratar erros nos formulários antes que sejam enviados ao servidor
- Refinar o sistema de validação das senhas
- Permitir que as recompensas sejam aplicadas a mais de um desafio
- Permitir que alguns desafios recebam um campo de "resposta" para que o usuário tenha que digitar sua tentativa
- Criar uma área onde usuários comuns possam deletar sua conta ou seus desafios
- Permitir que o usuário crie um nome de exibição, ao invés de usar seu próprio nome de usuário

## BUGS CONHECIDOS
- O tamanho do contâiner da página está limitado ao tamanho da viewport
- Módulo bcryptjs não está funcionando
- Área administrativa:
  * Ao alterar um desafio/recompensa o seu *owner* aparece duplicado na lista

## DETALHES
- Requisitos da senha de usuário: mínimo de 6 máximo de 16 caracteres de comprimento, apenas caracteres alfanuméricos
- Requisitos do nome de usuário: mínimo de 4 máximo de 16 caracteres de comprimento, apenas caracteres alfanuméricos
- Os link dos vídeos adicionados às recompensas devem ser um para um *embed video* do *YouTube*
- Ao criar um novo usuário alguns desafios são automaticamente adicionados