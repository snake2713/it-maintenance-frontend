import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import customizationsReducer from "./slices/customizationsSlice.ts"
import servicesReducer from "./slices/servicesSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        customizations: customizationsReducer,
        services: servicesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;