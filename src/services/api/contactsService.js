import mockContacts from "@/services/mockData/contacts.json";

let contacts = [...mockContacts];

export const contactsService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...contacts];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return contacts.find(contact => contact.Id === id);
  },

  create: async (contactData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newContact = {
      Id: Math.max(...contacts.map(c => c.Id), 0) + 1,
      ...contactData,
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    return newContact;
  },

  update: async (id, contactData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = contacts.findIndex(contact => contact.Id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...contactData };
      return contacts[index];
    }
    throw new Error("Contact not found");
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = contacts.findIndex(contact => contact.Id === id);
    if (index !== -1) {
      const deletedContact = contacts.splice(index, 1)[0];
      return deletedContact;
    }
    throw new Error("Contact not found");
  }
};