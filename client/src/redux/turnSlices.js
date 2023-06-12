//RTK query sirve para manejar estados haciendo llamass apis evinyando usar thunks etc, lo que reduce la cantidad de codigos

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const turnSlices = createApi({
  reducerPath: 'turnosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}api`,
    
  }),
  endpoints: (build) => ({
    //funcion que devuelve un objeto //el builder permite definir cuales son las peticiones que traen datos(query)=>(get) y las que mutas datos (mutaciones)=>(put/delete/post)
    getTurns: build.query({
      query: () => `/turn`,
      providesTags: ['Turns'], //esto es una propiedad que le da nombre a esta funcion y sirve para decirle a los mutation ejecuten "Productos" y se actualice solo
      transformResponse: (response) =>
        response.sort((a, b) => a.timeSlot.substring(0,2) - b.timeSlot.substring(0,2)), //sirve para ordenar o modificar la forma en la que vienen los datos en este caso de mayor a menor
    }),

    getTurnsById: build.query({
      query: () => `/turn/usturn/${identificationNumber}`,
      providesTags: ['Turns'], //esto es una propiedad que le da nombre a esta funcion y sirve para decirle a los mutation ejecuten "Productos" y se actualice solo
      //  transformResponse:response=>response.sort((a,b)=>b.codigo-a.codigo)   //sirve para ordenar o modificar la forma en la que vienen los datos en este caso de mayor a menor
    }),

    updateEstadoTurno: build.mutation({
      query: (updatedState) => ({
        url: `/turn/${updatedState._id}`,
        method: 'PUT',
        body: updatedState,
      }),
      invalidatesTags: ['Turns'],
    }),

    deleteTurn: build.mutation({
      query: (identificationNumber) => ({
        url: `/customer/in/${identificationNumber}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Turns'],
    }),
  }),
});

export const {
  useGetTurnsQuery,
  useUpdateEstadoTurnoMutation,
  useDeleteTurnMutation,
} = turnSlices; //hook para solicitar datos //esto es un hook que da redux toolkit para usarlo en el frontend y me permite maejar cuadno esta cargando , cuando hay un error, etc
