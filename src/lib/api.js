import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const BACKEND_URL = "http://localhost:8000";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://aidf-horizone-backend-isuru.onrender.com/api",
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
        getHotelById: builder.query({
            query: (id) => `hotels/${id}`,
        }), 

        getHotelsForSearchQuery: builder.query({
            query: ({ query }) => `hotels/search/retrieve?query=${query}`,
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
        }), 

        deleteBooking: builder.mutation({
            query: (id) => ({
              url: `bookings/${id}`,
              method: "DELETE",
            }),
          }),
    }),
});

//get -> quey
//put post delete -> mutation
export const {useGetHotelsQuery, useGetHotelByIdQuery, useCreateHotelMutation, useCreateBookingMutation, 
      useGetBookingByuserIdQuery, useDeleteBookingMutation, useUpdateBookingMutation, useGetHotelsForSearchQueryQuery} = api;