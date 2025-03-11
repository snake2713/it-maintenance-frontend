import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import servicesReducer from "./slices/servicesSlice.ts"

export const store = configureStore({
    reducer: {
        services: servicesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;