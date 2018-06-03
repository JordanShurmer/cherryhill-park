<template>
  <section
    class="modal"
    :class="{visible}"
  >
    <div class="header">
      <h1>Email Us</h1>
    </div>
    <div class="body">
      <p>
        Thank You for your payment, and welcome to the Cherryhill Park Pool.
      </p>
      <p>
        In order to get your pool key, please send an email to {{ email }} and coordinate picking up your new key.
      </p>
      <label for="membername">
        Your Name&nbsp;
      </label>
        <input class="input"
               id="membername"
               placeholder="Name"
               type="text"
               v-model="memberName">
    </div>
    <div class="footer">
      <a :href="memberName ? `mailto:${email}?subject=${emailSubject}&body=${emailBody}` : '#'"
         @click="close"
         class="link"
         :class="{ disabled: !memberName }"
      >Send Email</a>
    </div>
  </section>
</template>

<script>
  import ConfigMixin from "./ConfigMixin";

  export default {
    name: "NewMemberModal",
    mixins: [ConfigMixin],
    data() {
      return {
        visible: false,
        memberName: '',
      }
    },
    computed: {
      emailSubject() {
        return encodeURIComponent(`New Pool Member 🏊 ${this.memberName}`)
      },
      emailBody() {
        return encodeURIComponent(`${this.memberName} just joined the pool, and needs a key.`);
      }
    },
    methods: {
      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      }
    }
  }
</script>

<style scoped lang="stylus">

  .modal {
    display: none
    height: 100%
    width: 100%
    left: 0
    top: 0
    position: fixed
    margin: auto
    background-color: #f5f5f5
    box-shadow: 0 0 10px black
    font-size: 1.2rem

    &.visible {
      display: flex
      flex-direction: column
    }

    .header {
      height: 12vh
      width: 100%
      background: #e0e0e0
      padding: 0 1.5em
      box-shadow: 0 1px 5px rgba(0, 0, 0, .2)
    }

    .footer {
      height: 12vh
      width: 100%
      background: #e0e0e0
      text-align: center

      .link {
        height: 12vh
        line-height: 12vh
        text-decoration: none
        font-size: 1.5rem

        &.disabled {
          color: #9e9e9e
        }
      }
    }

    .body {
      padding: 1.5em
      height: 100%
      overflow-y: auto

      label {
        display: block
        width 100%
        font-weight: bold
        margin-bottom: .5rem
      }

      .input {
        height: 3rem
        padding: 0 6px
        border: 2px solid #bdbdbd
        border-radius: 4px
      }
    }
  }

</style>
