"use client";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    setUploading(false);
    if (res.ok) {
      setUploadedUrl(data.url);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={uploading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadedUrl && <p>Uploaded File: <a href={uploadedUrl} target="_blank">{uploadedUrl}</a></p>}
    </div>
  );
}
