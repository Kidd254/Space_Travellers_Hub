import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getRockets = createAsyncThunk(
    'rockets/getRockets',
    async (thunkApi) => {
        try {
            const response = await axios.get(`${baseUrl}/rockets`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    rockets: [],
    status: null,
    error: null,
};

const rocketsSlice = createSlice({
    name: 'rockets',
    initialState,
    reducers: {
        addReservedRocket: (state, action) => {
          const newRocketState = state.rockets.map((rocket) => {
            if (rocket.rocket_id === action.payload) {
              return { ...rocket, reserved: true };
            }
            return rocket;
          });
          state.rockets = newRocketState;
        },
        LeaveRocket: (state, action) => {
          const newRocketState = state.rockets.map((rocket) => {
            if (rocket.rocket_id === action.payload) {
              return { ...rocket, reserved: false };
            }
            return rocket;
          });
          state.rockets = newRocketState;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(getRockets.pending, (state) => {
            if (state.rockets.length === 0) state.isLoading = true;
          })
          .addCase(getRockets.fulfilled, (state, action) => {
            if (state.rockets.length === 0) {
              state.isLoading = false;
              state.rockets = action.payload.map((rocket) => (
                {
                  rocket_id: rocket.rocket_id,
                  rocket_name: rocket.rocket_name,
                  description: rocket.description,
                }
              ));
            }
          })
          .addCase(getRockets.rejected, (state, action) => {
            if (state.rockets.length === 0) {
              state.isLoading = false;
              state.error = action.payload;
            }
          });
      },
    });

export const { addReservedRocket, LeaveRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;