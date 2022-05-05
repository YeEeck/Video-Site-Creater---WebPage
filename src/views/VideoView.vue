<template>
  <div>
    <video class="video-dom" :src="host + 'video/' + index" controls></video>
    <div class="video-title" v-text="title"></div>
    <div class="video-action-group">
      <div
        style="font-size: smaller; color: gray"
        v-text="timeStamp2time(time)"
      ></div>
      <v-spacer></v-spacer>
      <v-chip>{{ playtimes }}次播放</v-chip>
      <v-btn plain :color="isLiked ? 'primary' : ''" @click="likeBtnClicked()"
        ><v-icon>mdi-thumb-up</v-icon>&nbsp;&nbsp;{{ likes }}
      </v-btn>
      <v-btn plain :color="isStard ? 'primary' : ''" @click="starBtnClicked()"
        ><v-icon size="28">mdi-star</v-icon>&nbsp;{{ stars }}
      </v-btn>
    </div>
    <v-divider style="margin-top: 1rem; margin-bottom: 1rem"></v-divider>
    <comment-block :index="parseInt(index)"></comment-block>
  </div>
</template>

<script>
import CommentBlock from "../components/videoView/CommentBlock.vue";
import {
  getVideoInfo,
  playVideo,
  getLike,
  addLike,
  delLike,
} from "../network/video";
import {
  addUserStarVideo,
  delUserStarVideo,
  checkUserStar,
} from "../network/star";
export default {
  data: () => ({
    index: -1,
    host: "",
    title: "",
    time: 0,
    playtimes: 0,
    likes: 0,
    stars: 0,
    isLiked: false,
    isStard: false,
  }),
  components: {
    CommentBlock,
  },
  watch: {
    isLiked() {
      getVideoInfo({ id: this.index }).then((res) => {
        this.likes = res.data.likes;
      });
    },
    isStard() {
      getVideoInfo({ id: this.index }).then((res) => {
        this.stars = res.data.stars;
      });
    },
  },
  mounted() {
    this.index = this.$route.params.index;
    this.host = "http://" + window.location.hostname + ":8880/";
    getVideoInfo({ id: this.index }).then((res) => {
      this.title = res.data.title;
      this.time = res.data.time;
      this.playtimes = res.data.playtimes;
      this.likes = res.data.likes;
      this.stars = res.data.stars;
    });
    playVideo({
      account: localStorage.getItem("account"),
      token: localStorage.getItem("token"),
      id: this.index,
    }).then((res) => {
      if (res.data.status == 444) {
        this.$root.$emit("errorToken");
      }
    });
    getLike({
      account: localStorage.getItem("account"),
      token: localStorage.getItem("token"),
      id: this.index,
    }).then((res) => {
      if (res.data.status == 444) {
        this.$root.$emit("errorToken");
      } else if (res.data.status == 1) {
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
    });
    checkUserStar({
      account: localStorage.getItem("account"),
      token: localStorage.getItem("token"),
      id: this.index,
    }).then((res) => {
      if (res.data.status == 444) {
        this.$root.$emit("errorToken");
      } else if (res.data.status == 1) {
        this.isStard = true;
      } else {
        this.isStard = false;
      }
    });
  },
  methods: {
    timeStamp2time(timeStamp) {
      let date = new Date(parseInt(timeStamp));
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "  " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
    addLikeView() {
      addLike({
        account: localStorage.getItem("account"),
        token: localStorage.getItem("token"),
        id: this.index,
      }).then((res) => {
        if (res.data.status == 444) {
          this.$root.$emit("errorToken");
        } else {
          this.isLiked = true;
        }
      });
    },
    delLikeView() {
      delLike({
        account: localStorage.getItem("account"),
        token: localStorage.getItem("token"),
        id: this.index,
      }).then((res) => {
        if (res.data.status == 444) {
          this.$root.$emit("errorToken");
        } else {
          this.isLiked = false;
        }
      });
    },
    likeBtnClicked() {
      if (this.isLiked) {
        this.delLikeView();
      } else {
        this.addLikeView();
      }
    },
    starBtnClicked() {
      if (this.isStard) {
        this.delUserStarVideoView();
      } else {
        this.addUserStarVideoView();
      }
    },
    addUserStarVideoView() {
      addUserStarVideo({
        account: localStorage.getItem("account"),
        token: localStorage.getItem("token"),
        id: this.index,
      }).then((res) => {
        if (res.data.status == 444) {
          this.$root.$emit("errorToken");
        } else {
          this.isStard = true;
        }
      });
    },
    delUserStarVideoView() {
      delUserStarVideo({
        account: localStorage.getItem("account"),
        token: localStorage.getItem("token"),
        id: this.index,
      }).then((res) => {
        if (res.data.status == 444) {
          this.$root.$emit("errorToken");
        } else {
          this.isStard = false;
        }
      });
    },
  },
};
</script>

<style scope>
.video-dom {
  width: 100%;
}
.video-title {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 1.25rem;
}
.video-action-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
