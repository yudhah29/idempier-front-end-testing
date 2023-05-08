import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/base/navbar/Navbar";
import { withPrime } from "../components/base/primereact";
import LoginPage from "../pages/member-area/login-user";
import AssetPage from "../pages/red-erp-asset/asset-home";
import { Movies } from "../pages/member-area/movie-fetch";
import { App } from "../pages/member-area/App";
import NavbarComp from "../components/base/sidebar/sidebar";
import { Dashboard } from "../pages/member-area/crm-erp-slicing/dashboard";
import { CreateAsset } from "../pages/red-erp-asset/asset-create";

{/* <h1>NavBar Page</h1> */ }
const NavBar = () => <Navbar />

const NavBarWithTheme = withPrime(NavBar)


const mainRoutes = createBrowserRouter([
    {
        path: '',
        element: <LoginPage />
    },
    {
        path: '',
        element: <NavBarWithTheme />,
        children: [

            {
                path: 'asset-home',
                element: <AssetPage />
            },


            {
                path: 'movies-home',
                element: <Movies />
            },

            {
                path: 'app-test',
                element: <App />
            },

            {
                path: 'asset-create',
                element: <CreateAsset/>
            },

        ]
    },

    {
        path: '',
        element: <NavbarComp />,
        children: [

            {
                path: 'dashboard',
                element: <Dashboard />
            }

        ]
    }
])

export { mainRoutes }