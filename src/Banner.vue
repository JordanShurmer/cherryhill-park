<template>
</template>

<script>
  export default {
    name: "Banner"
  }
</script>

<style scoped lang="stylus">
  .banner {
    line-height: 0
    width: 100%
    display: flex;
    flex-flow: row wrap

    img {
      width: 100%
      height: 100%
    }

    .large {
      width: 100%
    }

    .small {
      width: 100%
      display: inline-flex
      flex-flow: row wrap
      img {
        width: 50%
      }
    }

    @media screen and (min-width: 740px) {
      max-height: 70vh
      overflow: hidden

      .large {
        height: 70vh
        width: 66%
      }

      .small {
        height: 70vh
        width: 34%
        display: flex
        flex-flow: column nowrap
        justify-content: space-between

        img {
          height: 50%
          width: 100%
        }
      }
    }
  }

</style>
