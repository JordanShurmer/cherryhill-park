if (paypal) {

  //Set up the 1 year button
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '325.00'
          },
          description: "1 Year pool membership: Cherryhill Park Pool"
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        console.info(`payment made by ${details.payer.name.given_name}`);
      })
    }
  }).render('#paypal-1-year');

  //Set up the Donate button.
  const donationButton = document.getElementById('do-donation');
  if (donationButton) {
    donationButton.addEventListener('click', function(event) {
      console.group("donation click");
      const donationInput = document.getElementById('donation');
      const amount = donationInput.value;
      console.debug({event, amount});
      paypal.Buttons({
        createOrder: function(data, action) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              },
              description: "One time donation: Cherryhill Park Pool"
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function (details) {
            console.info(`donation made by ${details.payer.name.given_name}`)
          });
        }
      }).render('#paypal-donate');

      //remove the "donate" button from the dom
      event.target.remove();
      console.groupEnd();
    })

  }

} else {
  console.error("paypal not found");
}
