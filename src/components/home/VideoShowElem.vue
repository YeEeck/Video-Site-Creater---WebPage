<template>
  <div class="videoBlock">
    <v-responsive :aspect-ratio="16 / 9">
      <img
        class="videoBlock-img"
        height="100%"
        width="100%"
        :src="imgurl"
        alt=""
      />
    </v-responsive>
    <div class="videoBlock-text" v-text="title"></div>
    <div class="videoBlock-text-f-block">
      <div class="videoBlock-text-time" v-text="showtimes + '次播放'"></div>
      <div class="videoBlock-text-time" v-text="likes + ' 赞'"></div>
      <div class="videoBlock-text-time" v-text="stars + ' 收藏'"></div>
      <div class="videoBlock-text-time" v-text="time"></div>
    </div>
  </div>
</template>

<style scope>
.videoBlock {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  transition: all 500ms;

  cursor: pointer;

  margin-bottom: 2rem;
}

.videoBlock:hover {
  color: #9ad0ec;
}
.videoBlock-img {
  object-fit: cover;
  border-radius: 5px;
}
.videoBlock-text {
  padding-top: 10px;

  width: 100%;

  word-wrap: break-word;
  white-space: pre-wrap;
}
.videoBlock-text-time {
  color: gray;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}
.videoBlock-text-f-block {
  display: flex;
}
</style>

<script>
export default {
  props: {
    imgurl: String,
    title: String,
    time: String,
    showtimes: Number,
    likes: Number,
    stars: Number,
  },
};
</script>
