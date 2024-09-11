import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  disabledPlants: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, id, category } = action.payload; 
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, id, quantity: 1, category }); 
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    disablePlant: (state, action) => {
      const plantId = action.payload; 
      if (!state.disabledPlants.includes(plantId)) {
        state.disabledPlants.push(plantId);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity, disablePlant } = cartSlice.actions;

export default cartSlice.reducer;