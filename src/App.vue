<template>
  <div id="app">
    <multi-level-menu :sitename="sitename" :menu="menu"></multi-level-menu>
    <main-page></main-page>
  </div>
</template>

<script>
import multiLevelMenu from './components/multi-level-menu/menu.vue';
import mainPage from './components/main-page.vue'
export default {
  name: 'app',
  data () {
    return {
      sitename: 'Dungeons & Dragons',
      menu: {
        name: 'Главная',
        structure: [
          { id: 'dashboard',
            name: 'Мои персонажи',
            submenu: [
              { id: 'editor',
                name: 'Создать',
                submenu: [
                  {id: '/editor/race', name: 'Раса'},
                  {id: '/editor/general', name: 'Общие'},
                  {id: '/editor/battleclass', name: 'Класс'},
                  {id: '/editor/alignment', name: 'Мировоззрение'},
                  {id: '/editor/religion', name: 'Религия'},
                  {id: '/editor/attributes', name: 'Характеристики'},
                  {id: '/editor/armour', name: 'Доспехи'},
                  {id: '/editor/skills', name: 'Навыки'},
                  {id: '/editor/inventory', name: 'Инвентарь'},
                  {id: '/editor/talents', name: 'Таланты'}
                ]
              },
              { id: 'nadal',
                name: 'Надал'},
            ]
          },
          { id: 'campaigns',
            name: 'Кампании',
            submenu: [
              { id: '/campaigns/new',
                name: 'Создать'},
              { id: '/campaigns/find',
                name: 'Найти'},
              { id: '/campaigns/last',
                name: 'Последние'}
            ]
          },
          { id: 'wiki',
            name: 'Wiki'
          },
        ]
      }
    }
  },
  components: {
    mainPage,
    multiLevelMenu
  }
}
</script>

<style lang="sass">
  @import components/multi-level-menu/config
  .container
    width: calc(100% - #{$menu-width})
    position: absolute
    top: 0
    right: 0
    height: 100vh
    display: flex
    justify-content: center

  .row
    width: 90%

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px)
    .container
      width: 100%
      height: calc(100vh - 50px)
      top: 50px
      left: 0
      display: flex
      justify-content: center

    .row
      width: 90%
</style>
