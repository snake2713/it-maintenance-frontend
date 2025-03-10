import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {E_CustomizationStatus, T_Customization, T_CustomizationsFilters, T_Service} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_CustomizationsSlice = {
    draft_customization_id: number | null,
    services_count: number | null,
    customization: T_Customization | null,
    customizations: T_Customization[],
    filters: T_CustomizationsFilters,
    save_mm: boolean
}

const initialState:T_CustomizationsSlice = {
    draft_customization_id: null,
    services_count: null,
    customization: null,
    customizations: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchCustomization = createAsyncThunk<T_Customization, string, AsyncThunkConfig>(
    "customizations/customization",
    async function(customization_id) {
        const response = await api.customizations.customizationsRead(customization_id) as AxiosResponse<T_Customization>
        return response.data
    }
)

export const fetchCustomizations = createAsyncThunk<T_Customization[], object, AsyncThunkConfig>(
    "customizations/customizations",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.customizations.customizationsList({
            status: state.customizations.filters.status,
            date_formation_start: state.customizations.filters.date_formation_start,
            date_formation_end: state.customizations.filters.date_formation_end
        }) as AxiosResponse<T_Customization[]>

        return response.data.filter(customization => customization.owner.includes(state.customizations.filters.owner))
    }
)

export const removeServiceFromDraftCustomization = createAsyncThunk<T_Service[], string, AsyncThunkConfig>(
    "customizations/remove_service",
    async function(service_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.customizations.customizationsDeleteServiceDelete(state.customizations.customization.id, service_id) as AxiosResponse<T_Service[]>
        return response.data
    }
)

export const deleteDraftCustomization = createAsyncThunk<void, object, AsyncThunkConfig>(
    "customizations/delete_draft_customization",
    async function(_, {getState}) {
        const state = getState()
        await api.customizations.customizationsDeleteDelete(state.customizations.customization.id)
    }
)

export const sendDraftCustomization = createAsyncThunk<void, object, AsyncThunkConfig>(
    "customizations/send_draft_customization",
    async function(_, {getState}) {
        const state = getState()
        await api.customizations.customizationsUpdateStatusUserUpdate(state.customizations.customization.id)
    }
)

export const updateCustomization = createAsyncThunk<void, object, AsyncThunkConfig>(
    "customizations/update_customization",
    async function(data, {getState}) {
        const state = getState()
        await api.customizations.customizationsUpdateUpdate(state.customizations.customization.id, {
            ...data
        })
    }
)

export const updateServiceValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "customizations/update_mm_value",
    async function({service_id, guarantee},thunkAPI) {
        const state = thunkAPI.getState()
        await api.customizations.customizationsUpdateServiceUpdate(state.customizations.customization.id, service_id, {guarantee})
    }
)

export const acceptCustomization = createAsyncThunk<void, string, AsyncThunkConfig>(
    "customizations/accept_customization",
    async function(customization_id,{dispatch}) {
        await api.customizations.customizationsUpdateStatusAdminUpdate(customization_id, {status: E_CustomizationStatus.Completed})
        await dispatch(fetchCustomizations)
    }
)

export const rejectCustomization = createAsyncThunk<void, string, AsyncThunkConfig>(
    "customizations/accept_customization",
    async function(customization_id,{dispatch}) {
        await api.customizations.customizationsUpdateStatusAdminUpdate(customization_id, {status: E_CustomizationStatus.Rejected})
        await dispatch(fetchCustomizations)
    }
)

const customizationsSlice = createSlice({
    name: 'customizations',
    initialState: initialState,
    reducers: {
        saveCustomization: (state, action) => {
            state.draft_customization_id = action.payload.draft_customization_id
            state.services_count = action.payload.services_count
        },
        removeCustomization: (state) => {
            state.customization = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomization.fulfilled, (state:T_CustomizationsSlice, action: PayloadAction<T_Customization>) => {
            state.customization = action.payload
        });
        builder.addCase(fetchCustomizations.fulfilled, (state:T_CustomizationsSlice, action: PayloadAction<T_Customization[]>) => {
            state.customizations = action.payload
        });
        builder.addCase(removeServiceFromDraftCustomization.rejected, (state:T_CustomizationsSlice) => {
            state.customization = null
        });
        builder.addCase(removeServiceFromDraftCustomization.fulfilled, (state:T_CustomizationsSlice, action: PayloadAction<T_Service[]>) => {
            if (state.customization) {
                state.customization.services = action.payload as T_Service[]
            }
        });
        builder.addCase(sendDraftCustomization.fulfilled, (state:T_CustomizationsSlice) => {
            state.customization = null
        });
    }
})

export const { saveCustomization, removeCustomization, triggerUpdateMM, updateFilters } = customizationsSlice.actions;

export default customizationsSlice.reducer