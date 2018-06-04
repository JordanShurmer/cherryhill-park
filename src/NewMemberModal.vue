<template>
  <div
    class="modal-wrapper"
    :class="{visible}"
  >
    <section
      class="modal"
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
           @click="() => {if (memberName) close()}"
           class="link"
           :class="{ disabled: !memberName }"
        >Send Email</a>
      </div>
    </section>
  </div>
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
        this.$emit('open')
      },
      close() {
        this.visible = false;
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="stylus">

  .modal-wrapper {
    height: 100%
    width: 100%
    left: 0
    top: 0
    position: fixed
    display: none
    background-color: rgba(0, 0, 0, .7)
    &.visible {
      display: block
    }
  }

  .modal {
    height: 100%
    width: 100%
    margin: auto
    background-color: #f5f5f5
    box-shadow: 0 0 10px black
    font-size: 1.2rem
    display: flex
    flex-direction: column

    .header {
      height: 4em
      width: 100%
      background: #e0e0e0
      padding: 0 1em
      box-shadow: 0 1px 5px rgba(0, 0, 0, .2)
      border-top-left-radius: 8px
      border-top-right-radius: 8px
    }

    .footer {
      width: 100%
      background: #e0e0e0
      text-align: center
      border-bottom-left-radius: 8px
      border-bottom-right-radius: 8px

      .link {
        display: inline-block
        width: 100%
        height: 4em
        line-height: 4em
        text-decoration: none

        &.disabled {
          color: #9e9e9e
          cursor: default
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
        margin-bottom: .5em
      }

      .input {
        height: 3em
        padding: 0 6px
        border: 2px solid #bdbdbd
        border-radius: 4px
      }
    }

    @media screen and (min-width: 740px) {
      width: 620px
      height: 70vh
      margin-top: 15vh
      border-radius: 8px
      font-size: 1rem //this will adjust the `em` sizing of the modal as well

    }
  }

</style>
