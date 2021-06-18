# Projet7Groupomania

Après avoir cloner le repo depuis la branche "master" et installer les packages nécessaires : 

Lancement du front (Vue CLI) :
- cd front-end
- cd groupomania
- npm run serve
- aller ensuite sur "http://localhost:8080/"

Lancement du serveur Node :
- cd back-end
- nodemon server

Création de la base de donnée :
- créer localement la base de donnée « database_development_groupomania »
- créer localement (depuis le terminal backend) les tables de la base de donnée en s'inspirant de mon dossier "models"
- depuis le terminal effectuer : cd backend , tapez sequelize db:create , puis sequelize db:migrate , (assurez vous que sequelize-cli est bien installé)
- les tables sont désormais disponible dans la base de donnée 

Technologies utilisées :
Vue CLI (+VueRouter) / Node.JS / Express / ORM Sequelize (SQL)
