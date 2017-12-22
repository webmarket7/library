<template>
  <svg :width="size + 'px'" :height="size + 'px'" viewBox="0 0 100 100" :stroke="color" @click="toggle()">
    <path :id="!state ? 'burgerA' : 'crossA'"
          d="M 30 40
            L 70 40
            C 90 40 90 75 60 85
            A 40 40 0 0 1 20 20
            L 70 70"/>
    <path :id="!state ? 'burgerB' : 'crossB'"
          d="M 30 50 L 70 50"/>
    <path :id="!state ? 'burgerC' : 'crossC'"
          d="M 70 60
            L 30 60
            C 10 60 10 20 40 15
            A 40 38 0 1 1 20 80
            L 70 30"/>
  </svg>
</template>

<script>
  export default {
    props: ['state', 'color', 'size', 'toggle']
  }
</script>

<style scoped>
  svg {
    display: block;
    fill: transparent;
    stroke-width: 5px;
    cursor: pointer;
  }
  svg #burgerA {
    animation: inA 0.5s ease-in-out forwards;
    stroke-dashoffset: 280;
    stroke-dasharray: 250;
  }
  svg #burgerB {
    animation: inB 0.1s linear forwards;
    stroke-dashoffset: 40;
    stroke-dasharray: 40;
  }
  svg #burgerC {
    animation: inC 0.3s ease-in-out forwards;
    stroke-dashoffset: 310;
    stroke-dasharray: 294;
  }
  svg #crossA {
    animation: outA 0.5s ease-in-out forwards;
    stroke-dashoffset: 710;
    stroke-dasharray: 250;
  }
  svg #crossB {
    animation: outB 0.1s linear forwards 0.1s;
    stroke-dashoffset: 0;
    stroke-dasharray: 40;
  }
  svg #crossC {
    animation: outC 0.3s ease-in-out forwards;
    stroke-dashoffset: 841;
    stroke-dasharray: 294;
  }

  @keyframes inA {
    to {
      stroke-dashoffset: 710;
    }
  }
  @keyframes inB {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes inC {
    to {
      stroke-dashoffset: 841;
    }
  }
  @keyframes outA {
    to {
      stroke-dashoffset: 280;
    }
  }
  @keyframes outB {
    to {
      stroke-dashoffset: 40;
    }
  }
  @keyframes outC {
    to {
      stroke-dashoffset: 310;
    }
  }
</style>
