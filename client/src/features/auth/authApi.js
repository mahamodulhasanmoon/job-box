
import apiSlice from "../Api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
       register : builder.mutation ({
        query: (data)=>({
           method: "POST",
           url:'/user',
           body: data

        }),
        async onQueryStarted(data,{dispatch,queryFulfilled}){
         try{
            const res = await queryFulfilled
            dispatch(getUser(data.email))

         }catch{
console.log('error')
         }
        }

       })
    })
})

export const {useRegisterMutation} = authApi