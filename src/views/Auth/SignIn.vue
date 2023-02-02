<template>
  <v-container fluid class="fill-height">
    <v-row>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  methods: {
    async signin() {
      if (this.loading) return
      this.loading = true

      const data = await this.$store
        .dispatch('signIn', { email: this.email, password: this.password })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$refs.form.setErrors({
            Email: ["We don't reconize, this email"],
            Password: ["We don't reconize, this password"]
          })
        })

      if (!data) return
      const user = await this.$store
        .dispatch('getCurrentUser', data.token)
        .catch((err) => console.log(err))

      if (!user) return

      this.loading = false
      this.$router.push({ name: 'Home' })
    }
  },
  created(){
    let acessToken = this.$route.params.accessToken ? this.$route.params.accessToken : '';
    let email = this.$route.params.email ? this.$route.params.email : 'usuariologado@hotmail.com';
    this.$store.dispatch('signIn', { email: email, token: acessToken })
    this.$router.push({ name: 'Home' })
  }
}
</script>

<style></style>
