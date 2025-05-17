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
    tagTypes: ["Hotel", "Booking"], // <-- Add this
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

        getBookingByuserId: builder.query({
          query: (userId) => `bookings/${userId}`,
          providesTags: (result) =>
            result
              ? [...result.map(({ _id }) => ({ type: "Booking", id: _id })), { type: "Booking", id: "LIST" }]
              : [{ type: "Booking", id: "LIST" }],
        }),

        getBookingById: builder.query({
          query: (id) => `bookings/${id}`,
        }),

        deleteBooking: builder.mutation({
          query: (id) => ({
            url: `bookings/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: (result, error, id) => [
            { type: "Booking", id },
            { type: "Booking", id: "LIST" },
          ],
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