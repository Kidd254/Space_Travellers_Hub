import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getMissions = createAsyncThunk(
  'missions/getMissions',
  async (thunkApi) => {
    try {
      const response = await axios.get(`${baseUrl}/missions`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  missions: [],
  status: null,
  error: null
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    addReservedMission: (state, action) => {
      const newMissionState = state.missions.map((mission) => {
        if (mission.mission_id === action.payload) {
          return { ...mission, reserved: true };
        }
        return mission;
      });
      state.missions = newMissionState;
    },
    LeaveMission: (state, action) => {
      const newMissionState = state.missions.map((mission) => {
        if (mission.mission_id === action.payload) {
          return { ...mission, reserved: false };
        }
        return mission;
      });
      state.missions = newMissionState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMissions.pending, (state) => {
        if (state.missions.length === 0) state.isLoading = true;
      })
      .addCase(getMissions.fulfilled, (state, action) => {
        if (state.missions.length === 0) {
          state.isLoading = false;
          state.missions = action.payload.map((mission) => ({
            mission_id: mission.mission_id,
            mission_name: mission.mission_name,
            description: mission.description
          }));
        }
      })
      .addCase(getMissions.rejected, (state, action) => {
        if (state.missions.length === 0) {
          state.isLoading = false;
          state.error = action.payload;
        }
      });
  }
});

export const { addReservedMission, LeaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;
