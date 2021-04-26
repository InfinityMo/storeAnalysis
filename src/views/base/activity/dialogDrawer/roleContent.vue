<template>
  <div class="drawer-inner-wrap content-wrap">
    <ol class="role-info">
      <li class="flex"><label>名称：</label><span>{{roleData.roleName}}</span></li>
      <li class="flex"><label>说明：</label><span>{{roleData.remark}}</span></li>
    </ol>
    <p class="power">权限：</p>
    <div class="flex thead"><span>菜单</span><span>权限</span></div>
    <ul class="menu">
      <li v-for="(item,index) in menuPowers"
          :key="index"><span>{{item.menu}}</span><span>{{item.powers.join('/')}}</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      roleData: {
        roleName: '上传专员',
        remark: '该角色可对系统所有页面进行编辑，该角色可对系统所有页面进行编辑，该角色可对系统所有页面进行编辑，该角色可对系统所有页面进'
      },
      menuPowers: [{
        menu: '系统信息维护页面',
        powers: ['查看', '编辑', '删除', '上传', '下载', '新增']
      }, {
        menu: '员工信息维护页',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '店铺信息维护',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '类目信息维护',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '系统信息维护页面',
        powers: ['查看', '编辑', '删除', '上传', '下载', '新增']
      }, {
        menu: '员工信息维护页',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '店铺信息维护',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '类目信息维护',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '系统信息维护页面',
        powers: ['查看', '编辑', '删除', '上传', '下载', '新增']
      }, {
        menu: '员工信息维护页',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '店铺信息维护',
        powers: ['查看', '编辑', '删除']
      }, {
        menu: '类目信息维护',
        powers: ['查看', '编辑', '删除']
      }]
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
.content-wrap {
  padding: 0 20px 20px 20px;
  font-size: 14px;
  color: #333;
  overflow: auto;
  .role-info {
    border-bottom: 1px solid #d9d9d9;
    li {
      padding-bottom: 20px;
      line-height: 21px;
      label {
        min-width: 42px;
      }
    }
  }
  .power {
    padding: 20px 0 11px 0;
    line-height: 20px;
  }
  .thead {
    // width: 326px;
    // margin: 0 auto;
    // justify-content: space-between;
    height: 44px;
    padding: 0 20px;
    line-height: 44px;
    background-color: #fafafa;
    box-sizing: border-box;
    span {
      // width: 50%;
    }
    span:first-child {
      width: 60%;
      // padding-left: 20px;
      // width: 184px;
    }
    span:last-child {
      width: 40;
    }
  }
  .menu {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      line-height: 20px;
      border-bottom: 1px solid #eee;
      // span {
      //   width: 50%;
      // }
      span:first-child {
        width: 60%;
      }
      span:last-child {
        width: 40%;
      }
    }
  }
}
</style>
