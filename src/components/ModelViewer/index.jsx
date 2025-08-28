'use client'; // Tarayıcı tarafında çalışması için şart

import '@google/model-viewer'; // Eğer npm ile yüklediysen
// Eğer CDN kullanacaksan <script> kısmını aşağıda ekleyeceğiz

export default function ModelViewer({ src, alt = "3D Model" }) {
  return (
    <model-viewer
      src={src}
      alt={alt}
      auto-rotate
      camera-controls
      ar
      style={{ width: '100%', height: '400px',  }}
    >
    </model-viewer>
  );
}
