'use strict';

let inputFields;
let body;

const setupNewContactPage = () => {
  inputFields = [
    document.getElementById('first-name').value,
    document.getElementById('last-name').value,
    document.getElementById('email').value,
    document.getElementById('phone-number').value,
    document.getElementById('notes').value
  ];
  body = {
    contactFirstname: inputFields[0],
    contactLastname: inputFields[1],
    contactEmail: inputFields[2],
    contactPhoneNumber: inputFields[3],
    contactNotes: inputFields[4]
  };
  validateInputFields();
};

const validateInputFields = () => {
  const emailFormat = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  const phoneNumberFormat = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
  if (inputFields[0].length === 0 || inputFields[1].length === 0) {
    alert('Fill in required fields!');
    return;
  } else if (!emailFormat.test(inputFields[2])) {
    alert('Invalid email!');
    return;
  } else if (!phoneNumberFormat.test(inputFields[3])) {
    alert('Invalid phone number! Phone number must be in XXX-XXX-XXXX format');
    return;
  } else {
    createContact();
  }
};

const createContact = async () => {
  try {
    await fetch('http://localhost:3000/contact', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      res.json();
      document.location.href = '/';
    });
  } catch (error) {
    console.log(error);
  }
};
