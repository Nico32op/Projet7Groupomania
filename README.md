# Projet7Groupomania

Après avoir cloner le repo depuis la branche "master" et installer les packages nécessaires : 
async, bcrypt, body-parser, cookie-session, dotenv, express, express-rate-limit, helmet, jsonwebtoken, multer, mysql2, sequelize

Lancement du front (Vue CLI qu'il faut avoir installer auparavant) :
- cd front-end
- cd groupomania
- npm run serve
- aller ensuite sur "http://localhost:8080/"

Création de la base de donnée :
- créer localement la base de donnée (ex: depuis le terminal MySQL on saisie : create database database_development_groupomania;)
- créer localement (depuis le terminal backend) les tables de la base de donnée en s'inspirant de mon dossier "models" (ex : depuis le terminal backend on saisie: sequelize model:create –attributes «email:string….  » --name User, création de la table User)
- ensuite on migre les tables créées vers la base de donnée : sequelize db:migrate
- les tables sont désormais disponible dans la base de donnée 

Lancement du serveur Node :
- cd back-end
- nodemon server

Technologies utilisées :
Vue CLI (+VueRouter) / Node.JS / Express / ORM Sequelize (SQL)
