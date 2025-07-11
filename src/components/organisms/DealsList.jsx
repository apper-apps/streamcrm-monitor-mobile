import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DealCard from "@/components/molecules/DealCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { dealsService } from "@/services/api/dealsService";
import { toast } from "react-toastify";

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    stage: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const stageOptions = [
    { value: "Prospecting", label: "Prospecting" },
    { value: "Qualification", label: "Qualification" },
    { value: "Proposal", label: "Proposal" },
    { value: "Negotiation", label: "Negotiation" },
    { value: "Closed Won", label: "Closed Won" },
    { value: "Closed Lost", label: "Closed Lost" }
  ];

  const loadDeals = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await dealsService.getAll();
      setDeals(data);
      setFilteredDeals(data);
    } catch (err) {
      setError("Failed to load deals. Please try again.");
      console.error("Error loading deals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = deals.filter(deal =>
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.value.toString().includes(searchTerm.toLowerCase())
    );
    setFilteredDeals(filtered);
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
      errors.name = "Deal name is required";
    }
    
    if (!formData.value.trim()) {
      errors.value = "Deal value is required";
    } else if (isNaN(formData.value) || Number(formData.value) <= 0) {
      errors.value = "Please enter a valid positive number";
    }
    
    if (!formData.stage.trim()) {
      errors.stage = "Stage is required";
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
      const dealData = {
        ...formData,
        value: Number(formData.value)
      };
      
      const newDeal = await dealsService.create(dealData);
      setDeals(prev => [...prev, newDeal]);
      setFilteredDeals(prev => [...prev, newDeal]);
      setIsModalOpen(false);
      setFormData({ name: "", value: "", stage: "" });
      setFormErrors({});
      toast.success("Deal added successfully!");
    } catch (err) {
      toast.error("Failed to add deal. Please try again.");
      console.error("Error adding deal:", err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", value: "", stage: "" });
    setFormErrors({});
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDeals} />;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-md">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search deals..." 
          />
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {filteredDeals.length === 0 ? (
        <Empty
          title="No deals found"
          description="Start tracking your sales opportunities by adding deals to your pipeline."
          actionLabel="Add Deal"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDeals.map((deal, index) => (
            <motion.div
              key={deal.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DealCard deal={deal} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Deal"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Deal Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter deal name"
            required
            error={formErrors.name}
          />
          
          <FormField
            label="Deal Value"
            type="number"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            placeholder="Enter deal value"
            required
            error={formErrors.value}
          />
          
          <FormField
            label="Stage"
            type="select"
            name="stage"
            value={formData.stage}
            onChange={handleInputChange}
            placeholder="Select stage"
            options={stageOptions}
            required
            error={formErrors.stage}
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
              Add Deal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DealsList;