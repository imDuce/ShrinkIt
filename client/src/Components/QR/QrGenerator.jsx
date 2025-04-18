import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "https://example.com",
  dotsOptions: {
    color: "#000000",
    type: "square",
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  cornersSquareOptions:{
    color: "#000000",
    type: "square",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});

const QrGenerator = () => {
  const [url, setUrl] = useState("https://example.com");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [dotStyle, setDotStyle] = useState("square");
  const [cornerStyle, setCornerStyle] = useState("square");
  const [logoImage, setLogoImage] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
      image: logoImage || undefined,
      dotsOptions: { color: fgColor, type: dotStyle },
      backgroundOptions: { color: bgColor },
    });
  }, [url, bgColor, fgColor, logoImage, dotStyle]);

  const handleLogoUpload = () => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold">Generate Custom QR for URL </h1>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-4 justify-center">
            <div className="border border-black">
              <label>Foreground Color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>
            <div>
              <label>Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Dot Style</label>
            <select
              value={dotStyle}
              onChange={(e) => setDotStyle(e.target.value)}
            >
              <option value="square">Square</option>
              <option value="dots">Dots</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>
          <div>
            <label>Upload Logo (optional)</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </div>
        </div>

        <div ref={qrRef} className="mx-auto" />

        <button
          onClick={() =>
            qrCode.download({ name: "custom-qr", extension: "png" })
          }
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ⬇️ Download QR Code
        </button>
      </div>
    </>
  );
};

export default QrGenerator;
