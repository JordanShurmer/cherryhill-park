function thanks(name, type, email) {
  const nameEl = document.querySelector('#name');
  const typeEl = document.querySelector('#type');
  const emailEl = document.querySelector('#email');


  console.group("modal");
  console.debug("populating element", {nameEl, typeEl, emailEl});
  if (nameEl && typeEl && emailEl) {
    nameEl.innerText = name;
    typeEl.innerText = type;
    emailEl.innerText = email;
  }

  console.debug(`toggling the new members message based on type=${type}`);
  const newMemberSection = document.querySelector('#new-member');
  if (newMemberSection) {
    if ('payment' === type) {
      newMemberSection.style.display = 'block';
    } else {
      newMemberSection.style.display = 'none';
    }
  }

  const modal = document.querySelector('#thanks-modal');
  console.debug("displaying the modal", {modal});
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll'); //disable scrolling

  modal.addEventListener('click', function (event) {
    console.debug("dismissing dialog", {event});
    if (modal === event.target) {
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll') //enable scrolling
    }
  });

  console.groupEnd();
}


if (paypal) {

  //Set up the 1 year button
  const paymentButtons = paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '325.00'
          },
          description: "1 Year pool membership: Cherryhill Park Pool",
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        console.info(`payment made by ${details.payer.name.full_name} <${details.payer.email_address}>`);
        thanks(details.payer.name.full_name || details.payer.name.given_name, 'payment', details.payer.email_address);
        paymentButtons.close();
      })
    }
  });
  paymentButtons.render('#paypal-1-year');

  //Set up the Donate button.
  const donationInput = document.querySelector('input#donation');
  const doDonation = document.querySelector('button#do-donation');

  console.debug({donationInput, doDonation});
  if (doDonation && donationInput) {
    doDonation.addEventListener('click', function (event) {
      console.group("donation button click");
      const amount = donationInput.value;
      console.log({event, amount});
      if (amount && amount > 0) {
        const donationButtons = paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount
                },
                description: "Donation: Cherryhill Park Pool",
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              console.info(`donation made by ${details.payer.name.full_name} <${details.payer.email_address}>`);
              thanks(details.payer.name.full_name || details.payer.name.given_name, 'donation', details.payer.email_address);
              donationButtons.close();
            });
          }
        });
        donationButtons.render('#paypal-donate')
      }
      console.groupEnd();

    })
  }

} else {
  console.error("paypal not found");
}

