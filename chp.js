document.addEventListener('DOMContentLoaded', (event) => {
  if (paypal) {

    //Set up the 1 year button
    paypal.Buttons({

      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '325.00'
            },
            description: "1 Year pool membership: Cherryhill Park Pool"
          }]
        });
      },

      //on approve, display the thanks modal populated with info from Paypal.
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          //https://developer.paypal.com/docs/api/orders/v2/#orders_get
          thanks({
            newMember: true,
            name: details.payer.name.given_name,
            email: details.payer.email_address,
            type: 'payment'
          });
        })
      },

      //on error, display the error modal.
      onError: function (err) {
        console.error('paypal order error', err);
        error({
          type: 'payment'
        });
      }

      //render these buttons to the 1-year button area
    }).render('#paypal-1-year');

    //Set up the Donate button.
    const donationButton = document.getElementById('do-donation');

    //display the paypal buttons after the initial 'donate' button is clicked
    donationButton.addEventListener('click', function (event) {
      console.group("donation click");
      const donationInput = document.getElementById('donation');

      //remove the "donate" button from the dom after it was clicked
      event.target.remove();
      donationInput.readOnly = true;
      paypal.Buttons({

        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: donationInput.value
              },
              description: "One time donation: Cherryhill Park Pool"
            }]
          });
        },

        //on approve, display the thanks modal populated with info from Paypal.
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            //https://developer.paypal.com/docs/api/orders/v2/#orders_get
            thanks({
              newMember: false,
              name: details.payer.name.given_name,
              email: details.payer.email_address,
              type: 'donation'
            });
          });
        },

        //on error, display the error modal.
        onError: function (err) {
          console.error('paypal order error', err);
          error({
            type: 'donation'
          });
        }

        //render these buttons to the donation buttons area
      }).render('#paypal-donate');


      console.groupEnd();
    })


  } else {
    //ruh roh
    console.error("paypal not found");
  }
});

/**
 * Populate the innerHtml (or toggle the hidden attribute) of elements.
 * 
 * @param {object} config data to populate the data-dyn elements with
 * @param {*} element root element, with data-dyn elements under
 */
function populateDyn(config, element) {
  element.querySelectorAll('[data-dyn]').forEach(dynElement => {
    const key = dynElement.dataset.dyn;
    const value = config[key];
    console.debug("populating dynamic value", {
      key,
      value,
      dynElement
    })
    if (typeof value == "boolean" && value) {
      dynElement.hidden = false;
    } else {
      dynElement.innerHTML = value;
    }
  });
}

/**
 * Simply display the error modal
 */
function error(config) {
  const errorModal = document.getElementById('error-modal');
  errorModal.classList.add('open');
  populateDyn(config, errorModal);
  const errorClose = document.getElementById('error-close');
  errorClose.addEventListener('click', event => {
    errorModal.classList.remove('open');
  })
}

/**
 * Dispaly the Thanks modal
 */
function thanks(config) {
  const thanksModal = document.getElementById('thanks-modal');
  thanksModal.classList.add('open');
  populateDyn(config, thanksModal);
  const thanksClose = document.getElementById('thanks-close');
  thanksClose.addEventListener('click', event => {
    thanksModal.classList.remove('open');
  })
}
