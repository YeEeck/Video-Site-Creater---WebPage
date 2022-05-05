<template>
  <div class="comment-block">
    <div class="d-flex justify-md-space-between align-center">
      <div class="text-h5 my-3">评论</div>
      <v-dialog v-model="dialog" :width="_isMobile() ? '100%' : '60%'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" v-bind="attrs" v-on="on"
            ><v-icon>mdi-comment</v-icon></v-btn
          >
        </template>

        <v-card>
          <v-card-title class="d-flex">
            <div>评论</div>
            <v-spacer></v-spacer>
            <v-btn
              icon
              color="primary"
              @click="
                sendComment();
                dialog = false;
              "
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-textarea
              filled
              placeholder="在这里输入文字吧~"
              v-model="commentInput"
            ></v-textarea>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <comment-elem
      v-for="(item, i) in commentList"
      :key="i"
      :commentId="item.comment_id"
      :name="item.name"
      :time="item.time"
      :text="item.content"
      :isSelf="item.isSelf"
      v-show="commentLength != 0"
      @updateRequest="updateComment()"
    ></comment-elem>
  </div>
</template>

<script>
import CommentElem from "./CommentBlock/CommentElem.vue";
import { getCommentFromVideo, addComment } from "../../network/comment";
import { getUserInfo } from "../../network/users";
export default {
  data: () => ({
    commentList: [],
    dialog: false,
    commentInput: "",
    commentLength: -1,
  }),
  components: {
    CommentElem,
  },
  props: { index: Number },
  mounted() {
    setTimeout(() => {
      this.updateComment();
    }, 500);
  },
  methods: {
    updateComment() {
      getCommentFromVideo({ video_id: this.index }).then((res) => {
        let data = res.data;
        this.commentLength = data.length;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.user_id == localStorage.getItem("account")) {
            data[index].isSelf = true;
          } else {
            data[index].isSelf = false;
          }
          getUserInfo({ account: element.user_id }).then((res) => {
            data[index].name = res.data.name;
            this.commentList = data;
          });
        }
      });
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    sendComment() {
      addComment({
        video_id: this.index,
        user_id: localStorage.getItem("account"),
        content: this.commentInput,
        response_id: -1,
      }).then((res) => {
        if (res.data.status == 1) {
          this.updateComment();
          this.commentInput = "";
        }
      });
    },
  },
};
</script>
