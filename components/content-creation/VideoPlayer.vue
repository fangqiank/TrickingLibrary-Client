<template>
  <div class="video-container">
    <div class="player" :class="{ hide: playing }">
      <v-icon large @click.stop="playing = !playing"> mdi-play </v-icon>
    </div>
    <video
      ref="video"
      muted
      loop
      :src="video"
      :poster="thumb"
      preload="none"
      playsinline
    ></video>
    <!-- playsinline: A Boolean attribute indicating that the video is to be played "inline", that is within the element's playback area. Note that the absence of this attribute does not imply that the video will always be played in fullscreen. -->
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",

  data: () => ({
    playing: false,
  }),

  watch: {
    playing: function (v) {
      if (v) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
  },

  props: {
    video: {
      required: true,
      type: String,
    },

    thumb: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  position: relative;
  display: flex;

  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  video {
    width: 100%;
    z-index: 1;

    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .player {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 99;

    &.hide {
      opacity: 0;
    }
  }
}
</style>
