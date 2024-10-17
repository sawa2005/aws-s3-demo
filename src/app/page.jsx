'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = reader.result.split(',')[1];
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileContent: base64File,
          fileName: file.name,
        }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async () => {
    if (!file) return;

    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: file.name,
      }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div>
      <h1>Upload and Delete File from AWS S3</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDelete}>Delete</button>
      <p>{message}</p>
    </div>
  );
}