
// import { createUUID } from '../common/utils/funcStore'
const mixins = {
  data () {
    return {
      PAGING: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      pickerRangeMonth: '',
      pickerThreeRangeMonth: '',
      pickerMinDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime()
          if (maxDate) {
            this.pickerMinDate = ''
          }
        },
        disabledDate: (time) => {
          // 时间最大选择区间为30天，且当前时间不可选择
          if (this.pickerMinDate) {
            const thirtyDay = (30 - 1) * 24 * 3600 * 1000
            let maxTime = this.pickerMinDate + thirtyDay
            const minTime = this.pickerMinDate - thirtyDay
            if (maxTime > new Date()) {
              maxTime = new Date() - 1 * 24 * 3600 * 1000
            }
            return time.getTime() > maxTime || time.getTime() < minTime
          }
          return time.getTime() > Date.now() - 1 * 24 * 3600 * 1000
        }
      },
      monthPickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > new Date(`${this.getLastMonth()}-01`).getTime() // 如果现在是12月，则getLastMonth（）为 2020-11，那么十二月不能选，之后年的月份都不可选
        }
      },
      twelveMonthRangePickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerRangeMonth = (minDate && minDate.getTime()) || (maxDate && maxDate.getTime())
          if (maxDate) {
            this.pickerRangeMonth = ''
          }
        },
        disabledDate: (time) => {
          if (this.pickerRangeMonth) {
            const pickYear1 = 365 * 24 * 3600 * 1000
            const pickYear2 = 330 * 24 * 3600 * 1000
            let maxTime = this.pickerRangeMonth + pickYear1
            const minTime = this.pickerRangeMonth - pickYear2
            if (maxTime > new Date()) {
              maxTime = new Date()
            }
            return (time && time.getTime() >= maxTime) || (time && time.getTime() <= minTime)
          }
          return time && time.getTime() > Date.now()
        }
      },
      threeMonthRangePickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerThreeRangeMonth = (minDate && minDate.getTime()) || (maxDate && maxDate.getTime())
          if (maxDate) {
            this.pickerThreeRangeMonth = ''
          }
        },
        disabledDate: (time) => {
          if (this.pickerThreeRangeMonth) {
            // const pickYear1 = 93 * 24 * 3600 * 1000
            // const pickYear2 = 88 * 24 * 3600 * 1000
            // debugger
            const pickDate = new Date(this.pickerThreeRangeMonth)
            const year = pickDate.getFullYear()
            const month = pickDate.getMonth() + 1
            const day = pickDate.getDate()
            let maxYear = year
            let maxMonth = month + 3
            if (maxMonth > 12) {
              maxYear = year + 1
              maxMonth -= 12
            }
            let minYear = year
            let minMonth = month - 2
            if (minMonth <= 0) {
              minYear = year - 1
              minMonth += 12
            }
            const pickYear1 = new Date(`${maxYear}-${maxMonth}-${day}`).getTime()
            const pickYear2 = new Date(`${minYear}-${minMonth}-${day}`).getTime()

            // month += 3
            // if (month > 12) {
            //   year += 1
            // }
            let maxTime = pickYear1
            const minTime = pickYear2
            if (maxTime > new Date().getTime()) {
              maxTime = new Date().getTime()
            }
            return (time && time.getTime() >= maxTime) || (time && time.getTime() <= minTime)
          }
          return time && time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    _fetchSelectData (...params) {
      return new Promise((resolve, reject) => {
        this.$request.post('/interfacecommon/dropdownlist', { type: arguments[0], optionalDict: arguments[1] }).then(res => {
          if (res) {
            const dropData = res.data || []
            resolve(dropData)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    _getSelectData (type) {
      const option = []
      return new Promise((resolve, reject) => {
        this.$request.post('/promotionconfig/dropdownlist', { type: type }).then(res => {
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
    },
    _isLastPage () {
      const lastPage = Math.ceil(this.PAGING.total / this.PAGING.pageSize)
      // 最后一页的条数
      const lastPageLength = this.PAGING.total % this.PAGING.pageSize
      // 判断当前页是否是最后一页
      if (this.PAGING.pageNum === lastPage) {
        if (this.PAGING.pageNum !== 1) {
          if (lastPageLength === 1) {
            this.PAGING.pageNum--
          }
        }
      }
    },
    // 查询时重置当前页数为1
    _resetPageNum () {
      this.PAGING.pageNum = 1
    },
    // 重置表单
    _resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

export default mixins
