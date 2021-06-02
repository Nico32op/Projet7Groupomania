//le dossier de controllers contiendra le contenu de toutes les routes (post,get..) pour rendre plus lisible le dossier routes

const { json } = require("body-parser");
let models = require("../models"); // on appel notre modèle de shéma mongoose
let jwtUtils = require("../utils/jwtUtils");
let asyncLib = require("async"); //permet de mettre en place des waterfall
const fs = require("fs"); //donne accès aux fonctions qui nous permettent de modifier le système de fichiers (supprimer les images)
const { title } = require("process");

const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

exports.creationobjet = (req, res, next) => {
  // Getting auth header
  let headerAuth = req.headers["authorization"];
  let userId = jwtUtils.getUserId(headerAuth);
  console.log(userId);
  console.log("BODY", req.body);
  // Params à envoyer
  let title = req.body.title;
  let content = req.body.content;
  let attachmentURL;
  if (req.file != undefined) {
    //on vérifie si il y a une image dans la requête
    attachmentURL = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    attachmentURL == null;
  }
  if (title == null || content == null) {
    //titre et contenu ne doivent pas être vide
    return res.status(400).json({ error: "missing parameters" });
  }

  if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
    //titre et caractère doivent pas être inférieur à un nombre de caractère donné
    return res.status(400).json({ error: "invalid parameters" });
  }

  asyncLib.waterfall(
    //waterfall permet d'éxécuter des fontions en cascades, rend le code plus lisible
    [
      //créé un tableau qui contient les fonctions
      function (done) {
        //récupère dans la base de donnée notre utilisateur
        models.User.findOne({
          where: { id: userId },
        })
          .then(function (userFound) {
            //cas ou l'utilisateur a était trouvé
            done(null, userFound);
          })
          .catch(function (err) {
            return res.status(500).json({ error: "unable to verify user" }); //cas ou l'utilisateur n'est pas trouvé
          });
      },
      function (userFound, done) {
        if (userFound) {
          console.log(userFound.id);
          models.Message.create({
            //si tout est ok (utilisateur trouvé et contenu bien rempli) on créé le message
            userId: userFound.id, //relis un message à un utilisateur unique
            title: title,
            content: content,
            attachement: attachmentURL,
            likes: 0,
          }).then(function (newMessage) {
            //si tout est ok newMessage est l'objet que l'on vien de créer
            done(newMessage);
          });
        } else {
          res.status(404).json({ error: "user not found" });
        }
      },
    ],
    function (newMessage) {
      //si le message n'a pas était enregistré on envoie une erreur 500
      if (newMessage) {
        console.log(newMessage);
        return res.status(201).json(newMessage);
      } else {
        return res.status(500).json({ error: "cannot post message" });
      }
    }
  );
};

