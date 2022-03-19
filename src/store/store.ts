import { createSlice, configureStore } from '@reduxjs/toolkit';

//slices
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isOpen: false,
    itemsInCart: 0,
    // initialCartQt: 5,
  },
  reducers: {
    toggleOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    updateCart: (state) => {
      state.itemsInCart++;
    },
    initialCartQt: (state, action) => {
      state.itemsInCart = action.payload;
    },
  },
});
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});
const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

// Slice actions
const cartSliceActions = cartSlice.actions;
const menuSliceActions = menuSlice.actions;
const checkoutSliceActions = checkoutSlice.actions;

//store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    menu: menuSlice.reducer,
    checkout: checkoutSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { cartSliceActions, menuSliceActions, checkoutSliceActions, store };
