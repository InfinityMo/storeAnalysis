<template>
  <div>
    <!-- 右侧内容区 -->
    <section class="content"
             v-loading="$store.state.spinning"
             element-loading-text="加载中，请稍后..."
             element-loading-background="rgba(0, 0, 0, .6)">
      <Header class="tab-head">
        <div slot="left">1111</div>
      </Header>
      <router-view></router-view>
      <copyright />
    </section>
  </div>
</template>

<script>
import Header from './headLayout'
import copyright from './copyrightLayout'
export default {
  components: {
    Header,
    copyright
  }
}
</script>

<style lang="less" scoped>
.tab-head {
  left: 0;
  width: 100%;
}
</style>
