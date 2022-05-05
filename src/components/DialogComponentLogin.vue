<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn block depressed v-bind="attrs" v-on="on">登录</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>登录</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-alert type="error" v-show="errorShow"> 用户名或密码错误 </v-alert>
          <v-text-field
            outlined
            label="用户名/邮箱"
            v-model="account"
            dense
          ></v-text-field>
          <v-text-field
            outlined
            :type="'password'"
            v-model="password"
            label="密码"
            dense
          ></v-text-field>
          <v-btn
            block
            color="primary"
            @click="loginBtnClicked"
            :loading="btnLoading"
            :disabled="btnLoading"
            >登录</v-btn
          >
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { login } from "../network/users";
export default {
  data: () => ({
    dialog: false,
    account: "",
    password: "",
    errorShow: false,
    btnLoading: false,
  }),
  methods: {
    loginBtnClicked() {
      this.btnLoading = true;
      login({ account: this.account, password: this.password })
        .then((res) => {
          if (res.data.status == 0) {
            this.errorShow = true;
          } else {
            this.errorShow = false;
            localStorage.setItem("account", this.account);
            localStorage.setItem("password", this.password);
            localStorage.setItem("token", res.data.token);
            this.$emit("loginFinish");
            this.dialog = false;
          }
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
  },
};
</script>