exports.modifobjet = (req, res, next) => {
  //repond a une requete PUT(modifier)
  const messageObject = req.file //cette constante vérifie si il y a un fichier (image) à modifier ou non
    ? {
        ...JSON.parse(req.body.message), //si l y a une image on la gère ici
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          //on récupère le http (req.protocol), la locallisation du server (localhost:3000) et ou se trouve le dossier on enregistre (images), cela créé l'url ou sera visible l'image
          req.file.filename // filename récupère le nom du fichier et sera la dernière partie de l'url
        }`,
      }
    : { ...req.body }; //sinon on le traite "normalement" en récupérant le corps de la requête
  message
    .updateOne(
      { _id: req.params.id },
      { ...messageObject, _id: req.params.id } //on veut être certain que l'id reçu et le même que celui de la base de données
    ) //updateone permet de mofier un élément du tableau de la base de données
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.supprimerobjet = (req, res, next) => {
  //identification du demandeur
  let userOrder = req.body.userIdOrder;
  let headerAuth = req.headers["authorization"];
  let userId = jwtUtils.getUserId(headerAuth);
  console.log(userId);
  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: userId },
  })
    .then((user) => {
      //Vérification que le demandeur est soit l'admin soit le poster
      if (user && (user.isAdmin == true || user.id == userOrder)) {
        //userOrder et l'id de la personne qui créé le message (envouyer par le front)
        console.log("Suppression message avec l'id :", req.params.id); //récupère l'id en provenance de l'url
        models.Message.findOne({
          where: { id: req.params.id },
        })
          .then((postFind) => {
            if (postFind.attachement) {
              //une fois le message identifié avec le bon id on vérifie si il y a une images
              const filename = postFind.attachement.split("/images/")[1];
              console.log("youpi", filename);
              fs.unlink(`images/${filename}`, () => {
                //si il y en a une on l'a selectionne avant de la supprimer avec le message
                models.Message.destroy({
                  where: { id: postFind.id },
                })
                  .then(() => res.end())
                  .catch((err) => res.status(500).json(err));
              });
            } else {
              //si il n'y a pas d'image on supprime le message simplement
              models.Message.destroy({
                where: { id: postFind.id },
              })
                .then(() => res.end())
                .catch((err) => res.status(500).json(err));
            }
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(403).json("Utilisateur non autorisé à supprimer ce post");
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.affichetouslesprod = (req, res, next) => {
  models.Message.findAll({
    include: [
      //inclu la relation direct avec la table User
      {
        model: models.User,
        attributes: ["id", "username", "isAdmin"], //on ne veut afficher que le username
      },
    ],
    order: [["createdAt", "DESC"]], //ordre dans lequel on souhaite afficher les msg
  })
    .then((messages) => {
      if (messages.length > null) {
        //on vérifie si le message n'est pas vide
        res.status(200).json(messages); //si tout est ok on formate nos données au format json
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Permet de "liker"ou "dislaker" (FUTUR PROJET A TRAVAILLER)

exports.gestiondeslikes = (req, res, next) => {
  //récupération de l'userId et de la variable Like pour traiter la requête
  let like = req.body.like;
  let user = req.body.userId; //id de l'utilisateur
  message
    .findOne({ _id: req.params._id })
    //recherche de l'objet grâce à son id
    .then((message) => {
      switch (like) {
        //dans le cas où on souhaite ajouter un like
        case 1:
          message
            .updateOne(
              { _id: req.params._id }, //id de l'objet
              {
                $inc: { likes: +1 }, //on rajoute +1 à l'objet likes de la base données
                $push: { usersLiked: user }, // ajout de l'id de l'utilisateur dans le tableau usersLiked de la base donnée
                _id: req.params._id, //on vérifie que l'objet a toujours le même id
              }
            )
            .then(() => {
              res.status(200).json({ message: "=D" });
              console.log(message);
            });
          break;
        case -1: //dans le as ou l'on souhaite "enlever" un like
          message
            .updateOne(
              { _id: req.params._id },
              {
                $inc: { dislikes: +1 }, //on rajoute +1 à l'objet dislikes de la base données
                $push: { usersDisliked: user }, // ajout de l'id de l'utilisateur dans le tableau usersdisLiked de la base donnée
                _id: req.params._id,
              }
            )
            .then(() => res.status(200).json({ message: "='(" }));
          break;
        case 0: //dans le cas ou l'on souhaite modifier un like
          if (message.usersLiked.includes(user)) {
            //on cherche l'id de l'utilisateur dans le tableau usersLiked
            message
              .updateOne(
                { _id: req.params._id },
                {
                  $inc: { likes: -1 }, //retrait d'1 like
                  $pull: { usersLiked: user }, //retrai de l'utilisateur du tableau usersliked
                  _id: req.params._id,
                }
              )
              .then(() =>
                res.status(200).json({ message: "On retire un like !" })
              );
          }
          if (message.usersDisliked.includes(user)) {
            //on cherche l'utilisateur dans le tableau usersDisliked
            message
              .updateOne(
                { _id: req.params._id },
                {
                  $inc: { dislikes: -1 }, //retrait d'1 dislike
                  $pull: { usersDisliked: user }, //retrai de l'utilisateur du tableau usersdisliked
                  _id: req.params._id,
                }
              )
              .then(() =>
                res.status(200).json({ message: "On retire un dislike !" })
              );
          }
          break;
        default:
          console.log("default"); //si aucune correspondance est trouvé avec les valeurs "case"
      }
    })

    .catch((error) => res.status(400).json({ error }));
};
