import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import route from "./Routes/Routes";


function App() {
  return (
    <section>
      <RouterProvider router={route}>

      </RouterProvider>
      <ToastContainer />
    </section>
  );
}

export default App;
