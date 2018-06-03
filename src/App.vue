<template>
  <div id="app">

    <banner class="the-banner"></banner>

    <div class="body">

      <h1 class="title">Cherryhill Park Pool</h1>

      <div class="content">

        <aside class="aside">
          <h2 class="headline">
            Membership
          </h2>
          <p>
            To pay online for your membership use the PayPal link below, then send us an email and we will coordinate a time and place to get you a pool key.
          </p>
          <p>
            Annual membership dues are $325.
          </p>
          <payments></payments>
        </aside>

        <main class="main">

          <section>
            <h2 class="headline">About</h2>
            <div class="text">
              <p>
                The Cherryhill Park pool includes a diving board, kiddie pool, restrooms, an open grill, and covered
                picnic tables. Open to members from the Cherryhill Park neighborhood in Knoxville, TN and other nearby
                neighborhoods.
              </p>
              <p>
                We are a community pool fully managed and funded by the members of the community.
              </p>
            </div>

            <h3 class="headline">Hours</h3>
            <div class="text">
              <p>
                The pool is open to members Dawn to Dusk.
              </p>
              <p>
                Open during the summer season, typically May through September
              </p>

            </div>

            <h3 class="headline">Location</h3>
            <div class="text">
              <p>
                Cherryhill Park pool is located on Cherrylog rd, just off Pleasant Ridge, near Victor Ashe Park.
              </p>
              <p>
                View on <a
                href="https://www.google.com/maps/place/35%C2%B058'58.0%22N+83%C2%B059'19.4%22W/@35.9827794,-83.9894151,169m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d35.982778!4d-83.9887131"
                target="_blank"
              >
                Google Maps
              </a>
              </p>
              <img class="map"
                   src="https://api.mapbox.com/styles/v1/jshurmer/cjhsjbzew0i542tpkxegqi23b/static/-83.99000,35.98000,13.1,0,0/660x380@2x?access_token=pk.eyJ1IjoianNodXJtZXIiLCJhIjoiY2pkM3dpZ3RwMHA4bTJxcWZnOXd4ZDdzMCJ9.ntCJOHn6dfVJjRhvfEuWpw"
                   alt="area map">
            </div>

          </section>

          <section v-if="$flags.rules">
            <h1>Rules</h1>
            <div class="text">
              <p>
                There is no lifeguard on duty. Swim at your own risk, keeping in mind these rules.
              </p>
              <ul>
                <li>No running around the pool</li>
                <li>Be respectful of others</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 class="headline">Contact Info</h2>
            <div class="text">
              For more information, or to inquire about joining contact us at <a
              href="mailto:cherryhillparkpool@gmail.com">cherryhillparkpool@gmail.com</a>
            </div>
          </section>
        </main>
      </div>
    </div>

    <new-member-modal ref="modal"></new-member-modal>
  </div>
</template>

<script>
  import Banner from "./Banner";
  import Payments from "./Payments";
  import Config from "./ConfigMixin.js";
  import './sitemap.xml'
  import NewMemberModal from "./NewMemberModal"; //add the sitemap so that webpack picks it up

  export default {
    name: 'app',
    mixins: [Config],
    components: {NewMemberModal, Payments, Banner},
    data() {
      return {}
    },
    mounted() {
      if (window.location.hash === '#new-member') {
        this.$refs.modal.open();
      }
    }
  }
</script>

<style lang="stylus">
  #app
    position: relative
    top: 0
    left: 0
    margin-bottom: 5vh
    width: 100%
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    background-color white
    color: #2c3e50

  h1, h2
    font-weight: normal

  a
    color: #2196f3

  .the-banner
    margin-bottom: 1em

  .body
    width: 95%
    margin: auto

    .content
      display: flex
      flex-flow: column nowrap

      .main
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2)
        padding: 0 .5em .5em

      .aside
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2)
        padding: 0 .5em
        margin-bottom: 1em

      .map
        width: 100%

    @media screen and (min-width: 740px)
      width: 90%

      .content
        flex-direction: row-reverse
        justify-content: space-around

        .main
          margin-right: 2em
          padding: 0 1.5em 1.5em
        .aside
          padding: 0 1.5em 1.5em
          max-width: 26%
          margin-bottom: 0

  button.flat {
    outline: none;
    margin: 0;
    background: #e0e0e0;
    cursor: pointer;
    border: 0;
    padding: .4em .8em;
    text-rendering: optimizeLegibility;
    font-size: inherit;
    font-family: inherit;
    font-weight: 300;
    color: inherit
  }

  button.flat:hover,
  button.flat.hover {
    background: #e6e6e6
  }

  button.flat:active,
  button.flat.active {
    background: #d6d6d6
  }

</style>
