<template>
  <div class="hello">
    <h1>hello router</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloRouter',
  props: {
    msg: String
  },
  created() {
    console.log('HelloRouter => ', 'created');
  },
  beforeDestroy() {
    console.log('HelloRouter => ', 'beforeDestroy');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
