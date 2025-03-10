import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Service, T_ServiceAddData, T_ServicesListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveCustomization} from "store/slices/customizationsSlice.ts";
import {Service} from "src/api/Api.ts";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {CREATE_SERVICE, FETCH_SERVICE} from "modules/graphql.ts";

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

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

export const fetchService = createAsyncThunk<T_Service, string, AsyncThunkConfig>(
    "fetch_service",
    async function(id) {

        const response = await client.query({
            query: FETCH_SERVICE,
            variables: { "id": parseInt(id) },
        });

        return response.data.service;
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

export const deleteService = createAsyncThunk<T_Service[], string, AsyncThunkConfig>(
    "delete_service",
    async function(service_id) {
        const response = await api.services.servicesDeleteDelete(service_id) as AxiosResponse<T_Service[]>
        return response.data
    }
)

export const updateService = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_service",
    async function({service_id, data}) {
        await api.services.servicesUpdateUpdate(service_id as string, data as Service)
    }
)

export const updateServiceImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_service_image",
    async function({service_id, data}) {
        await api.services.servicesUpdateImageCreate(service_id as string, data as {image?: File})
    }
)

export const updateServiceVideo = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_service_video",
    async function({service_id, data}) {
        await api.services.servicesUpdateVideoCreate(service_id as string, data as {video?: File})
    }
)

export const createService = createAsyncThunk<void, T_ServiceAddData, AsyncThunkConfig>(
    "update_service",
    async function(formData) {
        const data = Object.fromEntries(formData.entries());
        const response = await client.mutate({
            mutation: CREATE_SERVICE,
            variables: {
                "name": data.name,
                "description": data.description,
                "price": parseInt(data.price as string),
            },
        });
        const service_id = response.data.createService.service.id
        await api.services.servicesUpdateImageCreate(service_id, {image: data.image} as {image?: File})
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
        builder.addCase(deleteService.fulfilled, (state:T_ServicesSlice, action: PayloadAction<T_Service[]>) => {
            state.services = action.payload
        });
    }
})

export const { updateServiceName, removeSelectedService} = servicesSlice.actions;

export default servicesSlice.reducer