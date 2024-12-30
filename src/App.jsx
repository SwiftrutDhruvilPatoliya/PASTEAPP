import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import ViewPaste from './component/ViewPaste';
import Navbar from './component/Navbar';
import Paste from './component/Paste';
import Home from './component/Home';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div>
          <Navbar />
          <Home />
        </div>
    },
    {
      path: "/pastes",
      element:
        <div>
          <Navbar />
          <Paste />
        </div>
    },
    {
      path: "/pastes/:id",
      element:
        <div>
          <Navbar />
          <ViewPaste />
        </div>
    }
  ]
);

function App() {

  return (
    <>
      <div>
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </>
  )
}

export default App;
