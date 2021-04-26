import { getLastSevenDay, getLastThirtyDay, prevWeek, prevYear, recentYear, monthSpliceDay } from '../common/utils/timeCalc'
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
    },
    // 处理时间
    timeTypeChange (timeType) {
      this.timeSection = []
      this.searchForm.month = ''
      // this.searchForm.monthRange = ''
      switch (timeType) {
        // 最近7天
        case 1:
          this.timeSection = getLastSevenDay()
          break
        // 上周
        case 2:
          this.timeSection = prevWeek()
          break
        // 默认为当月
        case 3:
          // eslint-disable-next-line no-case-declarations
          const nowDate = new Date()
          // eslint-disable-next-line no-case-declarations
          const year = nowDate.getFullYear()
          // eslint-disable-next-line no-case-declarations
          const month = nowDate.getMonth() + 1 > 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1)
          this.searchForm.month = `${year}-${month}`
          break
        // 最近三十天
        case 4:
          this.timeSection = getLastThirtyDay()
          break
        // 最近一年
        case 5:
          this.timeSection = recentYear()
          break
        // 去年
        case 6:
          this.timeSection = prevYear()
          break
        // 月度范围
        // case 7:
        //   this.timeSection = monthRange()
        //   break
      }
    },
    // 格式化月份时间
    fromatMonth () {
      return monthSpliceDay(this.searchForm.month)
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
    _resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

export default mixins
