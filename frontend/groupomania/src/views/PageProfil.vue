<template>
<main>
<div id="hautdepage"></div>
<div class="container1">
  <Logo/>
 <div class="BoutonDisconect"> <Disconect/> </div>
  <router-link class="redirection-message" to="/message">Accéder au fil d'actualités</router-link><br>
     <span> Pseudo :</span> {{ posts.username }}<br>
     <span> Email :</span> {{ posts.email }}<br>
     <span> Numéro d'identifiant :</span> {{ posts.id }} <br>
     <p v-if="posts.isAdmin==true" ><span> Profil administrateur :</span> {{ posts.isAdmin }} <br></p>
      <!-- le profil administrateur ne s'affiche que si la personne connectée est admin -->
      <p>  <button @click.prevent="SupProfile" type="submit" class="btn-supcompte">Supprimer le compte</button> </p>
  <Footer/>    
</div>
</main>
</template>

<script>
import Disconect from '@/components/Disconect.vue'; //j'appel ma fonction déconnexion
import Footer from '@/components/Footer.vue';
import Logo from '@/components/Logo.vue';
import axios from "axios";

export default {
    name: "PageProfil",
    components :{Disconect, Footer, Logo},
    data() {
        return{
        posts: [] 
        }
        
    },

       mounted() { // je récupère les données du profil connecté
      axios
        .get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        
        .then(response => {
          console.log('réponse API',response);
          this.posts = response.data
          
        })
        },

    methods:{
        SupProfile() { //me permet de supprimer un profil au click
      if (
        window.confirm("Voulez vous vraiment supprimer votre compte?")
      )
      axios
        .delete("http://localhost:3000/api/auth/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
     
        .then(() => {
          localStorage.clear();
          document. location. href="http://localhost:8080/signup";
        })
        }

}   
};
</script>

<style scoped>
img{
  width: 240px;
  height: 50px;
}

main{
  background-color: whitesmoke;
  background-image: url("../assets/icon.png");
  background-position: center;
  margin: auto;
  justify-content: center;
  height: 600px;
  font-family: Arial, Helvetica, sans-serif;
}

span{
  font-weight: bold;
}

.redirection-message{
  position: absolute;
  right: 12px;
  top: 10px;
}

.BoutonDisconect{
  position: absolute;
  right: 12px;
  top: 15px;
}

.btn-supcompte{
  padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356DC,#f26896);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor:pointer;
}

.btn-supcompte:hover {
  opacity: 0.8;
  background: linear-gradient(black,red);
  text-shadow: 2px 2px 2px black;
  box-shadow: 2px 2px 2px black;
  transition-duration: .15s;
}

Footer{
  position: absolute;
  top: 480px;
}

@media (max-width: 767px) {

.redirection-message{
  position: static;
}

.BoutonDisconect{
  position: static;
}

Footer{
  position: fixed;
  left:0px;
  bottom: 0px;
  width: 90%;
}


}

</style>
