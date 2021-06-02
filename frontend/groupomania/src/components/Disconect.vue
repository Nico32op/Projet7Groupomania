<template>
    <p> <button @click.prevent="disconect" type="submit" class="btn-disconect">Déconnection</button> </p>
</template>

<script>
export default {
  name: 'Disconect',

methods:{ disconect() {
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
</style>