import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Service, T_ServicesListResponse} from "modules/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {saveCustomization} from "store/slices/customizationsSlice.ts";

type T_ServicesSlice = {
    service_name: string
    service: null | T_Service
    services: T_Service[]
}

const initialState:T_ServicesSlice = {
    service_name: "",
    service: null,
    services: []
}

export const fetchService = createAsyncThunk<T_Service, string, AsyncThunkConfig>(
    "fetch_service",
    async function(id) {
        const response = await api.services.servicesRead(id) as AxiosResponse<T_Service>
        return response.data
    }
)

export const fetchServices = createAsyncThunk<T_Service[], object, AsyncThunkConfig>(
    "fetch_services",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.services.servicesList({
            service_name: state.services.service_name
        }) as AxiosResponse<T_ServicesListResponse>

        thunkAPI.dispatch(saveCustomization({
            draft_customization_id: response.data.draft_customization_id,
            services_count: response.data.services_count
        }))

        return response.data.services
    }
)

export const addServiceToCustomization = createAsyncThunk<void, string, AsyncThunkConfig>(
    "services/add_service_to_customization",
    async function(service_id) {
        await api.services.servicesAddToCustomizationCreate(service_id)
    }
)

const servicesSlice = createSlice({
    name: 'services',
    initialState: initialState,
    reducers: {
        updateServiceName: (state, action) => {
            state.service_name = action.payload
        },
        removeSelectedService: (state) => {
            state.service = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchServices.fulfilled, (state:T_ServicesSlice, action: PayloadAction<T_Service[]>) => {
            state.services = action.payload
        });
        builder.addCase(fetchService.fulfilled, (state:T_ServicesSlice, action: PayloadAction<T_Service>) => {
            state.service = action.payload
        });
    }
})

export const { updateServiceName, removeSelectedService} = servicesSlice.actions;

export default servicesSlice.reducer