<template>
  <transition name="slide">
       <div class="mview-picker" v-show="visible">
    <div class="picker-container">
      <div class="picker-top">
        <span class="picker-cancel" @click="cancelFunc">{{cancelText}}</span>
        <span class="picker-title">{{pickerTitle}}</span>
        <span class="picker-sure" @click="sureFunc">{{sureText}}</span>
      </div>
      <div class="picker-content">
        <div class="picker-columns" :style="pickerColumnsStyle">
          <picker-column @change="change(arguments)" ref="pickerColumn" v-for="(item,index) in pickerData" :key="index" :column="index" :itemHeight="itemHeight" :columnData="item.content"></picker-column>
          <div class="picker-item-masker" :style="itemMaskStyle"></div>
          <div class="picker-frame" :style="pickerFrameStyle"></div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
import PickerColumn from './picker-column.vue';
import { getYear, getMonth, getDay, getToday } from './time.js';
export default {
  props: {
    // 左侧按钮文案
    cancelText: {
      type: String,
      default: '取消'
    },
    // picker的title
    pickerTitle: {
      type: String,
      default: 'picker标题'
    },
    // 右侧按钮文案
    sureText: {
      type: String,
      default: '确定'
    },
    // 是否显示遮罩层
    maskVisible: {
      type: Boolean,
      default: false
    },
    // 控制picker组件是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // 开始时间
    startTime: {
      type: String,
      default: '1997-01-01'
    },
    // 结束时间
    endTime: {
      type: String,
      default: getToday()
    },
    // 当前value
    currentValue: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // picker类型
    pickerType: {
      type: String,
      default: ''
    },
    // picker中数据
    listData: {
      type: Array,
      default: function () {
        return [
          {
            content: [
            ]
          }
        ];
      }
    },
    // 每一行的行高
    itemHeight: {
      type: Number,
      default: 48
    }
  },
  computed: {
    pickerFrameStyle () {
      const style = {};
      style.height = this.itemHeight + 'px';
      return style;
    },
    itemMaskStyle () {
      const style = {};
      style.backgroundSize = `100% ${this.itemHeight * 2}px`;
      return style;
    },
    pickerColumnsStyle () {
      const style = {};
      style.height = this.itemHeight * 5 + 'px';
      return style;
    }
  },
  data () {
    return {
      trigger: true, // 防止触发两次
      name: 'picker组件',
      pickerValueList: [],
      pickerData: this.listData,
      pickerValue: [],
      start: this.startTime,
      end: this.endTime
    };
  },
  watch: {
    // 调起picker时，初始化日期,pickerData,初始化滚动位置
    visible (newVal, oldVal) {
      if (newVal) {
        this.pickerData = this.listData;
        this.start = this.startTime;
        this.end = this.endTime;
        if (this.pickerType === 'time') {
          this.dealTime();
        }
        this.$nextTick(() => {
          this.initScrollDistance();
        });
      }
    }
  },
  methods: {
    /**
     * initScrollDistance 根据传入值；查找pickerData中具体位置
    */
    initScrollDistance () {
      let selectedIndexArr = [];
      // 清空选中的值
      this.pickerValue = [];
      this.currentValue.forEach((item, index) => {
        let selectedIndex = this.pickerData[index].content.indexOf(item);
        selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
        this.pickerValue[index] = this.pickerData[index].content[selectedIndex];
        selectedIndexArr.push(selectedIndex);
        this.pickerValueList = selectedIndexArr;
      });
      // 如果默认选中值为空；则默认值为个列首项
      if (this.currentValue.length === 0) {
        this.pickerData.forEach((item, index) => {
          this.pickerValue[index] = item.content[0];
          this.pickerValueList[index] = 0;
        });
      }
      this.setScrollIndex(selectedIndexArr);
    },
    /**
     * setScrollIndex column滚动到指定位置
    */
    setScrollIndex (selectedIndexArr) {
      this.$refs.pickerColumn.forEach((item, index) => {
        let selectedIndex = selectedIndexArr[index];
        if (selectedIndex == undefined || selectedIndex < 0) {
          selectedIndex = 0;
        }
        item.setIndex(selectedIndex, false);
      });
    },
    /**
     * dealTime 处理pickerType为time时，初始化日期
    */
    dealTime () {
      let start = this.start.split('-');
      let end = this.end.split('-');
      let columnData = [];
      let columnYear = { content: getYear(start[0], end[0]) };
      let columnMonth = { content: getMonth() };
      let columnDay = '';
      let dayParam = this.currentValue;
      if (dayParam.length > 0) {
        columnDay = { content: getDay(dayParam[0], dayParam[1], 1) };
      } else {
        columnDay = { content: getDay(start[0], start[1], 1) };
      }
      columnData.push(columnYear);
      columnData.push(columnMonth);
      columnData.push(columnDay);
      this.pickerData = columnData;
    },
    /**
     * getPickerValue 获取picker中value
    */
    getPickerValue (arr, dataIndex) {
      let value = [];
      for (let i = 0; i < arr.length; i++) {
        value.push(this.pickerData[i].content[arr[i]]);
      }
      // pickerType为time时;滚动停止时;重置日期天数
      if (this.pickerType === 'time') {
        let dayColumn = getDay(value[0], value[1], 1);
        this.pickerData.splice(2, 1, { content: dayColumn });
        if ((Number(dayColumn.length - 1)) < Number(value[2])) {
          this.$refs.pickerColumn[2].setIndex(dayColumn.length - 1, true);
          value[2] = this.pickerData[2].content[dayColumn.length - 1];
        }
      }
      // triger 防止滚动停止时触发两次
      if (this.trigger) {
        this.trigger = false;
        setTimeout(() => {
          this.trigger = true;
        }, 0);
      }
      this.pickerValue = value;
    },
    /**
     * createMask 创建遮罩层
    */
    createMask () {
      let divEl = document.createElement('div');
      if (this.maskVisible) {
        divEl.setAttribute('class', 'picker-masker');
        document.body.appendChild(divEl);
      }
    },
    /**
     * deleteMask 删除遮罩层
    */
    deleteMask () {
      if (this.maskVisible) {
        let maskEl = document.getElementsByClassName('picker-masker')[0];
        if (maskEl) {
          maskEl.remove();
        }
      }
    },
    /**
     * cancelFunc 取消按钮点击事件
    */
    cancelFunc () {
      this.deleteMask();
      this.$emit('close', JSON.parse(JSON.stringify(this.pickerValue)));
    },
    /**
     * sureFunc 确定按钮点击事件
    */
    sureFunc () {
      this.deleteMask();
      this.$emit('sure', JSON.parse(JSON.stringify(this.pickerValue)));
    },
    /**
     * change:传递改变的值
     * data[0]:列数
     * data[1]:行数
    */
    change (data) {
      let columnIndex = data[0];
      let dataIndex = data[1];
      this.pickerValueList[columnIndex] = dataIndex;
      this.getPickerValue(this.pickerValueList, dataIndex);
    },
    /**
     * maskFunc 遮罩层层添加点击事件
    */
    maskFunc () {
      let maskEl = document.getElementsByClassName('picker-masker')[0];
      if (maskEl) {
        maskEl.addEventListener('click', () => {
          this.visible = false;
          this.deleteMask();
          this.$emit('close', JSON.parse(JSON.stringify(this.pickerValue)));
        }, false);
      }
    }
  },
  components: {
    PickerColumn
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/picker.less");
</style>
