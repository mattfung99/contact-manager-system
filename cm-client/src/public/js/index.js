'use strict';

let contactList;

const getContacts = async () => {
  try {
    await fetch('http://localhost:3000/contact', {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((json) => {
        contactList = json;
        listContacts();
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteContacts = async () => {
  try {
    await fetch('http://localhost:3000/contact', {
      method: 'DELETE'
    }).then((res) => {
      res.json();
      unlistContacts();
    });
  } catch (error) {
    console.log(error);
  }
};

const listContacts = () => {
  let listContact, listLink;
  const referenceContactList = document.querySelector('#contacts-list');
  contactList.result.forEach((item) => {
    listContact = document.createElement('li');
    listLink = document.createElement('a');
    listContact.setAttribute('id', item.contactId);
    listLink.textContent = item.contactFirstname + ' ' + item.contactLastname;
    listLink.setAttribute('href', '/view/' + item.contactId);
    listContact.appendChild(listLink);
    referenceContactList.appendChild(listContact);
  });
};

const unlistContacts = () => {
  contactList.result.forEach((item) => {
    document.getElementById(item.contactId).remove();
  });
};
