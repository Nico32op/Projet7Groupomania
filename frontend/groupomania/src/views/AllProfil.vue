       <template>
      <main>
          <div id="hautdepage"></div>
          <router-link class="redirection-message" to="/message"><Logo/></router-link>
         <div class="BoutonDisconect">  <Disconect/></div>
      <div class="container1">
      <div class = "test"><h1>Team 😃</h1>
      <ul id="example-1">
     <li v-for="item in posts" :key="item.id"> 
      <span>Pseudo :</span> {{ item.username }}<br>
      <span>Email :</span> {{ item.email }}<br>
      
      <p v-if="item.attachementuser" > <img :src="item.attachementuser" alt="..."  /></p><br> <!-- j'affiche l'image uniquement si il y en a une  -->
      </li> 
     </ul> 
     </div>
     </div>
     <Footer/>
      </main>  
</template>
  
<script>
import Disconect from '@/components/Disconect.vue'; //'j'importe ma fonction déconnexion
import Footer from '@/components/Footer.vue';
import Logo from '@/components/Logo.vue';
import axios from "axios";

   export default {
    name: "AllProfil",
    components :{Disconect, Footer, Logo},
      data() {
        return{
        posts: [] 
        }
        
    },
       mounted() { // je récupère les données du profil connecté
      axios
        .get("http://localhost:3000/api/auth/all",
         {  //je récupère les éléments que je souhaite poster
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token") //je récupère la clé présent dans le local storage
            }
          })
        .then(response => {
          console.log('réponse API',response);
          this.posts = response.data.found
          
        })
        .catch(error => console.log(error));
        }
};
      </script>

      <style scoped>

img{
 height: 240px;  
 width: 200px;
}

span{
font-weight: bold;
font-size: 20px;
}

header{
background-color: #F2F2F2;
height: 70px;
border-radius: 8px;
}

main{
     background-color: #FFFAFA;
}

.test li{ /*liste contenant les contenus, titre...*/
  background-color:#F2F2F2;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid none;
  border-radius: 8px;
  box-shadow: 1px 1px 2px #555;
  list-style: none;
  font-family: Arial, Helvetica, sans-serif;
  width: 60%;
}

.BoutonDisconect{
  position: absolute;
  right: 12px;
  top: 1px;
}

.cacher{
    display: none;
}

@media (max-width: 767px) {

.redirection-message{
  position: static;
  }

img{
 height: 200px;  
 width: 150px;
}

.test li{
    width: 100%;
}

#example-1{
  margin: auto;
  margin-right: auto;
  margin-left: auto;
  padding: 0px;
}

}   
</style>
      