"use client";

import { useEffect, useRef, useState } from "react";
import { getNewsPhotoUrl } from "@/lib/newsPhotos";

export default function ImageManager({ initialPhotos, onChange }) {
  const [photos, setPhotos] = useState(initialPhotos || []);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    setPhotos(initialPhotos || []);
  }, [initialPhotos]);

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (
      dragItem.current === null ||
      dragOverItem.current === null ||
      dragItem.current === dragOverItem.current
    ) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }

    const updated = [...photos];
    const [dragged] = updated.splice(dragItem.current, 1);
    updated.splice(dragOverItem.current, 0, dragged);
    dragItem.current = null;
    dragOverItem.current = null;
    setPhotos(updated);
    onChange(updated);
  };

  const remove = (index) => {
    const updated = photos.filter((_, photoIndex) => photoIndex !== index);
    setPhotos(updated);
    onChange(updated);
  };

  if (photos.length === 0) {
    return (
      <p className="img-manager-empty">No images yet. Upload files above.</p>
    );
  }

  return (
    <div className="img-manager">
      <p className="img-manager-hint">
        Drag to reorder · click x to remove · {photos.length} image
        {photos.length !== 1 ? "s" : ""}
      </p>
      <div className="img-manager-list">
        {photos.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="img-manager-card"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className="img-manager-handle" title="Drag to reorder">
              ::
            </div>

            <img
              src={getNewsPhotoUrl(url)}
              alt={`Image ${index + 1}`}
              className="img-manager-thumb"
            />

            <span className="img-manager-badge">{index + 1}</span>

            <button
              type="button"
              className="img-manager-remove"
              onClick={() => remove(index)}
              aria-label="Remove image"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
