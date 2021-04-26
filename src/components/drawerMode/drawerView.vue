<template>
  <div class="drawer-box">
    <ul class="base-info">
      <li>
        <label>商品名称：</label>
        <span>{{baseData.wareName}}</span>
      </li>
      <li>
        <label>商品品牌：</label>
        <span>{{baseData.brandName}}</span>
      </li>
      <li>
        <label>商品类型：</label>
        <span>{{baseData.wareType}}</span>
      </li>
      <li>
        <label>限购数量：</label>
        <span>{{baseData.limitNum}}</span>
      </li>
      <li>
        <label>商品保质期：</label>
        <span>{{baseData.wareDate}}</span>
      </li>
      <li>
        <label>上/下架时间：</label>
        <span>{{baseData.saleTime}}</span>
      </li>
      <li>
        <label>商品描述：</label>
        <span>{{baseData.desc}}</span>
      </li>
    </ul>
    <div class="commdity-pic">
      <p>商品图片：</p>
      <ol class="img-wrap">
        <li v-for="(picItem,index) in pictureArr"
            :key="index">
          <img :src="picItem">
        </li>
      </ol>
    </div>
    <div class="commdity-param">
      <p>商品参数：</p>
      <ul v-for="(commdityItem,index) in commdity"
          :key="index">
        <li>
          <label>商品规格：</label>
          <span>{{commdityItem.size}}</span>
        </li>
        <li>
          <label>生产日期：</label>
          <span>{{commdityItem.date}}</span>
        </li>
        <li>
          <label>商品库存：</label>
          <span>{{commdityItem.stock}}</span>
        </li>
        <li>
          <label>对应价格：</label>
          <span>{{commdityItem.price}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {

  props: {
    commodity: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      baseData: {
        wareName: '悦诗风吟面膜套装', // 商品名称
        brandName: '悦诗风吟', // 品牌名称
        wareType: '护肤', // 商品类型
        wareDate: '一年', // 商品保质期
        limitNum: '5', // 限购数量
        saleTime: '2020-11-22 10:10 ~ 2020-11-23 10:10', // 销售时间
        desc: '套装有两种个批次，价格不同'// 商品描述
      },
      pictureArr: [
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg',
        'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
        'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1141259048,554497535&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771978851,2906984932&fm=26&gp=0.jpg'
      ],
      commdity: [
        {
          size: '女款/红色/S码',
          date: '2020-11-06',
          stock: '200',
          price: '200'
        },
        {
          size: '170g',
          date: '2020-11-08',
          stock: '600',
          price: '888'
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
@import "./drawerView";
</style>
