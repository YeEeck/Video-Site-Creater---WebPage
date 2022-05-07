<template>
  <div>
    <v-card elevation="3" class="my-4">
      <div ref="card-title" class="d-flex align-center">
        <v-avatar size="64">
          <v-img :src="require('../../../assets/user_defalut.jpg')"></v-img>
        </v-avatar>
        <div class="d-flex flex-column">
          <div class="text-h6" v-text="name"></div>
          <div class="text-caption">
            {{ timeStamp2time(time) }}
          </div>
        </div>
        <v-spacer></v-spacer>

        <v-dialog
          transition="fade-transition"
          v-model="dialog"
          :width="_isMobile() ? '100%' : '30%'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="mr-2" color="grey" v-bind="attrs" v-on="on">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h6 grey lighten-4">
              是否确认要删除该评论？
            </v-card-title>

            <v-card-subtitle class="mt-6"> 该操作将无法恢复。 </v-card-subtitle>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="
                  dialog = false;
                  delCommentView();
                "
              >
                确认删除
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div ref="card-text" class="pa-3 pl-16" v-text="text"></div>
    </v-card>
  </div>
</template>

<script>
import { delComment } from "../../../network/comment";
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    commentId: Number,
    name: String,
    time: Number,
    text: String,
    isSelf: Boolean,
  },
  methods: {
    timeStamp2time(timeStamp) {
      let date = new Date(parseInt(timeStamp));
      let time = [date.getHours(), date.getMinutes(), date.getSeconds()];
      for (let index = 0; index < time.length; index++) {
        const element = time[index];
        if (element < 10) {
          time[index] = "0" + time[index];
        }
      }
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "  " +
        time[0] +
        ":" +
        time[1] +
        ":" +
        time[2]
      );
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    delCommentView() {
      delComment({ comment_id: this.commentId }).then((res) => {
        if (res.data.status == 1) {
          this.$emit("updateRequest");
        }
      });
    },
  },
};
</script>

<style scope></style>
