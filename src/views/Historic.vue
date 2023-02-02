<template>
  <div id="home" class="pa-4">
    <v-container fluid>

      <main >
        <h1 class="headline font-weight-medium">Historic Search List</h1>
        <v-row v-for="(historic,i) in $store.getters.getHistoric" :key="i">
          <h4> - {{ historic }}</h4>
          <br>
        </v-row>
      </main>
    </v-container>
  </div>
</template>

<script>


import {  mapGetters } from 'vuex'

export default {
  
  name: 'Historic',
  data: () => ({

  }),
  computed: {
    ...mapGetters(["getHistoric"])
  },
  methods: {
   

  },
  components: {

  }
}
</script>

<style lang="scss">

</style>
