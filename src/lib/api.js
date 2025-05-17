import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//const BACKEND_URL = "http://localhost:8000";

export const api = createApi({
    baseQuery: fetchBaseQuery({
         reducerPath: "api",
       baseUrl: `${BACKEND_URL}/api/`,
        prepareHeaders: async (headers, { getState }) => {
          const token = await window.Clerk?.session?.getToken();
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
    
          return headers;
        },
      }),
    //query function
    endpoints: (builder)=>({
        getHotels: builder.query({
            query: () => "hotels",
        }),

        getHotelsForSearchQuery: builder.query({
          query: ({ query }) => `hotels/search/retrieve?query=${query}`,
        }),
        getHotelById: builder.query({
            query: (id) => `hotels/${id}`,
        }),
        createHotel : builder.mutation({
            query: (hotel) =>({
                url: "hotels",
                method: "POST",
                body: hotel,
            }),
        }),

        createBooking : builder.mutation({
            query: (booking) =>({
                url: "bookings",
                method: "POST",
                body: booking,
            }),
        }),

        updateBooking: builder.mutation({
            query: ({ id, booking }) => ({
              url: `bookings/${id}`,
              method: "PUT", // Or PATCH depending on your API
              body: booking,
            }),
          }),

        getBookingByUserId: builder.query({
            query: (userId) => `bookings/${userId}`,
            providesTags: (result, error, userId) => [{ type: 'Booking', id: userId }],
          }),


        getBookingById: builder.query({
          query: (id) => `bookings/${id}`,
        }),

       deleteBooking: builder.mutation({
          query: (id) => ({
            url: `bookings/${id}`,
            method: "DELETE",
          }),
          // 👇 You must pass userId to this mutation to invalidate the correct cache
          invalidatesTags: (result, error, { userId }) => [{ type: 'Booking', id: userId }],
        }),

          createCheckoutSession: builder.mutation({
            query: () => ({
              url: `payments/create-checkout-session`,
              method: "POST",
            }),
          }),
          getCheckoutSessionStatus: builder.query({
            query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
          }),
    }),
});

//get -> quey
//put post delete -> mutation
export const {useGetHotelsQuery, useGetHotelByIdQuery, useCreateHotelMutation, useCreateBookingMutation, 
      useGetBookingByuserIdQuery, useDeleteBookingMutation, useUpdateBookingMutation, useGetHotelsForSearchQueryQuery , useGetBookingByIdQuery,  useCreateCheckoutSessionMutation,
      useGetCheckoutSessionStatusQuery,} = api;