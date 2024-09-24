import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import BlogList from './pages/BlogList'
import { CreatePost } from './pages/CreatePost'
import { MyPosts } from './pages/MyPosts'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/blog/:id' element={<Blog />}></Route>
          <Route path='/blogs' element={<BlogList />}></Route>
          <Route path='/create' element={<CreatePost />}></Route>
          <Route path='/my-posts' element={<MyPosts />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
