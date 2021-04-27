import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import employeeExplorerReducer from '../features/employeeExplorer/employeeExplorerSlice';

export const store = configureStore({
  reducer: {
    employeeExplorer: employeeExplorerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
