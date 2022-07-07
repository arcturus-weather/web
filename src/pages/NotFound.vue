<template>
  <div class="container fullscreen">
    <!-- 雪景 -->
    <canvas ref="snow" class="snow"></canvas>
    <div class="ground">
      <div class="mound">
        <div class="mound_text">404</div>
        <!-- 铲子 -->
        <div class="mound_spade"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// this page is modified from https://codepen.io/nw/pen/WQmxYY
import { defineComponent, ref, onMounted, Ref } from 'vue';

function makeSnow(el: Ref<HTMLCanvasElement | null>) {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const canvas = el.value;

  const ctx = canvas?.getContext('2d');
  const particles: Particle[] = [];

  class Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;

    constructor() {
      this.x = this.y = this.dx = this.dy = 0;
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.dx = Math.random() - 0.5;
      this.dy = Math.random() * 0.5 + 0.5;
    }
  }

  function updateParticles() {
    ctx?.clearRect(0, 0, width, height);

    if (ctx) {
      ctx.fillStyle = '#f6f9fa';
    }

    particles.forEach((particle) => {
      particle.y += particle.dy;
      particle.x += particle.dx;

      if (particle.y > height) {
        particle.y = 0;
      }

      if (particle.x > width) {
        particle.reset();
        particle.y = 0;
      }

      ctx?.beginPath();
      ctx?.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
      ctx?.fill();
    });

    window.requestAnimationFrame(updateParticles);
  }

  function onResize() {
    // 避免画布模糊
    width = window.innerWidth;
    height = window.innerHeight;
    canvas!.width = width;
    canvas!.height = height;

    createParticles((width * height) / 10000);
  }

  function createParticles(count: number) {
    if (count !== particles.length) {
      particles.length = 0; // clear array
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }
  }

  onResize();
  updateParticles();

  window.addEventListener('resize', onResize);
}

export default defineComponent({
  name: 'notFound',
  setup() {
    const snow = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      makeSnow(snow);
    });

    return { snow };
  },
});
</script>

<style lang="scss" scoped>
$col-sky-top: #bbcfe1;
$col-sky-bottom: #e8f2f6;
$col-fg: #5d7399;
$col-blood: #dd4040;
$col-ground: #f6f9fa;

@mixin trees($direction, $size) {
  $shadow: ();

  @for $i from 1 through 16 {
    $space: $size * 1.2;
    $rand: (random(20) / 10 - 1) * 50px;
    $shadow: append(
      $shadow,
      ($direction * $i * $space + $rand)
        (($direction * -$i * $space) + $rand)
        15px
        lighten($col-fg, random(20) + 10%),
      comma
    );
  }

  box-shadow: $shadow;
}

.container {
  background-color: mix($col-sky-top, $col-sky-bottom);
  background-image: linear-gradient(
    to bottom,
    $col-sky-top 0%,
    $col-sky-bottom 80%
  );
  overflow: hidden;
}

.snow {
  position: absolute;
  pointer-events: none;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 20;
}

.ground {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  background: $col-ground;
  box-shadow: 0 0 10px 10px $col-ground;

  $treeSize: 250px;
  &:before,
  &:after {
    // Trees
    content: '';
    display: block;
    width: $treeSize;
    height: $treeSize;
    position: absolute;
    top: -$treeSize/4;

    z-index: -1;
    background: transparent;
    transform: scaleX(0.2) rotate(45deg);
  }

  &:after {
    left: 50%;
    margin-left: -$treeSize / 1.5;
    @include trees(-1, $treeSize);
  }

  &:before {
    right: 50%;
    margin-right: -$treeSize / 1.5;
    @include trees(1, $treeSize);
  }
}

.mound {
  margin-top: -120px;
  font-weight: 800;
  font-size: 180px;
  text-align: center;
  color: $col-blood;
  pointer-events: none;

  $from-top: 50px;

  &:before {
    $w: 600px;
    $h: 200px;

    content: '';
    display: block;
    width: $w;
    height: $h;
    position: absolute;
    left: 50%;
    margin-left: -$w/2;
    top: $from-top;
    z-index: 1;

    border-radius: 100%;
    background: linear-gradient(
      to bottom,
      lighten($col-sky-top, 10%),
      $col-ground 60px
    );
  }

  &:after {
    $w: 28px;
    $h: 6px;
    content: '';
    display: block;
    width: $w;
    height: $h;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: $from-top + 18px;

    z-index: 2;
    background: $col-blood;
    border-radius: 100%;
    transform: rotate(-15deg);
    box-shadow: -($w * 2) ($h * 2) 0 1px $col-blood,
      -($w * 4.5) ($h) 0 2px $col-blood, -($w * 7) ($h * 4) 0 3px $col-blood;
  }

  .mound_text {
    transform: rotate(6deg);
  }

  .mound_spade {
    $handle-height: 30px;

    display: block;
    width: 35px;
    height: 30px;
    position: absolute;
    right: 50%;
    top: 42%;
    margin-right: -250px;

    z-index: 0;
    transform: rotate(35deg);
    background: $col-blood;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
    }

    &:before {
      width: 40%;
      height: $handle-height;
      bottom: 98%;
      left: 50%;
      margin-left: -20%;
      background: $col-blood;
    }

    &:after {
      width: 100%;
      height: 30px;
      top: -$handle-height - 25px;
      left: 0%;
      box-sizing: border-box;
      border: 10px solid $col-blood;
      border-radius: 4px 4px 20px 20px;
    }
  }
}
</style>
