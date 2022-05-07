<template>
  <div>
    <div class="d-flex align-baseline">
      <v-text-field
        outlined
        prepend-inner-icon="mdi-magnify"
        v-model="searchText"
      ></v-text-field>
      <v-btn large icon class="ml-2" @click="searchBtnClicked">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
    </div>
    <v-switch
      v-model="complex"
      inset
      label="更好的搜索（找不到想要的视频的话可以试试打开这个选项，但会增加查询耗时）"
      @change="searchBtnClicked"
    ></v-switch>
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
  </div>
</template>

<script>
import { search } from "../network/search";
import VideoShowElem from "../components/home/VideoShowElem.vue";
export default {
  data: () => ({
    content: "",
    videoList: [],
    searchText: "",
    complex: false,
  }),
  components: {
    VideoShowElem,
  },
  mounted() {
    this.content = this.$route.params.content;
    this.searchText = this.content;
    this.complex = this.$route.query.complex == "true" ? true : false;
    search({ content: this.content, complex: this.complex }).then((res) => {
      this.videoList = res.data;
    });
  },
  methods: {
    searchBtnClicked() {
      this.content = this.searchText;
      search({ content: this.content, complex: this.complex }).then((res) => {
        this.videoList = res.data;
      });
    },
  },
};
</script>
