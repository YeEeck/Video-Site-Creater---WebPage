<template>
  <div class="home">
    <v-carousel
      cycle
      height="200"
      :show-arrows="false"
      hide-delimiter-background
      show-arrows-on-hover
      delimiter-icon="mdi-minus"
      style="border-radius: 5px"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-img :src="slide" height="100%" />
      </v-carousel-item>
    </v-carousel>
    <div style="font-size: 1.25rem; margin: 10px">最多播放</div>
    <video-show-elem
      v-for="(item, i) in hotVideoList"
      :key="i"
      :imgurl="$store.state.url + 'image/' + item.id"
      :time="'2022-5-3'"
      :title="item.title"
      :showtimes="item.playtimes"
      :likes="item.likes"
      :stars="item.stars"
      @click.native="$router.push('video/' + item.id)"
    ></video-show-elem>
  </div>
</template>

<script>
import { getHotVideoList } from "../network/video";
import VideoShowElem from "../components/home/VideoShowElem.vue";
export default {
  name: "HomeView",
  components: { VideoShowElem },
  data: () => ({
    slides: [
      require("../assets/[UHA-WINGS][Sono Bisque Doll wa Koi wo Suru][05][x264 1080p][CHS].mp4.jpg"),
      require("../assets/[UHA-WINGS][Sono Bisque Doll wa Koi wo Suru][07][x264 1080p][CHS].mp4.jpg"),
      require("../assets/[UHA-WINGS][Sono Bisque Doll wa Koi wo Suru][06][x264 1080p][CHS].mp4.jpg"),
    ],
    hotVideoList: [],
  }),
  mounted() {
    getHotVideoList().then((res) => {
      this.hotVideoList = res.data;
    });
  },
};
</script>
