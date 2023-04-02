import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Chat } from "./components/Chat"
import { NavBar } from "./components/Navbar";
import { Home } from "./components/Home";

function App() {

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/api/users');
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
