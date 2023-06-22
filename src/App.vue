<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Login from '@/components/Login.vue';
export default {
  name: 'App',
  components: {
    Header,
    Login,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: 0
}

</style>
