<template>
  <div class="menu-wrap">
    <!-- logo -->
    <div class="flex-between-center logo-wrap">
      <img class="title"
           src="@/assets/img/system/title.png">
    </div>
    <!-- 菜单区 -->
    <!-- <el-menu :unique-opened="true"
             :router="true"
             :default-active="defaultActive"
             text-color="#fff"
             class="customer-menu">
      <div v-for="(menu,index) in menus"
           :key="index">
        <div v-if="menu.children">
          <el-submenu :index="String(menu.pId)">
            <template slot="title">
              <i class="ststem-icon"
                 :class="menu.icon"></i>
              <span>{{menu.pTitle}}</span>
            </template>
            <el-menu-item v-for="item in menu.children"
                          :index="item.path"
                          :key="item.path"
                          @click.native="menuClick(item.path)">{{item.title}}</el-menu-item>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="String(menu.path)"
                        @click.native="menuClick(menu.pPath)">
            <i class="ststem-icon"
               :class="menu.icon"></i>
            <span slot="title">{{menu.pTitle}}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu> -->
    <el-menu class="customer-menu"
             :router="true"
             :default-active="defaultActive"
             text-color="#fff"
             :unique-opened="true">
      <div v-for="(menu,index) in menus"
           :key="index">
        <div v-if="menu.children">
          <el-submenu :index="menu.pId">
            <template slot="title">
              <icon class="ststem-icon"
                    :type="menu.icon" />
              <span>{{menu.pTitle}}</span>
            </template>
            <el-menu-item v-for="(child,index) in menu.children"
                          :index="child.path"
                          :key="index">{{child.title}}</el-menu-item>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="menu.pPath">
            <icon class="ststem-icon"
                  :type="menu.icon" />
            <span slot="title">{{menu.pTitle}}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters(['menus']),
    defaultActive () {
      const breadArr = []
      this.$route.matched.map((item, idnex) => {
        if (item.meta.title) {
          if (!item.path) {
            item.path = item.redirect
          }
          breadArr.push({
            title: item.meta.title,
            path: item.path
          })
        }
      })
      this.setBreadCurmb(breadArr)
      return this.$route.path
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['setBreadCurmb']),
    menuClick (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../common/styles/iconSet";
.menu-wrap {
  position: fixed;
  top: 0;
  width: 200px;
  height: 100vh;
  background-color: #252836;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;
  .logo-wrap {
    display: flex;
    justify-content: center;
    padding: 0 20px;
    height: 90px;
    .logo {
      width: 60px;
      height: 40px;
    }
    .title {
      width: 144px;
      height: 34px;
    }
  }

  .customer-menu {
    background-color: #252836;
  }
  .el-menu {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>>
