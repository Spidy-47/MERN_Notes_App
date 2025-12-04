import React from "react";

import { useEffect, useState } from 'react';
import API from '../api/api';
import NoteEditor from './NoteEditor';

export default function Notes() {
  const [notes,setNotes]=useState([]);
  const [editing,setEditing]=useState(null);

  const fetchNotes=async()=>{
    try{
      const res = await API.get('/notes');
      setNotes(res.data);
    }catch(err){ console.error(err); }
  };

  useEffect(()=>{ fetchNotes(); }, []);

  const handleDelete=async(id)=>{
    try{
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter(n=>n._id!==id));
    }catch(err){ console.error(err); }
  };

  const handleSave=(note,isNew)=>{
    if(isNew) setNotes([note, ...notes]);
    else setNotes(notes.map(n=>n._id===note._id?note:n));
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl">Your Notes</h2>
        <button onClick={()=>setEditing({})} className="px-4 py-2 bg-blue-500 text-white rounded">New Note</button>
      </div>

      {editing && <NoteEditor note={editing} onSaved={handleSave} onCancel={()=>setEditing(null)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(n=>(
          <div key={n._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{n.title}</h3>
            <p className="text-sm mt-2">{n.content}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={()=>setEditing(n)} className="px-3 py-1 border">Edit</button>
              <button onClick={()=>handleDelete(n._id)} className="px-3 py-1 border text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
