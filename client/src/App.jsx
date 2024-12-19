import {createBrowserRouter,
      createRoutesFromElements,
      RouterProvider,
      Route
    } from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Signup from "./components/Signup"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />} >
      <Route index element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App
