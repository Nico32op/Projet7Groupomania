# Projet7Groupomania

Après avoir installer NodeJs, on clone le repo depuis la branche "master" et ensuite:

Création Backend : 
Depuis le terminal backend:

 -ajouter npm init,  pour démarrer le projet (point d’entré server.js), cela créé également un fichier package.json qui contient les package qu’on aura installé avec npm

Installation des différents package : 
- npm install express --save (framework de node)
- npm install helmet --save (sécurité)
- npm install cookie-session --save (sécurité)
- npm install express-rate-limit --save (sécurité)
- npm install jsonwebtoken --save (sécurité)
- npm install dotenv --save (sécurité)
- npm install bcrypt --save (sécurité)
- npm install multer --save (permet la récupération des images du frontend)
- npm install body-parser --save (permet d'extraire l'objet json provenant du frontend)
- npm install async --save (waterfall)
 
 Une fois les package installé depuis le terminal backend on saisie : nodemon server 
 Mainteant le serveur backend est créé sur "localhost:3000"

Installation ORM Sequelize + création et migrations des modèles des tables vers la base de données après sa création

Depuis le terminal backend du dossier on saisie dans l'ordre:

-npm install --save sequelize 

-npm install mysql --save
-npm install mysql2 --save
-sequelize init
- créer localement (depuis le terminal backend) les tables de la base de donnée en s'inspirant de mon dossier "models" (ex : depuis le terminal backend on saisie: sequelize model:create –attributes «email:string….  » --name User, création de la table User)
- créer localement la base de donnée (ex: depuis le terminal "MySQL Commande Line Client" on saisie : create database database_development_groupomania;)
- ensuite on migre les tables créées vers la base de donnée : sequelize db:migrate
- les tables sont désormais disponible dans la base de donnée 
IMPORTANT : le mot de passe de la base de donnée est masqué dans le dossier : models/index.js

Création frontend (Vue CLI qu'il faut avoir installer auparavant) :

Depuis le terminal côté frontend on saisie dans l'ordre:
- npm install -g @vue/cli (installation vue cli)
- vue create groupomania (création du projet vue cli)
Après avoir fini de configurer votre projet Vue Cli selon vos préférences, il faut saisir dans l'ordre
- cd front-end
- cd groupomania
- npm run serve
- aller ensuite sur "http://localhost:8080/"

Technologies utilisées :
Vue CLI (+VueRouter) / Node.JS / Express / ORM Sequelize (SQL)
