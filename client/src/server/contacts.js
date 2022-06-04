import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api-contacts/",

        //тут я создаю базовый хедерс для всех запросов вытягивая токен из стейта на любой глубине.

        prepareHeaders: (headers, { getState }) => {
            const token = getState().token;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["contact"],

    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => ({
                url: `/contacts/`,
                method: "GET",
            }),
            providesTags: ["contact"],
        }),

        deletedContact: builder.mutation({
            query: (id) => ({
                url: `contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["contact"],
        }),

        addContact: builder.mutation({
            query: (newContact) => ({
                url: `/contacts`,
                method: "POST",
                body: newContact,
            }),
            invalidatesTags: ["contact"],
        }),
        registrationUser: builder.mutation({
            query: (newUser) => ({
                url: "/users/signup",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["contact", "user"],
        }),

        //запрос получение нового токена для работы пользователя с бэкендом
        loginUser: builder.mutation({
            query: (userData) => ({
                url: `/users/login`,
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["contact", "user"],
        }),

        //запрос который удаляет актуальный токен выданый пользователю на бекенде
        unLoginUser: builder.mutation({
            query: () => ({
                url: `/users/logout`,
                method: "POST",
            }),
            invalidatesTags: ["user"],
        }),

        //запрос для проверки валидный ли токен храниться в памяти для последующих запросов на бэкенд
        //отправляет только токен возвращает имя пользователя и эмеил

        getIsActivUser: builder.query({
            query: () => ({
                url: `/users/current`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllContactsQuery,
    useDeletedContactMutation,
    useAddContactMutation,
    useGetIsActivUserQuery,
    useRegistrationUserMutation,
    useLoginUserMutation,
    useUnLoginUserMutation,
} = contactApi;
