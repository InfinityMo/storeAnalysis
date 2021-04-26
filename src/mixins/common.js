const mixins = {
  data () {
    return {

    }
  },
  methods: {
    getLastMonth () { // 获取上个月日期 格式 2020-12
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month === 0) {
        year = year - 1
        month = 12
      }
      month = month < 10 ? `0${month}` : month
      return year + '-' + month
    },
    _getSelectData (type) {
      const option = []
      return new Promise((resolve, reject) => {
        this.$request.post('/dropdownlist', { type: type }).then(res => {
          if (res) {
            const dropData = res.data || []
            dropData.map((i) => {
              option.push({
                value: i.value,
                label: i.name
              })
            })
            resolve(option)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    _getCascader (level, type) {
      // const option = []
      return new Promise((resolve, reject) => {
        this.$request.post('/channeldropdownlist', { level: level, type: type }).then(res => {
          if (res) {
            const dropData = res.data || []
            // dropData.map((i) => {
            //   option.push({
            //     value: i.value,
            //     label: i.name,
            //     children: i.children && i.children.length > 0 ? this._setChild(i.children) : []
            //   })
            // })
            resolve(dropData)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    _setChild (arr) {
      const child = []
      arr.map(i => {
        child.push({
          value: i.value,
          label: i.name
        })
      })
      return child
    }
  }
}

export default mixins
