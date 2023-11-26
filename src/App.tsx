import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";



//Layout
import AppLayout from "./Layout/AppLayout";
import { MyContextProvider } from "./Context/globalPathContext";
import FolderList from "./components/FolderList";
import SearchList from "./components/SearchList";




const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<AppLayout />}>
      <Route path="List" element={<FolderList/>} />
      <Route path="Slist" element={<SearchList/>} />
    </Route>
          
    
  
    
  )
);
function App() {



  return (
   <MyContextProvider>
   <RouterProvider router={router} />
   </MyContextProvider>
      
    

  );
}

export default App;