<template>
  <div class="flex-justify-center  forbidden-wrap">
    <div class="forbidden">
      <img src="@/assets/img/base/401.svg">
      <p>对不起，您无权限访问！请联系管理员！</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'forbidden',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.forbidden-wrap {
  height: 100vh;
  background-color: #fff;
  .forbidden {
    padding-top: 100px;
    text-align: center;
    p {
      padding-top: 20px;
      font-size: 18px;
      color: #333;
    }
  }
}
</style>
