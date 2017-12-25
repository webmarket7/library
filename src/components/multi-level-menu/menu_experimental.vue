<template>
  <div class="menu__wrapper">
    <nav class="menu" :class="{'menu_open': state}">
      <section class="menu__header">
        <figure class="menu__logo-wrapper">
          <svg class="menu__logo" viewBox="0 0 60 58">
            <ellipse cx="30" cy="29" rx="27" ry="26"/>
            <line x1="17" y1="14.5" x2="32" y2="29"/>
            <line x1="32" y1="14.5" x2="17" y2="29"/>
          </svg>
          <figcaption class="menu__sitename">{{ sitename }}</figcaption>
        </figure>
      </section>
      <nav class="menu__breadcrumbs">
        <a class="menu__breadcrumb" v-for="(breadcrumb, index) in breadcrumbs"
           @click="goBack(breadcrumb, index)">{{ breadcrumb }}</a>
        <button @click="openSubmenu">openSubmenu</button>
      </nav>
      <section class="menu__itemlist">
        <ul id='topLayer'
            class="menu__level"
            :style="{'z-index': (currentLevel % 2 === 0) ? 3 : 1}">
          <transition-group :name="transitionDirection" mode="in-out">
            <li class="menu__item"
                v-for="(item, index) of topLayer"
                :data-index="index"
                :key="item">
              <a class="menu__link"
                 :class="item.submenu ? 'menu__link_submenu' : item.name === active ? 'menu__link_active' : ''">{{ item }}</a>
            </li>
          </transition-group>
        </ul>
        <ul id='bottomLayer'
            class="menu__level"
            :style="{'z-index': (currentLevel % 2 !== 0) ? 3 : 1}">
          <transition-group :name="transitionDirection" mode="in-out">
            <li class="menu__item"
                data-num="2"
                v-for="(item, index) of bottomLayer"
                :data-index="index"
                :key="item">
              <a class="menu__link"
                 :class="item.submenu ? 'menu__link_submenu' : item.name === active ? 'menu__link_active' : ''">{{ item }}</a>
            </li>
          </transition-group>
        </ul>
      </section>
      {{ topLayer }}
    </nav>
    <div class="mobile__header">
      <menu-button v-if="side === 'left'"
                   :state="state"
                   :size="btn"
                   :color="color"
                   :toggle="toggle"></menu-button>
    </div>
  </div>
</template>

<script>
  import menuButton from './menu-button.vue'
  export default {
    props: ['menu', 'sitename'],
    data() {
      return {
        side: 'left',
        btn: 45,
        color: "#bdbdbd",
        state: false,
        active: '',
        currentPage: '/',
        transitionDirection: 'forward',
        breadcrumbs: [],
        topLayer: [],
        bottomLayer: [],
        currentLevel: 0
      }
    },
    methods: {
      toggle() {
        this.state = !this.state
      },
      openSubmenu() {
        for(let i = 0; i < 5; i++)
        this.topLayer.push(i)
//        this.currentLevel++
      }

    },
    components: {
      'menu-button': menuButton
    },
    created() {
//      this.topLayer = this.menu.structure.slice(0);
      this.topLayer = []
      this.breadcrumbs.push(this.menu.name);
    }
  }
</script>

