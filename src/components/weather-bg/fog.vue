<template>
  <!-- 雾天 -->
  <div class="fog-container fog-bg">
    <div class="fog">
      <img src="./fog.svg"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "fog",
};
</script>

<style scoped>
.fog-container {
  width: 100%;
  height: 100%;
}

.fog-bg {
  background: linear-gradient(
    to top right,
    rgba(215, 221, 232, 1) 0%,
    rgb(166, 175, 199) 100%
  );
}

.fog {
  width: 100%;
  opacity: 0.5;
}
</style>