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
  const donationInput = document.querySelector('input#donation');
  let buttonsInitialized = false;
  let donationAmount = undefined;
  if (donationInput) {
    donationInput.addEventListener('input', function(event) {
      console.group("donation input");
      console.debug({event, "amount": event.target.value});

    })
  }

} else {
  console.error("paypal not found");
}
