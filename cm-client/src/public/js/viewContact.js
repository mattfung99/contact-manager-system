'use strict';

let pageElements;
let currContact;
let contactId;

const setupNewContactPage = () => {
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

const getContactById = async () => {
  try {
    await fetch(`http://localhost:3000/contact/${contactId}`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((json) => {
        currContact = json;
        if (currContact.result.length === 0) {
          display404Error();
        } else {
          displayContactInfo(currContact.result[0]);
        }
      });
  } catch (error) {
    console.log(error);
  }
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
  document.getElementById('view-first-name').innerHTML = contactInfo.contactFirstname;
  document.getElementById('view-last-name').innerHTML = contactInfo.contactLastname;
  document.getElementById('view-email').innerHTML = contactInfo.contactEmail;
  document.getElementById('view-phone-number').innerHTML = contactInfo.contactPhoneNumber;
  document.getElementById('view-notes').innerHTML = contactInfo.contactNotes.length !== 0 ? contactInfo.contactNotes : '(Empty)';
};

const display404Error = async () => {
  document.title = pageElements[1].innerHTML = '404 Not Found Error';
  for (let i = 2; i < pageElements.length; i++) {
    pageElements[i].remove();
  }
};
