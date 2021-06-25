<template>
  <main>
    <form>
      <div class="container1">
        <span class="msg">{{ msg }}</span>
        <Logo/>
        <p>
          <small>
            Vous avez déjà un compte,
            <router-link class="redirection-singup" to="/login">connecter-vous</router-link>
          </small>
        </p>
      </div>
      <div class="container2">
        <div class="form-group">
          <label for="inputEmail"><span>Email </span></label>
          <input type="email" class="form-control" id="inputEmail" v-model="dataSignup.email" />
        </div>
        <div class="form-group">
          <label for="inputUsername"><span>Username </span></label>
          <input type="text" class="form-control" id="inputUsername" v-model="dataSignup.username" placeholder="entre 5 et 12 caractères" />
        </div>
        <div class="form-group">
          <label for="inputPassword"><span>Password </span></label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataSignup.password"
            placeholder="1min, 1maj, 1spéc, 8car(min)"
          />
        </div>
        <label for="inputFile"><span class="cacher">aaaa</span></label>
       <div class="btn-upload"> <input name="inputFile" type="file" class="upload" id="inputFile" @change="onFileChanged"/></div><br>
        <button @click.prevent="sendSignup" type="submit" class="btn-signup">Enregistrez-vous</button>
      </div>
    </form>
    <Footer/>
  </main>
</template>

<script>

import axios from "axios";
import Footer from '@/components/Footer.vue';
import Logo from '@/components/Logo.vue';

export default {
  name: "SignUp",
  components: {Footer, Logo},
  data() {
    return {
      dataSignup: { //on initialise les éléments suivants qui sont vides pour le moment et seront "remplis" grâce à v-model
        username: null,
        email: null,
        password: null,
        selectedFile:null
      },
      msg:""
    };
  },

  methods: {
    sendSignup() {
      const formData = new FormData();
  formData.append('username', this.dataSignup.username);
  formData.append('email', this.dataSignup.email);
  formData.append('password', this.dataSignup.password);
  formData.append('inputFile', this.dataSignup.selectedFile);
if (formData.get("email") !== null & formData.get("username") !== null & formData.get("password") !== null) 
 { this.msg ="ERREUR DE SAISIE"}
 
 {
        axios
          .post("http://localhost:3000/api/auth/signup", formData)
          .then(response => {
            console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
            //Réinitialisation
            this.dataSignup.email = null;
            this.dataSignup.username = null;
            this.dataSignup.password = null;
            document. location. href="http://localhost:8080/login";
          })
          .catch(error => console.log(error));
      } 
    },

  onFileChanged (event) { //me permet de charger un fichier (une image) au click
    this.dataSignup.selectedFile = event.target.files[0];
    console.log(this.dataSignup.selectedFile)
  }

}
};
</script>

<style scoped>
main{
  background-color: whitesmoke;
  background-image: url("../assets/icon.png");
  background-position: center;
  margin: auto;
  justify-content: center;
  height: 600px;
}

span { /*titre, contenu... en gras */
  font-weight: bold;
}

.cacher{ /*je cache le texte du bouton pour WAVE*/
    display: none;
}

.btn-signup{
  padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356DC,#f26896);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor:pointer;
}

.btn-signup:hover {
  opacity: 0.8;
  background: linear-gradient(green, black);
  text-shadow: 2px 2px 2px black;
  box-shadow: 2px 2px 2px black;
  transition-duration: .15s;
}

#inputEmail, #inputPassword, #inputUsername{
  border: 2px solid none;
  border-radius: 10px;
  border: none;
  outline: none;
  box-shadow: 1px 1px 1px black;
  margin: 5px;
}

img{
  width: 250px;
  height: 50px;
}

.msg{ /*message d'alert qui s'affiche en cas d'erreur de saisie*/
  color: red;
}

Footer{
  position: absolute;
  top: 480px;
}

@media (max-width: 767px) {

Footer{
  position: fixed;
  left:0px;
  bottom: 0px;
  width: 90%;
}

}

</style>