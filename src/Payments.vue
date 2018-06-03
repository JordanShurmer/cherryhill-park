<template>
  <section class="payments">
    <div class="payment">
      <h3 class="label">1-Year Membership</h3>

      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="TRHWRESM3KEKW">
        <input class="paypal-image" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
               border="0" name="submit"
               alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
    </div>

    <div class="payment">
      <h3 class="label">One Time Donation</h3>

      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="VDUPLSX54BR66">
        <input class="paypal-image" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
               border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>

    </div>

  </section>
</template>

<script>
  import Vue from 'vue'
  import Config from './ConfigMixin.js';

  export default {
    name: "Payments",
    mixins: [Config],
    components: {
      "modal": Vue.extend(
      )
    },
    data() {
      return {
        sent: false,
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">

  .payments
    display: flex
    flex-flow: column nowrap

    .payment
      display: inline-block
      margin-bottom: 1em

      .label
        font-weight: bold

      .paypal-image
        width: 100%
        max-width: 180px
        margin: auto

</style>
