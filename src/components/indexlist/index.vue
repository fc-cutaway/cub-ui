<template>
  <div class="mview-indexlist">
    <div ref="wrapper" style="height:626px;overflow:hidden">
      <ul>
        <p class="indexlist-title" v-show="hasTitle">{{title}}</p>
       <index-group @select="select" v-for="(group,index) in data" :key="index" :data="group"/>
      </ul>
    </div>
    <div class="index-list-nav" @touchstart ="navTouchStart" @touchmove.stop.prevent = "navTouchMove" @touchend.stop.prevent="navTouchEnd">
      <ul>
        <li class="index-list-item-nav"  :class="{active:currentIndex ===index}" :data-index="index" v-for="(item,index) in navList" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="showIndex" v-show="showNavIndex && this.navSelectValue">{{this.navSelectValue}}</div>
  </div>
</template>
<script>
import indexGroup from './index-list-group.vue';
import BScroll from 'better-scroll';
export default {
  data () {
    return {
      // data: indexListJson,
      currentIndex: 0,
      showNavIndex: false,
      navSelectValue: ''
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    speed: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  created () {
    this.groupList = [];
    this.listHeight = [];
    this.touch = {};
  },
  watch: {
    data: {
      handler (val, oldVal) {
        this.$nextTick(() => {
          this._calculateHeight();
        });
      }
    }
  },
  computed: {
    navList () {
      return this.data.map(group => {
        return group.label;
      });
    },
    hasTitle () {
      return this.title;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._calculateHeight();
      let wrapper = this.$refs.wrapper;
      this.bscroll = new BScroll(wrapper, {
        probeType: 3,
        click: true,
        scrollX: false
      });
      this.bscroll.on('scroll', this.onScroll);
      this.navSelectValue = this.navList[this.currentIndex];
    });
  },
  methods: {
    /**
     * _caculateTitleHeight 计算每一个索引距离滚动到顶部的距离
    */
    _calculateHeight () {
      this.groupList = document.getElementsByClassName('indexlist-group');
      let height = 0;
      if (this.hasTitle) {
        this.titleHeight = document.getElementsByClassName('indexlist-title')[0].getBoundingClientRect().height;
        height = this.titleHeight;
      }
      this.listHeight.push(height);
      for (let i = 0; i < this.groupList.length; i++) {
        let item = this.groupList[i];
        height += item.getBoundingClientRect().height;
        this.listHeight.push(height);
      }
    },
    navTouchStart (e) {
      const target = e.target;
      const attrBoolean = target.hasAttribute('data-index');
      if (!attrBoolean) {
        return;
      }
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchroIndex = target.getAttribute('data-index');
      this._scrollTo(this.touch.anchroIndex);
      this.navSelectValue = this.navList[this.touch.anchroIndex];
      this.showNavIndex = true;
    },
    navTouchMove (e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let navItemHeight = document.getElementsByClassName('index-list-item-nav')[0].getBoundingClientRect().height;
      let delata = (this.touch.y2 - this.touch.y1) / navItemHeight | 0;
      let anchroIndex = delata + parseInt(this.touch.anchroIndex);
      this.navSelectValue = this.navList[anchroIndex];
      this._scrollTo(anchroIndex);
    },
    navTouchEnd () {
      this.showNavIndex = false;
    },
    /**
     * onScroll监听滚动
    */
    onScroll (ops) {
      let newY = ops.y;
      this.scrollY = ops.y;
      const listHeight = this.listHeight;
      if (this.hasTitle) {
        if (newY > -this.titleHeight) {
          this.currentIndex = 0;
        }
      }
      // mid 介于两个高度之间
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i - 1;
        }
      }
    },
    _scrollTo (index) {
      if (index < 0) {
        index = 0;
      }
      this.bscroll.scrollToElement(this.groupList[index], this.speed);
    },
    /**
     * select 选中的值回调
    */
    select (selectObj) {
      this.$emit('selected', selectObj);
    }
  },
  components: {
    indexGroup
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/indexlist.less");
</style>
