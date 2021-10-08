export const saveContacts = data => {
  try {
    localStorage.setItem('contacts', JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadContacts = () => {
  try {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error(error);
  }
};
