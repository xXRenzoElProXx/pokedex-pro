import axios from 'axios'

/** Base Axios instance for the PokéAPI. Endpoint-specific calls live in `api/`
 *  modules organized by resource (e.g. `api/pokemon.ts`), added incrementally. */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
})
