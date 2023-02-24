import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const apiSlice = createApi({
    name: 'api',
    baseQuery : {
        baseUrl : 'https://localhost:5000'
    },
    endpoints: {},
})

export default apiSlice