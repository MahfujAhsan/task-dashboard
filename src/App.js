import { RouterProvider } from "react-router-dom";
import route from "./Routes/Routes";


function App() {
  return (
    <section>
      <RouterProvider router={route}>

      </RouterProvider>
    </section>
  );
}

export default App;
