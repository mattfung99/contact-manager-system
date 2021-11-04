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
  let idCounter = 0;
  const referenceContactList = document.querySelector('#contacts-list');
  contactList.result.forEach((item) => {
    listContact = document.createElement('li');
    listLink = document.createElement('a');
    listContact.setAttribute('id', ++idCounter);
    listLink.textContent = item.contactFirstname + ' ' + item.contactLastname;
    listLink.setAttribute('href', '/view/' + idCounter);
    listContact.appendChild(listLink);
    referenceContactList.appendChild(listContact);
  });
};

const unlistContacts = () => {
  let unlistContact;
  for (let i = 0; i < contactList.result.length; i++) {
    unlistContact = document.getElementById(i + 1);
    unlistContact.remove();
  }
};
