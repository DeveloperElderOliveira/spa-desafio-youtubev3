<template>
  <v-card
    class="content-bg card mx-auto"
    :max-width="card.maxWidth"
    flat
    tile
    @click="redirectTo"
  >
    <v-img
      :src="video.snippet.thumbnails.medium.url"
    ></v-img>
    <v-row no-gutters>
      <v-col cols="2" v-if="card.type != 'noAvatar'">
        <v-list-item class="pl-0 pt-3" router :to="`/channels/`">
          <v-list-item-avatar>
            <v-img
              v-if="video.snippet.thumbnails.default.url!== 'no-photo.jpg'"
              class="elevation-6"
              :src="video.snippet.thumbnails.default.url"
            ></v-img>
            <v-avatar v-else color="red">
              <span class="white--text headline ">
                {{ video.snippet.channelTitle.split('')[0].toUpperCase() }}</span
              >
            </v-avatar>
          </v-list-item-avatar>
        </v-list-item>
      </v-col>
      <v-col>
        <v-card-title
          class="pl-2 pt-3 subtitle-1 font-weight-bold"
          style="line-height: 1.2rem"
        >
          {{ video.snippet.title }}
        </v-card-title>

        <v-card-subtitle class="pl-2 pb-0">
          {{ video.snippet.channelTitle}}
        </v-card-subtitle>
        <v-card-subtitle class="pl-2 pt-0">
          {{ video.views }} views<v-icon>mdi-circle-small</v-icon
          >{{ dateFormatter(video.snippet.publishedAt) }}
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "VideoCard",
  props: {
    video: {
      type: Object,
      required: true,
    },
    card: Object,
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
    };
  },
  methods: {
    dateFormatter(date) {
      return moment(date).fromNow();
    },
    redirectTo() {
      window.location.href = "https://www.youtube.com.br/watch?v=" + (this.video.id.videoId == undefined ? this.video.id : this.video.id.videoId);
    }
  },
};
</script>

<style></style>
