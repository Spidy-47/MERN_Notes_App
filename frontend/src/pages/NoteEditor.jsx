import React from "react";

import { useState } from 'react';
import API from '../api/api';

export default function NoteEditor({ note, onSaved, onCancel }) {
  const [title,setTitle]=useState(note.title||'');
  const [content,setContent]=useState(note.content||'');
  const isNew = !note._id;

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(isNew){
        const res = await API.post('/notes', { title, content });
        onSaved(res.data, true);
      } else {
        const res = await API.put(`/notes/${note._id}`, { title, content });
        onSaved(res.data, false);
      }
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 mb-4 rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="w-full p-2 border" rows={6} placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button type="button" onClick={onCancel} className="px-4 py-2 border">Cancel</button>
        </div>
      </form>
    </div>
  );
}
