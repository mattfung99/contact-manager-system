'use strict';

let inputFields;
let body;
let currContact;
let contactId;
let pageElements;

const setupEditContactPage = () => {
  contactId = window.location.href.split('edit/').pop();
  pageElements = [
    document.getElementById('edit-contact-title'),
    document.getElementById('edit-contact-header'),
    document.getElementById('edit-contact-info'),
    document.getElementById('edit-required-fields'),
    document.getElementById('edit-update-contact')
  ];
  getContactById();
};

const setupNewContactPage = () => {
  inputFields = [
    document.getElementById('new-first-name').value,
    document.getElementById('new-last-name').value,
    document.getElementById('new-email').value,
    document.getElementById('new-phone-number').value,
    document.getElementById('new-notes').value
  ];
  body = {
    contactFirstname: inputFields[0],
    contactLastname: inputFields[1],
    contactEmail: inputFields[2],
    contactPhoneNumber: inputFields[3],
    contactNotes: inputFields[4]
  };
  validateInputFields(createContact);
};

const setValidateInputFields = () => {
  inputFields = [
    document.getElementById('edit-first-name').value,
    document.getElementById('edit-last-name').value,
    document.getElementById('edit-email').value,
    document.getElementById('edit-phone-number').value,
    document.getElementById('edit-notes').value
  ];
  body = {
    contactFirstname: inputFields[0],
    contactLastname: inputFields[1],
    contactEmail: inputFields[2],
    contactPhoneNumber: inputFields[3],
    contactNotes: inputFields[4]
  };
  validateInputFields(editContact);
};

const validateInputFields = (callFunction) => {
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
    callFunction();
  }
};

const editContact = async () => {
  try {
    await fetch(`http://localhost:3000/contact/${contactId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      res.json();
      document.location.href = `../view/${contactId}`;
    });
  } catch (error) {
    console.log(error);
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

const displayContactInfo = (contactInfo) => {
  document.getElementById('edit-first-name').value = contactInfo.contactFirstname;
  document.getElementById('edit-last-name').value = contactInfo.contactLastname;
  document.getElementById('edit-email').value = contactInfo.contactEmail;
  document.getElementById('edit-phone-number').value = contactInfo.contactPhoneNumber;
  document.getElementById('edit-notes').value = contactInfo.contactNotes;
};
