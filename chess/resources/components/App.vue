<template>
  <div>
    <h1>Helló fő kompones</h1>
    <nav>
      <router-link to="/home">Egyik</router-link> |
      <router-link to="/about">Másik</router-link>
    </nav>
    <router-view /> 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
