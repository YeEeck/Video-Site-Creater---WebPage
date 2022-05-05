<template>
  <div id="app">
    <v-snackbar v-model="snackBarActivite">
      {{ snackBarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackBarActivite = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="navIconClicked">
          <v-icon v-show="!showMenuBtn">mdi-arrow-left</v-icon>
          <v-icon v-show="showMenuBtn">mdi-menu</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="showScanBtn">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list nav dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="require('./assets/user_defalut.jpg')"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ userName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item-group
            style="margin-top: 0.5rem"
            v-model="group"
            @change="drawerGroupBtnClicked"
            active-class="blue lighten-5 text--accent-4"
          >
            <v-list-item>
              <v-icon>mdi-home</v-icon>
              <v-list-item-title class="drawer-list-title"
                >首页</v-list-item-title
              >
            </v-list-item>

            <v-list-item>
              <v-icon>mdi-tag</v-icon>
              <v-list-item-title class="drawer-list-title"
                >分类</v-list-item-title
              >
            </v-list-item>

            <v-list-item>
              <v-icon>mdi-archive</v-icon>
              <v-list-item-title class="drawer-list-title"
                >视频合集</v-list-item-title
              >
            </v-list-item>

            <v-list-item>
              <v-icon>mdi-star</v-icon>
              <v-list-item-title class="drawer-list-title"
                >我的收藏</v-list-item-title
              >
            </v-list-item>

            <v-list-item>
              <v-icon>mdi-message</v-icon>
              <v-list-item-title class="drawer-list-title"
                >消息</v-list-item-title
              >
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-if="!$store.state.logined">
            <dialog-login @loginFinish="loginFinish"></dialog-login>
          </v-list-item>
          <v-list-item v-if="!$store.state.logined">
            <dialog-reg></dialog-reg>
          </v-list-item>
          <v-list-item v-if="$store.state.logined">
            <v-btn block depressed @click="logout"> 退出登录 </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <v-row justify="center">
            <v-col xl="6" lg="6" md="6" sm="12"
              ><router-view></router-view
            ></v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<style>
#app {
  background: rgb(249, 249, 249);
}

.drawer-list-title {
  margin-left: 1rem;
}
</style>

<script>
import { getTitle, login, getUserInfo } from "./network/users";
import { getVideoInfo } from "./network/video";
import { getUserStar } from "./network/star";
import DialogLogin from "./components/DialogComponentLogin.vue";
import DialogReg from "./components/DialogComponentReg.vue";
export default {
  components: { DialogLogin, DialogReg },
  data: () => ({
    title: "",
    drawer: false,
    userName: "你尚未登录",
    routeText: "",
    group: 0,
    showMenuBtn: true,
    snackBarText: "",
    snackBarActivite: false,
    showScanBtn: true,
  }),
  mounted() {
    this.$root.$on("errorToken", function () {
      localStorage.removeItem("account");
      localStorage.removeItem("password");
      localStorage.removeItem("token");
      this.$store.commit("login", false);
      this.$router.push("/");
      location.reload();
    });
    this.$store.commit(
      "setUrl",
      "http://" + window.location.hostname + ":8880/"
    );
    getTitle().then((res) => {
      this.title = res.data;
      document.title = this.title;
    });
    let account = localStorage.getItem("account");
    let password = localStorage.getItem("password");
    if (account != null && password != null) {
      login({ account: account, password: password }).then((res) => {
        if (res.data.status != 1) {
          localStorage.removeItem("account");
          localStorage.removeItem("password");
          localStorage.removeItem("token");
        } else {
          getUserInfo({ account: account }).then((res) => {
            this.userName = res.data.name;
            this.$store.commit("login", true);
          });
          localStorage.setItem("token", res.data.token);
        }
      });
    }
  },
  watch: {
    group(val, old) {
      let then = this;
      if (val == undefined) {
        this.$nextTick(() => {
          then.group = old;
        });
      }
    },
    $route: {
      handler(to) {
        this.routeText = to.path;
        this.showScanBtn = false;
        if (this.routeText == "/") {
          this.group = 0;
          this.showMenuBtn = true;
          this.showScanBtn = true;
          getTitle().then((res) => {
            this.title = res.data;
          });
        } else if (this.routeText.split("/")[1] == "video") {
          this.showMenuBtn = false;
          getVideoInfo({ id: this.routeText.split("/")[2] }).then((res) => {
            this.title = res.data.title;
          });
        } else if (this.routeText == "/collections") {
          this.group = 2;
          this.showMenuBtn = true;
          this.showScanBtn = true;
          getTitle().then((res) => {
            this.title = res.data;
          });
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    navIconClicked() {
      if (this.showMenuBtn) {
        this.drawer = true;
      } else {
        this.$router.push("/");
      }
    },
    drawerGroupBtnClicked() {
      if (this.group == 0) {
        this.$router.push("/");
      } else if (this.group == 2) {
        this.$router.push("/collections");
      } else if (this.group == 3) {
        getUserStar({ account: localStorage.getItem("account") }).then(
          (res) => {
            this.$router.push("/collection/" + res.data.star_box_id);
          }
        );
      }
    },
    loginFinish() {
      location.reload();
    },
    logout() {
      localStorage.removeItem("account");
      localStorage.removeItem("password");
      location.reload();
    },
  },
};
</script>
