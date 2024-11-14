import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Iorganization } from "../../types/user/organization";
import { Ilocation } from "../../types/user/location";
import { DataStatus, userState } from "../../types/redux/redux";
import { IUser } from "../../types/user/user";

const initialState: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null
}

export const fetchRegister = createAsyncThunk('user/register',
    async (user : {username: string, password: string, 
        organization: string,location:string }, thunkApi) => {
        try {
            console.log(user)
            const res = await fetch("http://localhost:12233/api/user/register", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                thunkApi.rejectWithValue("Can't register, please try again")
            }
            const data = await res.json()
            return data
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

export const fetchLogin = createAsyncThunk('user/login',
    async (user : {username: string, password: string}, thunkApi) => {        
        try {
            const res = await fetch("http://localhost:12233/api/user/login", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                thunkApi.rejectWithValue("Can't login, please try again")
            }
            const data = await res.json()
            localStorage.setItem("Authorization" ,data.token)
            console.log(data);
            return data
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout:(state) => {
            state.user = null
        },
        // tolaunch:(state ,action) => {
        //     console.log(action.payload)
        //     const res  = state.user?.resources.find((res)=> res.name == action.payload) 
        //     res.amount -= 1
        //     console.log(res.amount) 
        // },

    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
      builder.addCase(fetchLogin.pending, (state, action)=>{
          state.status = DataStatus.LOADING
          state.error = null
          state.user = null
      }).addCase(fetchLogin.fulfilled, (state, action)=>{
          state.status = DataStatus.SUCCESS
          state.error = null
          state.user = action.payload as unknown as IUser
      }).addCase(fetchLogin.rejected, (state, action)=>{
          state.status = DataStatus.FAILED
          state.error = action.error as string
          state.user = null
      })
    },
  });

  export default userSlice