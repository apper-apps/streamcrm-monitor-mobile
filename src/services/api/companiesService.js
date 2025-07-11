import mockCompanies from "@/services/mockData/companies.json";

let companies = [...mockCompanies];

export const companiesService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...companies];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return companies.find(company => company.Id === id);
  },

  create: async (companyData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newCompany = {
      Id: Math.max(...companies.map(c => c.Id), 0) + 1,
      ...companyData,
      createdAt: new Date().toISOString()
    };
    companies.push(newCompany);
    return newCompany;
  },

  update: async (id, companyData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = companies.findIndex(company => company.Id === id);
    if (index !== -1) {
      companies[index] = { ...companies[index], ...companyData };
      return companies[index];
    }
    throw new Error("Company not found");
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = companies.findIndex(company => company.Id === id);
    if (index !== -1) {
      const deletedCompany = companies.splice(index, 1)[0];
      return deletedCompany;
    }
    throw new Error("Company not found");
  }
};