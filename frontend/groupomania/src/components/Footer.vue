<template>
     <footer>
    <div class="wrapper">
      <small>&copy;2021 <strong>Groupomania</strong>, Tous droit réservé</small>
      <nav class="footer-nav">
        <a href="#hautdepage">Retour en haut</a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
strong {
  font-weight: 700;
}

footer {
  background: url('https://orange.codeberryschool.com/content/images/project-assets/simple-footer.png') repeat center;
  display: table;
  width: 100vw;
  height: 8rem;
  text-align: center;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
  font-size: .875rem;
  width: 97%;
}

.wrapper {
  display: table-cell;
  vertical-align: middle;
}

footer small {
  color: white;
  letter-spacing: .025rem;
  margin-bottom: 1.5rem;
  display: block;
}

.footer-nav a, .redirection-profil {
  color: #c74f78;
  text-decoration: none;
  margin: 0 .5rem;
  display: inline-block;
}

.footer-nav a:hover {
  color: #f26896;
  transition: color .15s ease-in-out;
}

</style>