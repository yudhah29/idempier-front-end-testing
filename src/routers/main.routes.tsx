import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/base/navbar/Navbar";
import { withPrime } from "../components/base/primereact";
import LoginPage from "../pages/member-area/login-user";
import AssetPage from "../pages/member-area/asset-home";

{/* <h1>NavBar Page</h1> */}
const NavBar = () => <Navbar/>

const NavBarWithTheme = withPrime(NavBar)


const mainRoutes = createBrowserRouter([
    {
        path:'',
        element:<LoginPage/>
    },
    {
        path:'',
        element: <NavBarWithTheme/>,
        children:[

            {
                path : 'asset-home',
                element : <AssetPage/>
            }
            
        ]
    }
])

export{mainRoutes}