'use strict';

let pageElements;
let currContact;
let contactId;

const setupViewContactPage = () => {
  pageElements = [
    document.getElementById('view-contact-title'),
    document.getElementById('view-contact-header'),
    document.getElementById('view-contact-info'),
    document.getElementById('view-return-home'),
    document.getElementById('view-edit-contact'),
    document.getElementById('view-delete-contact')
  ];
  contactId = window.location.href.split('view/').pop();
  getContactById();
};

const deleteContactById = async () => {
  try {
    await fetch(`http://localhost:3000/contact/${contactId}`, {
      method: 'DELETE'
    }).then((res) => {
      res.json();
      document.location.href = '/';
    });
  } catch (error) {
    console.log(error);
  }
};

const displayContactInfo = (contactInfo) => {
  document.title = pageElements[1].innerHTML = `Contact List: ${contactInfo.contactFirstname + ' ' + contactInfo.contactLastname}`;
  document.getElementById('view-first-name').innerHTML = contactInfo.contactFirstname;
  document.getElementById('view-last-name').innerHTML = contactInfo.contactLastname;
  document.getElementById('view-email').innerHTML = contactInfo.contactEmail;
  document.getElementById('view-phone-number').innerHTML = contactInfo.contactPhoneNumber;
  document.getElementById('view-notes').innerHTML = contactInfo.contactNotes.length !== 0 ? contactInfo.contactNotes : '(Empty)';
};

const redirectToEditPage = () => {
  document.location.href = `../edit/${contactId}`;
};
