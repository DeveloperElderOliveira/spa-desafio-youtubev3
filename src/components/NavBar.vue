<template>
  <nav id="navbar">
    <v-app-bar class="white" flat app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold"
        ><router-link to="/" class="black--text" style="text-decoration: none"
          >VueTube</router-link
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-text-field
        flat
        hide-details
        append-icon="mdi-magnify"
        placeholder="Search"
        outlined
        dense
        v-model="searchText"
        @click:append="search"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-menu offsetY v-if="$store.getters.isAuthenticated">
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon class="mr-7" v-on="{ ...tooltip, ...menu }"
                ><v-icon size="25">mdi-video-plus</v-icon></v-btn
              >
            </template>
            <span>Create a video and more</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item >
            <input type="file" @change="onFileChange" />
            <button @click="onUploadFile" class="upload-button" :disabled="!this.selectedFile">Upload file</button>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        tile
        outlined
        color="blue"
        class="font-weight-bold"
        v-if="!$store.getters.isAuthenticated"
        @click="redirectGoogleSignin" 
      >
        <v-icon left size="26">mdi-account-circle</v-icon> Sign in
      </v-btn>
      <v-btn
        tile
        outlined
        color="red"
        class="font-weight-bold"
        v-else
        @click="signOut" 
      >
        <v-icon left size="26">mdi-login-variant</v-icon> Sign Out
      </v-btn>
      
      

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$route.name !== 'Watch'"
      :temporary="$route.name === 'Watch'"
      id="nav"
    >
      <div tag="div" class="v-navigation-drawer__content" v-bar>
        <v-list dense nav class="py-0" tag="div">
          <v-list-item
            :class="{
              'hidden-lg-and-up': $route.name === 'Watch' ? false : true
            }"
          >
            <v-app-bar-nav-icon
              @click="drawer = !drawer"
              class="mr-5"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">VueTube</v-toolbar-title>
          </v-list-item>
          <v-divider class="hidden-lg-and-up"></v-divider>
          <div v-for="parentItem in items" :key="parentItem.header">
            <v-subheader
              v-if="parentItem.header"
              class="pl-3 py-4 subtitle-1 font-weight-bold text-uppercase"
              >{{ parentItem.header }}</v-subheader
            >
            <v-list-item
              v-for="(item, i) in parentItem.header === 'Subscriptions'
                ? items[2].pages.slice(0, channelLength)
                : parentItem.pages"
              :key="item.title"
              class="mb-0"
              :to="
                parentItem.header === 'Subscriptions'
                  ? '/channels/' + item.channelId._id
                  : item.link
              "
              exact
              active-class="active-item"
            >
              <v-list-item-icon v-if="parentItem.header !== 'Subscriptions'">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-avatar v-else class="mr-5">
                {{ i }}
                <v-avatar
                  v-if="
                    item.channelId.photoUrl !== 'no-photo.jpg' && item.channelId
                  "
                >
                  <img
                    :src="
                      `${getUrl}/uploads/avatars/${item.channelId.photoUrl}`
                    "
                    :alt="`${item.channelId.channelName} avatar`"
                  />
                </v-avatar>
                <template v-else>
                  <v-avatar color="red">
                    <span class="white--text headline ">
                      {{
                        item.channelId.channelName.split('')[0].toUpperCase()
                      }}</span
                    >
                  </v-avatar>
                </template>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class=" font-weight-medium subtitle-2">{{
                  parentItem.header === 'Subscriptions'
                    ? item.channelId.channelName
                    : item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-btn
              id="showBtn"
              @click="moreChannels"
              v-if="
                parentItem.header === 'Subscriptions' &&
                  isAuthenticated &&
                  items[2].length > 0
              "
              block
              text
              class="text-none"
            >
              <v-icon>{{
                channelLength === 3 ? 'mdi-chevron-down' : 'mdi-chevron-up'
              }}</v-icon>
              {{
                channelLength === 3
                  ? `Show ${items[2].pages.length - 3} more `
                  : 'Show less'
              }}</v-btn
            >

            <v-divider
              v-if="parentItem.header !== false"
              class="mt-2 mb-2"
            ></v-divider>
          </div>

          <span v-for="link in links" :key="link.text">
            <span v-if="link.text === 'Terms'" class="mb-2 d-block"> </span>
            <v-btn
              href
              router
              :to="link.link"
              text
              class="text-capitalize px-1"
              small
              >{{ link.text }}</v-btn
            >
          </span>
        </v-list>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchService from '@/services/SearchService'
import {  mapState } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    selectedFile: "",
    drawer: true,
    items: [
      {
        header: null,
        pages: [
          { title: 'Home', link: '/', icon: 'mdi-home' },
          { title: 'Historic', link: '/historic', icon: 'mdi-history' },
        ]
      }
    ],
    links: [
      { text: 'About', link: '#' },
      { text: 'Press', link: '#' },
      { text: 'Copyrignt', link: '#' },
      { text: 'Contact us', link: '#' },
      { text: 'Creators', link: '#' },
      { text: 'Advertise', link: '#' },
      { text: 'Developers', link: '#' },
      { text: 'Terms', link: '#' },
      { text: 'Privacy', link: '#' },
      { text: 'Policy & Safety', link: '#' },
      { text: 'Test new features', link: '#' }
    ],
    channelLength: 0,
    searchText: ''
    // user: null
  }),
  computed: {
    ...mapGetters(['currentUser', 'getUrl', 'isAuthenticated','getToken','getHistoric']),
    ...mapState(["videosnovos"])
  },
  methods: {

    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
       // appending file
    
      axios
        .post("http://localhost:3003/uploadVideo/" + this.$store.getters.getToken, formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    async search() {

      this.$store.dispatch('setHistoric',this.searchText)
      console.log(this.$store.getters.getHistoric);
      
      const videos = await SearchService.search(this.searchText)
        .catch((err) => {
          console.log(err)
        })

      if (typeof videos === 'undefined')
      this.$store.dispatch('setVideos',[])

      if (videos.data.items.length) {
        this.$store.dispatch('setVideos',videos.data.items)
      }else{
        this.$store.dispatch('setVideos',[])
      }

    },
    signOut() {
      this.$store.dispatch('signOut')
      // this.$router.push('/')
    },
    redirectGoogleSignin(){
      location.assign('http://localhost:3003/auth');
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!to.query['search-query'] === '') return
      vm.searchText = to.query['search-query']
    })
  },
  mounted() {

  },
  created() {

    if (!this.isAuthenticated) {
      this.items[2].header = false
      this.items[0].pages.pop()
    }
  }
}
</script>

<style lang="scss">
.v-list-item__avatar {
  justify-content: center !important;
}

.upload-button {
  width: 7rem;
  padding: 0.5rem;
  background-color: #278be9;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 1rem;
}

#showBtn {
  .v-btn__content {
    justify-content: flex-start;

    i {
      margin-right: 30px;
    }
  }
}
#navbar {
  .active-item {
    .v-list-item__icon {
      color: red !important;
    }
  }
  .v-navigation-drawer__border {
    width: 0 !important;
  }

  .vuebar-element {
    height: 250px;
    width: 100%;
    max-width: 500px;
    background: #dfe9fe;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 10px;
    right: 0;
  }



  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;
    transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;

    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .v-navigation-drawer__content:hover .vb > .vb-dragger > .vb-dragger-styler {
    width: 10px;
    background-color: #e0e0e0;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    margin: 0px;
    width: 10px;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
  }
}
</style>
