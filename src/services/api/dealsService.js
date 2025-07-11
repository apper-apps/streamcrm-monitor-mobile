import mockDeals from "@/services/mockData/deals.json";

let deals = [...mockDeals];

export const dealsService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...deals];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return deals.find(deal => deal.Id === id);
  },

  create: async (dealData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newDeal = {
      Id: Math.max(...deals.map(d => d.Id), 0) + 1,
      ...dealData,
      createdAt: new Date().toISOString()
    };
    deals.push(newDeal);
    return newDeal;
  },

  update: async (id, dealData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = deals.findIndex(deal => deal.Id === id);
    if (index !== -1) {
      deals[index] = { ...deals[index], ...dealData };
      return deals[index];
    }
    throw new Error("Deal not found");
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = deals.findIndex(deal => deal.Id === id);
    if (index !== -1) {
      const deletedDeal = deals.splice(index, 1)[0];
      return deletedDeal;
    }
    throw new Error("Deal not found");
  }
};