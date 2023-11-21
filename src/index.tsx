import {createRoot} from "react-dom/client";
import {App} from "./components/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LazyAbout} from "./pages/about/About.lazy";
import {Shop} from "./pages/Shop";

const root = document.getElementById('root');

if (!root){
    throw new Error('root not found')
}

const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                path: '/about',
                element: <LazyAbout />
            },
            {
                path: '/shop',
                element: <Shop />
            },
        ]
    },
]);

container.render(
    <RouterProvider router={router} />
)