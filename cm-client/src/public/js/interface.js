const display404Error = async () => {
  document.title = pageElements[1].innerHTML = '404 Not Found Error';
  for (let i = 2; i < pageElements.length; i++) {
    pageElements[i].remove();
  }
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
