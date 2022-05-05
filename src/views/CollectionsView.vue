<template>
  <div class="collection">
    <div style="font-size: 1.25rem; margin: 10px">视频合集</div>
    <v-row>
      <video-show-elem
        v-for="(item, i) in starList"
        :key="i"
        :imgurl="$store.state.url + 'image/' + item.cover_image_id"
        :time="item.time"
        :title="item.star_box_name"
        :showtimes="item.playtimes"
        :likes="item.likes"
        :stars="item.stars"
        :isCollection="true"
        @click.native="$router.push('collection/' + item.star_box_id)"
      ></video-show-elem>
    </v-row>
    <v-pagination v-model="page" :length="length"></v-pagination>
  </div>
</template>

<script>
import VideoShowElem from "../components/home/VideoShowElem.vue";
import { getStarList, getStarListLength } from "../network/star";
export default {
  data: () => ({
    starList: [],
    totalLength: 0,
    page: 1,
    limit: 10,
  }),
  watch: {
    page(val) {
      getStarList({ limit: this.limit, offset: this.limit * (val - 1) }).then(
        (res) => {
          this.starList = res.data;
        }
      );
    },
  },
  components: { VideoShowElem },
  mounted() {
    getStarList({ limit: this.limit, offset: 0 }).then((res) => {
      this.starList = res.data;
      getStarListLength({}).then((res) => {
        this.totalLength = res.data.length;
      });
    });
  },
  computed: {
    length() {
      return Math.ceil(this.totalLength / this.limit);
    },
  },
};
</script>

<style scope></style>
