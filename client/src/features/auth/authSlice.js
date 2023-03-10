
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState = {

user:{ email : '',
    role:''},
    isLoading : true,
    isError: false,
    error: ''

}

export const createUser = createAsyncThunk("auth/createUser", async ({email,password})=>{

    const data = await createUserWithEmailAndPassword(auth,email,password)
    return data.user.email

} )

export const getUser = createAsyncThunk("auth/getUser", async (email)=>{

    const response =  await fetch(`http://localhost:5000/user/${email}`)
    const data = await  response.json()

    if(data.status){
        return data
    }
   return email
   

} )

export const loginUser = createAsyncThunk('auth/loginuser',async({email,password})=>{
const data = await signInWithEmailAndPassword(auth,email,password)
return data.user.email
})


const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers :{
        logout : (state)=>{
state.user.email = ''
        },


        setUser:(state,{payload})=>{
            state.user.email = payload
            state.isLoading = false
        },
        loadingToggle : (state)=>{state.isLoading = false},
    },
    extraReducers: (builder)=>{

        builder
        .addCase(createUser.pending,(state)=>{
            state.isLoading = true;
            state.isError= false;
            state.error= ''
        })
        .addCase(createUser.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.user.email = payload;
            state.isError= false;
            state.error= ''
        })

        .addCase(createUser.rejected,(state,action)=>{
            state.isLoading = false;
            
            state.isError= true;
            state.error= action.error.message
        })

        // login state management

        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
            state.isError= false;
            state.error= ''
        })
        .addCase(loginUser.fulfilled,(state,{payload})=>{
            console.log(payload)

            state.isLoading = false;
            state.user.email = payload;
            state.isError= false;
            state.error= ''
        })

        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            
            state.isError= true;
            state.error= action.error.message
        })

        // get user from db state management

        .addCase(getUser.pending,(state)=>{
            state.isLoading = true;
            state.isError= false;
            state.error= ''
        })
        .addCase(getUser.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            if(payload.status){
                state.user = payload.data;
            }else{
                state.user.email = payload;  
            }
            
            state.isError= false;
            state.error= ''
        })

        .addCase(getUser.rejected,(state,action)=>{
            state.isLoading = false;
            
            state.isError= true;
            state.error= action.error.message
        })

    },
})
export const {logout,setUser,loadingToggle}= authSlice.actions

export default authSlice.reducer