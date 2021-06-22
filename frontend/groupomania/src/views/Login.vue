<template>
  <main>
    <form>
      <div class="container1">
        <Logo/>
        <p>
          <small>
            Vous n'avez pas encore de compte,
            <router-link class="redirection-singup" to="/signup">enregistrez-vous</router-link>
          </small>
        </p>
      </div>
      <div class="container2">
        <div class="form-group">
          <label for="inputEmail"><span>Email </span></label>
          <input type="text" class="form-control" id="inputEmail" v-model="dataLogin.email" />
        </div>
        <div class="form-group">
          <label for="inputPassword"><span>Password </span></label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataLogin.password"
          />
        </div>
        <button @click.prevent="logIn" type="submit" class="btn-connexion">Connexion</button>
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
  name: "Login",
  components: {Footer, Logo},
  data() {
    return {
      dataLogin: {
        email: null,
        password: null,
      },
    };
  },

  methods: {
    logIn() {
  
    if (
        this.dataLogin.email !==null ||
        this.dataLogin.password !== null
      )    {
        axios
          .post("http://localhost:3000/api/auth/login", this.dataLogin)
          .then(response => {
              console.log(response);
              localStorage.setItem('token',response.data.token)
              document. location. href="http://localhost:8080/message"; 
          })
          .catch(error => console.log(error));
      } 
    }
  }
};
</script>

<style scoped>

img{
  width: 250px;
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

span { /*titre, contenu... en gras */
  font-weight: bold;
}

#inputEmail, #inputPassword{
  border: 2px solid none;
  border-radius: 10px;
  border: none;
  outline: none;
  box-shadow: 1px 1px 1px black;
  margin: 5px;
}

.btn-connexion{
  padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356DC,#f26896);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor:pointer;
}

.btn-connexion:hover {
  opacity: 0.8;
  background: linear-gradient(green, black);
  text-shadow: 2px 2px 2px black;
  box-shadow: 2px 2px 2px black;
  transition-duration: .15s;
}

#msg{ /*message d'alert qui s'affiche en cas d'erreur de saisie*/
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