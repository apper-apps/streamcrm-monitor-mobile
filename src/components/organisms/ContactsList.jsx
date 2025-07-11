import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContactCard from "@/components/molecules/ContactCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { contactsService } from "@/services/api/contactsService";
import { toast } from "react-toastify";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [editingContact, setEditingContact] = useState(null);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactsService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError("Failed to load contacts. Please try again.");
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

const handleSearch = (searchTerm) => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    
    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }
    
    if (!formData.company.trim()) {
      errors.company = "Company is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editingContact) {
        const updatedContact = await contactsService.update(editingContact.Id, formData);
        setContacts(prev => prev.map(contact => 
          contact.Id === editingContact.Id ? updatedContact : contact
        ));
        setFilteredContacts(prev => prev.map(contact => 
          contact.Id === editingContact.Id ? updatedContact : contact
        ));
        toast.success("Contact updated successfully!");
      } else {
        const newContact = await contactsService.create(formData);
        setContacts(prev => [...prev, newContact]);
        setFilteredContacts(prev => [...prev, newContact]);
        toast.success("Contact added successfully!");
      }
      setIsModalOpen(false);
      setFormData({ name: "", email: "", phone: "", jobTitle: "", company: "" });
      setFormErrors({});
      setEditingContact(null);
    } catch (err) {
      toast.error(editingContact ? "Failed to update contact. Please try again." : "Failed to add contact. Please try again.");
      console.error("Error saving contact:", err);
    }
  };

  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      jobTitle: contact.jobTitle || "",
      company: contact.company || ""
    });
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = async (contact) => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        await contactsService.delete(contact.Id);
        setContacts(prev => prev.filter(c => c.Id !== contact.Id));
        setFilteredContacts(prev => prev.filter(c => c.Id !== contact.Id));
        toast.success("Contact deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete contact. Please try again.");
        console.error("Error deleting contact:", err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", phone: "", jobTitle: "", company: "" });
    setFormErrors({});
    setEditingContact(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadContacts} />;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-md">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search contacts..." 
          />
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {filteredContacts.length === 0 ? (
        <Empty
          title="No contacts found"
          description="Get started by adding your first contact to build your customer relationships."
          actionLabel="Add Contact"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
>
              <ContactCard 
                contact={contact} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

<Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingContact ? "Edit Contact" : "Add New Contact"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter full name"
            required
            error={formErrors.name}
          />
          
          <FormField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
            error={formErrors.email}
          />
          
<FormField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
            error={formErrors.phone}
          />
          
          <FormField
            label="Job Title"
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder="Enter job title"
            required
            error={formErrors.jobTitle}
          />
          
          <FormField
            label="Company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Enter company name"
            required
            error={formErrors.company}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
<Button type="submit">
              {editingContact ? "Update Contact" : "Add Contact"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ContactsList;