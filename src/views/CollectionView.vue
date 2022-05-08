<template>
  <div class="collection">
    <div style="font-size: 1.25rem; margin: 10px">合集：{{ title }}</div>
    <v-row>
      <video-show-elem
        v-for="(item, i) in videoList"
        :key="i"
        :imgurl="$store.state.url + 'image/' + item.id"
        :time="item.time"
        :title="item.title"
        :showtimes="item.playtimes"
        :likes="item.likes"
        :stars="item.stars"
        :isCollection="false"
        @click.native="$router.push('/video/' + item.id)"
      ></video-show-elem>
    </v-row>
    <v-pagination
      v-show="totalLength != 0"
      v-model="page"
      :length="length"
    ></v-pagination>
    <v-row v-show="totalLength == 0" justify="center" style="margin-top: 1rem">
      <v-col cols="12" style="text-align: center">
        <v-icon>mdi-archive</v-icon>合集为空...
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VideoShowElem from "../components/home/VideoShowElem.vue";
import { getStarVideo, getStar, getStarVideoLength } from "../network/star";
export default {
  data: () => ({
    title: " ",
    videoList: [],
    index: -1,
    totalLength: 0,
    page: 1,
    limit: 6,
  }),
  watch: {
    page(val) {
      getStarVideo({
        star_box_id: this.index,
        limit: this.limit,
        offset: this.limit * (val - 1),
      }).then((res) => {
        this.videoList = res.data;
      });
    },
  },
  components: { VideoShowElem },
  mounted() {
    this.index = this.$route.params.index;
    getStarVideo({
      star_box_id: this.index,
      limit: this.limit,
      offset: 0,
    }).then((res) => {
      this.videoList = res.data;
    });
    getStar({ star_box_id: this.index }).then((res) => {
      this.title = res.data.star_box_name;
    });
    getStarVideoLength({ star_box_id: this.index }).then((res) => {
      this.totalLength = res.data.length;
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
