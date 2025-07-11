import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CompanyCard from "@/components/molecules/CompanyCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { companiesService } from "@/services/api/companiesService";
import { toast } from "react-toastify";

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    phone: ""
  });
const [formErrors, setFormErrors] = useState({});
  const [editingCompany, setEditingCompany] = useState(null);

  const industryOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Finance", label: "Finance" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Retail", label: "Retail" },
    { value: "Education", label: "Education" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Consulting", label: "Consulting" },
    { value: "Other", label: "Other" }
  ];

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await companiesService.getAll();
      setCompanies(data);
      setFilteredCompanies(data);
    } catch (err) {
      setError("Failed to load companies. Please try again.");
      console.error("Error loading companies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
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
      errors.name = "Company name is required";
    }
    
    if (!formData.industry.trim()) {
      errors.industry = "Industry is required";
    }
    
    if (formData.website && !isValidUrl(formData.website)) {
      errors.website = "Please enter a valid website URL";
    }
    
    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
    return phoneRegex.test(phone.trim());
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editingCompany) {
        const updatedCompany = await companiesService.update(editingCompany.Id, formData);
        setCompanies(prev => prev.map(c => c.Id === editingCompany.Id ? updatedCompany : c));
        setFilteredCompanies(prev => prev.map(c => c.Id === editingCompany.Id ? updatedCompany : c));
        toast.success("Company updated successfully!");
      } else {
        const newCompany = await companiesService.create(formData);
        setCompanies(prev => [...prev, newCompany]);
        setFilteredCompanies(prev => [...prev, newCompany]);
        toast.success("Company added successfully!");
      }
      setIsModalOpen(false);
      setFormData({ name: "", industry: "", website: "", phone: "" });
      setFormErrors({});
      setEditingCompany(null);
    } catch (err) {
      toast.error(editingCompany ? "Failed to update company. Please try again." : "Failed to add company. Please try again.");
      console.error("Error saving company:", err);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      industry: company.industry,
      website: company.website || "",
      phone: company.phone || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (company) => {
    if (window.confirm(`Are you sure you want to delete "${company.name}"? This action cannot be undone.`)) {
      try {
        await companiesService.delete(company.Id);
        setCompanies(prev => prev.filter(c => c.Id !== company.Id));
        setFilteredCompanies(prev => prev.filter(c => c.Id !== company.Id));
        toast.success("Company deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete company. Please try again.");
        console.error("Error deleting company:", err);
      }
    }
  };

const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", industry: "", website: "", phone: "" });
    setFormErrors({});
    setEditingCompany(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCompanies} />;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-md">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search companies..." 
          />
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      {filteredCompanies.length === 0 ? (
        <Empty
          title="No companies found"
          description="Start building your business network by adding companies to track and manage."
          actionLabel="Add Company"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
>
              <CompanyCard 
                company={company} 
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
        title={editingCompany ? "Edit Company" : "Add New Company"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Company Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter company name"
            required
            error={formErrors.name}
          />
          
          <FormField
            label="Industry"
            type="select"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="Select industry"
            options={industryOptions}
            required
            error={formErrors.industry}
/>
          
          <FormField
            label="Website"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://example.com"
            error={formErrors.website}
          />
          
          <FormField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            error={formErrors.phone}
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
              {editingCompany ? "Update Company" : "Add Company"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompaniesList;