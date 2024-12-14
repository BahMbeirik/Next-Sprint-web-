import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

import '../AddNote/AddNotePage.css'
const NoteEditPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [catagory, setCatagory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/notes/${id}/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const { title, body, catagory } = response.data;
        setNote(response.data);
        setTitle(title);
        setBody(body);
        setCatagory(catagory);
        
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Error fetching note details');
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/notes/${id}/`, {
        title,
        body,
        catagory
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate(`/notes/${id}`);
      toast.success("Sprint Updated Successfuly!");
    } catch (error) {
      console.error('Error updating the note:', error);
      setError('Error updating the note');
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleUpdate}>
      <h5>Modifier le Sprint</h5>
     <div className="mb-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">
         Title
       </label>
       <input
         type="text"
         className="form-control"
         id="exampleFormControlInput1"
         placeholder="Enter note's title"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         required
       />
     </div>
     <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      </div>
        
      <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Sprint's Status
        </label>
      <select className="form-select" aria-label="Default select example" 
      value={catagory}
      onChange={(e) => setCatagory(e.target.value)}
      required
      style={{height: "40px"}}>
          <option value="" selected>Pick a Status</option>
          <option value="FINISHED">finished</option>
          <option value="IN PROGRESS">in progress</option>
          <option value="TO DO">to do</option>
        </select>
      </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Modifier</button>
        
      </form>
    </div>
  );
};

export default NoteEditPage;


