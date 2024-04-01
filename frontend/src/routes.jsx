import {TABLE_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import Tables from "./pages/Auth";


export const authRoutes = [
    {
        path: TABLE_ROUTE,
        Component: Tables
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Tables
    }
]