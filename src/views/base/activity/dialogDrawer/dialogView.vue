<template>
  <el-dialog :title="modalTitle"
             :top="offestTop"
             :destroy-on-close="true"
             :visible.sync="modalShow"
             width="800px"
             :before-close="modalCancel">
    <div class="content-wrap">
      <ul class="info-name">
        <li class="flex"><label>系统名称：</label><span>{{systemInfo.systemName}}</span></li>
        <li class="flex"><label>系统描述：</label><span>{{systemInfo.systemDesc}}</span></li>
        <li class="flex"><label>系统标识：</label><span>{{systemInfo.systemIdent}}</span></li>
        <li class="flex"><label>系统角色：</label>
          <ol class="flex role">
            <li v-for="(item,index) in systemInfo.systemRole"
                :key="index"
                @click="roleClickHandle(item.roleId,item.roleName)">
              <span>{{item.roleName}}</span>
              <i v-show="index!==systemInfo.systemRole.length-1">、</i>
            </li>
          </ol>
        </li>
      </ul>
      <div ref="tree"
           class="tree-chart"></div>
    </div>
    <!-- <div slot="footer"
         class="dialog-footer">
      <el-button @click="modalCancel">取 消</el-button>
      <el-button type="primary"
                 @click="modalConfirm">确 定</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
import tableMixin from '@/mixins/dealTable'
// import echarts from 'echarts'
export default {
  mixins: [tableMixin],
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    offestTop: {
      type: String,
      default: '50px'
    },
    modalShow: {
      type: Boolean,
      required: true,
      default: false
    },
    viewId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      systemInfo: {
        systemName: '联恩小店后台系统',
        systemDesc: '该系统用来管理联恩小店小程序的所有信息，包括商品信息，用户信息，签到信息，积分系统，登陆系统等其他系统',
        systemIdent: '7en423frjuirw2r4232nrewrw',
        systemRole: [
          { roleName: '上传专员', roleId: 1 },
          { roleName: '数据编辑专员', roleId: 2 },
          { roleName: '表格下载专员', roleId: 3 },
          { roleName: '数据查询对比专员', roleId: 4 }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
    // this.$nextTick(() => {
    //   this.createTree()
    // })
  },
  methods: {
    createTree () {
      // eslint-disable-next-line no-unused-vars
      const data2 = [{
        name: '联恩小店后台系统',
        children: [{ // 子集
          name: '系统信息管理',
          children: [{ // 子集
            name: '新增系统',
            children: [{
              name: '测试三级标题'
            }]
          }, { // 子集
            name: '角色编辑'
          }, { // 子集
            name: '系统管理'
          }]
        }, {
          name: '员工管理'
        }, {
          name: '店铺管理'
        }]
      }]
      // const option = {
      //   tooltip: {
      //     trigger: 'item',
      //     triggerOn: 'mousemove'
      //     // formatter: '{a2}: {b}'
      //     // formatter (params) {
      //     //   debugger
      //     // }
      //   },
      //   series: [
      //     {
      //       type: 'tree',
      //       id: 0,
      //       data: data2,
      //       top: '0',
      //       left: '18%',
      //       right: '80',
      //       symbolSize: 7,
      //       edgeShape: 'polyline',
      //       edgeForkPosition: '63%',
      //       initialTreeDepth: 3,
      //       itemStyle: {
      //         color: '#2BB8BD', // 这是节点折叠时候的颜色
      //         borderColor: '#2BB8BD'
      //       },
      //       lineStyle: {
      //         width: 1,
      //         color: '#B3B3B3'
      //       },
      //       label: {
      //         backgroundColor: '#fff',
      //         position: 'left',
      //         verticalAlign: 'middle',
      //         align: 'right'
      //         // rich: {
      //         //   box: {
      //         //     fontSize: 18,
      //         //     height: 50,
      //         //     width: 10,
      //         //     color: '#333',
      //         //     align: 'center'
      //         //   }
      //         // }
      //       },
      //       leaves: {
      //         label: {
      //           position: 'right',
      //           verticalAlign: 'middle',
      //           align: 'left'
      //         }
      //       },
      //       emphasis: {
      //         focus: 'descendant'
      //       },
      //       expandAndCollapse: true,
      //       animationDuration: 550,
      //       animationDurationUpdate: 750
      //     }
      //   ]
      // }
      // const option = {
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{b}'
      //   },
      //   series: [{
      //     type: 'tree',
      //     name: '联恩小店后台系统',
      //     edgeShape: 'polyline', // 链接线是折现还是曲线
      //     edgeForkPosition: '63%',
      //     data: data2,
      //     top: '1%',
      //     left: '20%',
      //     symbolSize: 7,
      //     // initialTreeDepth: 5,
      //     lineStyle: {
      //       color: '#B3B3B3'
      //     },
      //     label: {
      //       position: 'right',
      //       verticalAlign: 'middle',
      //       align: 'left',
      //       // offset: [0, -10],
      //       distance: 10,
      //       fontSize: 14,
      //       // backgroundColor: '#99d97c',
      //       color: '#fff',
      //       padding: 3,
      //       formatter: [
      //         '{box|{b}}'
      //       ].join('\n'),
      //       rich: {
      //         box: {
      //           fontSize: 14,
      //           height: 50,
      //           width: 10,
      //           color: '#333',
      //           padding: [0, 5],
      //           align: 'center'
      //         }
      //       }

      //     },
      //     leaves: {
      //       label: {
      //         position: 'right',
      //         // offset: [40, 0],
      //         verticalAlign: 'middle',
      //         align: 'left',
      //         // backgroundColor: '#f3857c',
      //         formatter: [
      //           '{box|{b}}'
      //         ].join('\n'),
      //         rich: {
      //           box: {
      //             fontSize: 14,
      //             height: 18,
      //             color: '#333',
      //             padding: [0, 5],
      //             align: 'center'
      //           }
      //         }

      //       }
      //     },
      //     expandAndCollapse: true,
      //     animationDuration: 550,
      //     animationDurationUpdate: 750
      //   }
      //   ]
      // }
      // echarts.init(this.$refs.tree).setOption(option)
    },
    roleClickHandle (roleId, roleName) {
      this.$emit('openRoleDrawer', roleId, roleName)
    },
    modalCancel () {
      this.$emit('viewModalCancel')
    }
  }
}
</script>

<style lang="less" scoped>
@import "./systemInfo";
</style>
