<template>
  <div class="head">
    <div class="head-content flex-item-center">
      <!-- 用户信息 -->
      <div class="flex-item-center user">
        <div><img src="@/assets/img/custom/cat2.jpg"></div>
        <p>欢迎您！Infinity</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="less" scoped>
.head {
  position: fixed;
  left: 200px;
  width: calc(100% - 200px);
  height: 56px;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 2501;
  .head-content {
    justify-content: flex-end;
    height: 100%;
    padding: 0 60px;
    .user {
      div {
        width: 36px;
        height: 36px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      p {
        font-size: 14px;
        margin-left: 10px;
        color: #333;
      }
    }
  }
}
</style>>
