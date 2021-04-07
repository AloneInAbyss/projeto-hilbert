# TO-DO

## FUTURAS IMPLEMENTAÇÕES
- Adicionar um `favicon`
- Página inicial:
  * Fazer com que os desafios sejam divididos em várias colunas em telas grandes
- Área administrativa:
  * Exibir uma mensagem de confirmação ao deletar dados
  * Separar em páginas os dados advindos do banco de dados
- Adicionar a possibilidade de fazer upload de vídeos para as recompensas
- Fazer com que um usuário novo receba vários desafios iniciais

## BUGS CONHECIDOS
- Módulo bcryptjs não está funcionando
- O tamanho do contâiner da página está limitado ao tamanho da viewport
- Área administrativa:
  * A responsividade das tabelas não foi adicionada
  * Ao alterar um desafio/recompensa o seu *owner* aparece duplicado na lista

## DETALHES
- Requisitos da senha de usuário: mínimo de 6 máximo de 16 caracteres de comprimento, apenas caracteres alfanuméricos
- Requisitos do nome de usuário: mínimo de 4 máximo de 16 caracteres de comprimento, apenas caracteres alfanuméricos