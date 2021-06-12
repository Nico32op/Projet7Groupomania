<template>
    <p> <button @click.prevent="disconect" type="submit" class="btn-disconect"><span class="cacher">aaaa</span><i class="fas fa-power-off"></i></button> </p>
</template>

<script>
export default {
  name: 'Disconect',

methods:{ 
  disconect() {
  localStorage.clear();
  document. location. href="http://localhost:8080/login";
}

}
}
</script>

<style scoped>

.btn-disconect{
  padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356DC, #FF79DA);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor:pointer;
}

.btn-disconect:hover {
  opacity: 0.8;
  background: linear-gradient(black,red);
  text-shadow: 2px 2px 2px black;
  box-shadow: 2px 2px 2px black;
  transition-duration: .15s;
}

.fa-power-off{
  font-size: 30px;
}

.cacher{ /*je cache le texte du bouton pour WAVE*/
  display: none;
}
</style>