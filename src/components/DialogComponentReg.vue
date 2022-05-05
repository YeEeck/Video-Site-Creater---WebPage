<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn block plain v-bind="attrs" v-on="on">没有账户？点此注册</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>注册</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-alert type="error" v-show="errorShow"> {{ errorText }} </v-alert>
          <v-text-field
            outlined
            label="用户名/邮箱（登录用的账号）"
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
          <v-text-field
            outlined
            :type="'password'"
            v-model="passwordRe"
            label="确认密码"
            dense
          ></v-text-field>
          <v-text-field
            outlined
            label="名称（显示的姓名）"
            v-model="name"
            dense
          ></v-text-field>
          <v-select
            :items="selectItems"
            label="性别"
            outlined
            dense
            v-model="gender"
          ></v-select>
          <v-btn
            block
            color="primary"
            @click="loginBtnClicked"
            :loading="btnLoading"
            :disabled="btnLoading"
            >注册</v-btn
          >
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { reg } from "../network/users";
export default {
  data: () => ({
    dialog: false,
    account: "",
    password: "",
    passwordRe: "",
    errorShow: false,
    errorText: "",
    btnLoading: false,
    name: "",
    gender: -1,
    selectItems: ["男", "女"],
  }),
  methods: {
    loginBtnClicked() {
      if (this.account == "" || this.password == "" || this.passwordRe == "") {
        this.errorText = "用户名或密码不能为空";
        this.errorShow = true;
        return;
      }
      if (this.password != this.passwordRe) {
        this.errorText = "两次输入的密码不一致";
        this.errorShow = true;
        return;
      }
      if (this.name == "" || this.gender == -1) {
        this.errorText = "请将信息填写完整";
        this.errorShow = true;
        return;
      }
      this.btnLoading = true;
      reg({
        account: this.account,
        password: this.password,
        name: this.name,
        gender: this.gender,
      })
        .then((res) => {
          if (res.data.status == 0) {
            this.errorText = "该用户已存在";
            this.errorShow = true;
          } else {
            localStorage.setItem("account", this.account);
            localStorage.setItem("password", this.password);
            this.errorShow = false;
            this.dialog = false;
            location.reload();
          }
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
  },
};
</script>
