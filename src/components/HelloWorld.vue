<template>
  <div class="hello">
    <h1>hello world</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    console.log('HelloWorld => ', 'created');
  },
  beforeDestroy() {
    console.log('HelloWorld => ', 'beforeDestroy');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