<style lang="sass" scoped>
  @import config

  .onTop
    z-index: 1000

  %general
    width: $menu-width
    position: fixed
    font-family: 'Scada', sans-serif
    font-weight: 600
    left: 0
    background: $primary-color

  .menu
    @extend %general
    top: 120px
    height: calc(100vh - 120px)

  .menu__header
    @extend %center
    @extend %general
    top: 0
    height: 120px

  .menu__logo-wrapper
    @extend %center
    margin: 0
    height: 100px

  .menu__logo
    width: 60px
    height: 60px
    stroke: $lighter-color
    stroke-miterlimit: 10
    stroke-width: 4px
    fill: none

  .menu__sitename
    color: $lighter-color
    text-transform: uppercase
    font-size: 0.75rem
    font-weight: 600
    letter-spacing: 0.1rem

  .menu__breadcrumbs
    font-size: 0.6rem
    line-height: 1
    position: relative
    padding: 2.5em 3.75em 1.5em 3.5em

    a
      color: $secondary-color
      cursor: pointer
      display: inline-block
      font-weight: bold
      letter-spacing: 1px
      text-decoration: none
      text-transform: uppercase
      vertical-align: middle

      &:last-child
        pointer-events: none

      &:hover
        color: $secondary-hover

      &:not(:last-child)::after
        @extend %arrow
        display: inline-block
        padding: 0 0.5em
        color: $lighter-color

      &:not(:last-child):hover::after
        color: $lighter-color

  .menu__itemlist
    position: absolute
    top: 3.5em
    bottom: 0
    overflow: hidden
    width: 100%

  .menu__level
    position: absolute
    top: 0
    left: 0
    overflow: hidden
    overflow-y: scroll
    width: calc(100% + 50px)
    height: 100%
    margin: 0
    padding: 0
    list-style-type: none

  .menu__item
    display: block
    width: calc(100% - 50px)

  .menu__link
    font-size: 0.9rem
    text-decoration: none
    position: relative
    display: block
    padding: 1em 2.5em 1em 2.5em
    color: #bdbdbd
    -webkit-transition: color 0.1s
    transition: color 0.1s
    cursor: pointer

    &:hover
      color: $secondary-color

      &:after
        color: $secondary-color

    &_active
      &::before
        @extend %dot-circle
        font-size: 0.5rem
        line-height: 0
        position: absolute
        top: 50%
        left: 1rem
        height: 4px
        color: $secondary-color

    &_submenu
      &::after
        @extend %more
        position: absolute
        right: 0
        font-size: 0.9rem
        font-weight: 600
        padding: 0.25em 1.25em
        color: $darker-color
        cursor: pointer

  .mobile__header
    visibility: hidden

  .forward-enter-active, .forward-enter
    animation:
      name: inFromRight
      duration: 600ms
      delay: calc(100ms * attr(data-index))
      timing-function: cubic-bezier(0.7, 0, 0.3, 1)
      fill-mode: forwards

  @-webkit-keyframes inFromRight
    from
      opacity: 0
      -webkit-transform: translate3d(100%, 0, 0)
      transform: translate3d(100%, 0, 0)
    to
      opacity: 1
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)

  @keyframes inFromRight
    from
      opacity: 0
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(100%, 0, 0)
    to
      opacity: 1
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)

  .forward-leave-to
    -webkit-animation: outToLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1)
    animation: outToLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1)

  @-webkit-keyframes outToLeft
    to
      opacity: 0
      -webkit-transform: translate3d(-100%, 0, 0)
      transform: translate3d(-100%, 0, 0)

  @keyframes outToLeft
    to
      opacity: 0
      -webkit-transform: translate3d(-100%, 0, 0)
      transform: translate3d(-100%, 0, 0)

  .back-enter-active, .back-enter
    -webkit-animation: inFromLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1)
    animation: inFromLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1)

  @-webkit-keyframes inFromLeft
    from
      opacity: 0
      -webkit-transform: translate3d(100%, 0, 0)
      transform: translate3d(-100%, 0, 0)
    to
      opacity: 1
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)

  @keyframes inFromLeft
    from
      opacity: 0
      -webkit-transform: translate3d(100%, 0, 0)
      transform: translate3d(-100%, 0, 0)
    to
      opacity: 1
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)

  .back-leave-to
    -webkit-animation: outToRight 0.6s both cubic-bezier(0.7, 0, 0.3, 1)
    animation: outToRight 0.6s both cubic-bezier(0.7, 0, 0.3, 1)


  @-webkit-keyframes outToRight
    to
      opacity: 0
      -webkit-transform: translate3d(100%, 0, 0)
      transform: translate3d(100%, 0, 0)

  @keyframes outToRight
    to
      opacity: 0
      -webkit-transform: translate3d(100%, 0, 0)
      transform: translate3d(100%, 0, 0)

  @media screen and (max-width: 40em)
    .mobile__header
      visibility: visible
      background-color: #000
      height: 50px
      width: 100%
      position: absolute
      top: 0
      left: 0

    .menu
      z-index: 1000
      top: 50px
      width: 100%
      height: 100vh
      -webkit-transform: translate3d(-100%, 0, 0)
      transform: translate3d(-100%, 0, 0)
      -webkit-transition: -webkit-transform 0.3s
      transition: transform 0.3s

    .menu__header
      visibility: hidden

    .menu_open
      -webkit-transform: translate3d(0, 0, 0)
      transform: translate3d(0, 0, 0)
</style>
