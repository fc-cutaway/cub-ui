<template>
  <li class="indexlist-group">
    <h2>{{data.label}}</h2>
    <ul @click="selectValue">
      <li class="index-value " :data-value="item.value" :data-label="item.label"  v-for="(item,index) in data.items" :key="index">{{item.label}}</li>
    </ul>
  </li>
</template>
<script>
export default {
  data () {
    return {
      name: 'index-group'
    };
  },
  created () {
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  methods: {
    selectValue (e) {
      if (e.target.nodeName === 'LI') {
        let label = e.target.getAttribute('data-label') || '';
        let value = e.target.getAttribute('data-value') || '';
        let returnObj = { label: label, value: value };
        this.$emit('select', returnObj);
      }
    }
  }
};
</script>
