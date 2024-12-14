import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddNotes from "./Pages/AddNote/AddNotePage";
import NoteDetail from "./Pages/NoteDetail/NoteDetailPage";
import NoteEditPage from "./Pages/EditNote/EditNotePage";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Projects from './Pages/Projects/Projects';
import ProjectDetail from './Pages/ProjectDetail/ProjectDetail';
import Notes from './Pages/Notes/Notes'
import AddProject from './Pages/AddProject/AddProject';


function App() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:8000/api/projects/', { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setProjects(response.data);
        
        setIsLoading(false)
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);
  

  const handleSearchText = (val) =>{
    setSearchTerm(val);
  }
  const handleSetProject = (val) =>{
    setProjects(val);
  }
  
  
  return (
    <div>
      <Router>
      <NavBar searchtext={searchTerm} handleSearchText={handleSearchText}/>
        <Routes>
          <Route path="/notes/:id/edit" element={<NoteEditPage />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/add-notes" element={<AddNotes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<Login />} /> 
          <Route path="/projects" element={<Projects searchTerm={searchTerm} isLoading={isLoading} projects={projects} handleSetProject={handleSetProject}/>} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects/:id/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
