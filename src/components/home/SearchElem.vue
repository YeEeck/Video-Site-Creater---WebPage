<template>
  <v-dialog v-model="dialog" width="500" transition="fade-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-if="showScanBtn" v-bind="attrs" v-on="on">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>

    <v-card class="pa-6 pb-0 pr-2">
      <div class="d-flex align-baseline">
        <v-text-field
          filled
          dense
          clearable
          prepend-inner-icon="mdi-magnify"
          v-model="searchInputText"
        ></v-text-field>
        <v-btn large icon class="ml-2" @click="searchBtnClicked">
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
      </div>
      <v-switch
        v-model="complex"
        inset
        label="更好的搜索（找不到想要的视频的话可以试试打开这个选项，但会增加查询耗时）"
      ></v-switch>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    searchInputText: "",
    complex: false,
  }),
  props: {
    showScanBtn: Boolean,
  },
  methods: {
    searchBtnClicked() {
      this.$router.push({
        path: "/search/" + this.searchInputText,
        query: {
          complex: this.complex,
        },
      });
    },
  },
};
</script>
