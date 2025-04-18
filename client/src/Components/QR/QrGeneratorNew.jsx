import React, { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import "./QRG.css";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../helpers/constants";

function QrGeneratorNew() {
  // QR Code content

  const { shortUrl } =useParams()

  const [data, setData] = useState(shortUrl?`${serverUrl}/${shortUrl}`:"https://www.google.com");
  const [size, setSize] = useState(250);
  const [margin, setMargin] = useState(10);

  // Styling options
  const [dotsOptions, setDotsOptions] = useState({
    color: "#000000",
    type: "square",
  });

  const [cornersOptions, setCornersOptions] = useState({
    color: "#000000",
    type: "square",
  });

  const [backgroundOptions, setBackgroundOptions] = useState({
    color: "#FFFFFF",
  });

  const [logoOptions, setLogoOptions] = useState({
    src: "",
    size: 0.3,
    hideBackgroundDots: true,
  });

  // UI state
  const [activeTab, setActiveTab] = useState("basic");
  const qrRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const logoInputRef = useRef(null);

  // Initialize QR code
  useEffect(() => {
    const newQRCode = new QRCodeStyling({
      width: size,
      height: size,
      data: data,
      margin: margin,
      qrOptions: {
        errorCorrectionLevel: "H",
      },
      imageOptions: {
        hideBackgroundDots: logoOptions.hideBackgroundDots,
        imageSize: logoOptions.size,
        margin: 5,
        crossOrigin: "anonymous",
      },
      dotsOptions: {
        color: dotsOptions.color,
        type: dotsOptions.type,
      },
      backgroundOptions: {
        color: backgroundOptions.color,
      },
      cornersSquareOptions: {
        color: cornersOptions.color,
        type: cornersOptions.type,
      },
      cornersDotOptions: {
        color: cornersOptions.color,
        type: cornersOptions.type,
      },
    });

    setQrCode(newQRCode);

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      newQRCode.append(qrRef.current);
    }

    // Set logo if provided
    if (logoOptions.src) {
      newQRCode.update({
        image: logoOptions.src,
      });
    }
  }, [
    data,
    size,
    margin,
    dotsOptions,
    backgroundOptions,
    cornersOptions,
    logoOptions,
  ]);

  // Download QR code
  const downloadQRCode = (format) => {
    if (qrCode) {
      qrCode.download({
        name: `qrcode-${new Date().toISOString().slice(0, 10)}`,
        extension: format,
      });
    }
  };

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoOptions({
          ...logoOptions,
          src: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Color presets
  const applyColorPreset = (preset) => {
    switch (preset) {
      case "standard":
        setDotsOptions({ ...dotsOptions, color: "#000000" });
        setBackgroundOptions({ color: "#FFFFFF" });
        setCornersOptions({ ...cornersOptions, color: "#000000" });
        break;
      case "blue":
        setDotsOptions({ ...dotsOptions, color: "#0077B6" });
        setBackgroundOptions({ color: "#CAF0F8" });
        setCornersOptions({ ...cornersOptions, color: "#023E8A" });
        break;
      case "red":
        setDotsOptions({ ...dotsOptions, color: "#E63946" });
        setBackgroundOptions({ color: "#FFEDDF" });
        setCornersOptions({ ...cornersOptions, color: "#D62828" });
        break;
      case "green":
        setDotsOptions({ ...dotsOptions, color: "#2D6A4F" });
        setBackgroundOptions({ color: "#D8F3DC" });
        setCornersOptions({ ...cornersOptions, color: "#1B4332" });
        break;
      case "dark":
        setDotsOptions({ ...dotsOptions, color: "#FFFFFF" });
        setBackgroundOptions({ color: "#2B2D42" });
        setCornersOptions({ ...cornersOptions, color: "#FFFFFF" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="external">
      <div className="container">
        <header className="headerSection">
          <h1 className="QrHeading">Create customised QR codes with desired style for Shortened URLS</h1>
          <p></p>
        </header>

        <div className="content-wrapper">
          {/* Preview Section */}
          <div className="preview-section">
            <h2>Preview</h2>
            <div className="qr-container" ref={qrRef}></div>

            <div>
              <button
                className="btn btn-primary"
                onClick={() => downloadQRCode("svg")}
              >
                <i className="fas fa-download"></i> SVG
              </button>
              <button
                className="btn btn-primary"
                onClick={() => downloadQRCode("png")}
              >
                <i className="fas fa-download"></i> PNG
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => downloadQRCode("jpeg")}
              >
                <i className="fas fa-download"></i> JPEG
              </button>
            </div>
          </div>

          {/* Options Section */}
          <div className="options-section">
            <div className="tab-buttons">
              <button
                className={`tab-btn ${activeTab === "basic" ? "active" : ""}`}
                onClick={() => setActiveTab("basic")}
              >
                Basic
              </button>
              <button
                className={`tab-btn ${activeTab === "style" ? "active" : ""}`}
                onClick={() => setActiveTab("style")}
              >
                Style
              </button>
              <button
                className={`tab-btn ${activeTab === "logo" ? "active" : ""}`}
                onClick={() => setActiveTab("logo")}
              >
                Logo
              </button>
            </div>

            {/* Basic Tab */}
            <div
              className={`tab-content ${activeTab === "basic" ? "active" : ""}`}
            >
              <div className="form-group">
                <label htmlFor="data">QR Code Content</label>
                <input
                  type="text"
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Enter URL or text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="size">Size (px): {size}</label>
                <input
                  type="range"
                  id="size"
                  min="100"
                  max="400"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="margin">Margin (px): {margin}</label>
                <input
                  type="range"
                  id="margin"
                  min="0"
                  max="50"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label>Quick Color Presets</label>
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => applyColorPreset("standard")}
                  >
                    Standard
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => applyColorPreset("blue")}
                  >
                    Blue
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => applyColorPreset("red")}
                  >
                    Red
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => applyColorPreset("green")}
                  >
                    Green
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => applyColorPreset("dark")}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>

            {/* Style Tab */}
            <div
              className={`tab-content ${activeTab === "style" ? "active" : ""}`}
            >
              <div className="form-group">
                <label htmlFor="dotsType">Dots Style</label>
                <select
                  id="dotsType"
                  value={dotsOptions.type}
                  onChange={(e) =>
                    setDotsOptions({ ...dotsOptions, type: e.target.value })
                  }
                >
                  <option value="square">Square</option>
                  <option value="dots">Dots</option>
                  <option value="rounded">Rounded</option>
                  <option value="classy">Classy</option>
                  <option value="classy-rounded">Classy Rounded</option>
                  <option value="extra-rounded">Extra Rounded</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dotsColor">Dots Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="dotsColor"
                    value={dotsOptions.color}
                    onChange={(e) =>
                      setDotsOptions({ ...dotsOptions, color: e.target.value })
                    }
                  />
                  <div
                    className="color-preview"
                    style={{ backgroundColor: dotsOptions.color }}
                  ></div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cornersType">Corners Style</label>
                <select
                  id="cornersType"
                  value={cornersOptions.type}
                  onChange={(e) =>
                    setCornersOptions({
                      ...cornersOptions,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="square">Square</option>
                  <option value="dot">Dot</option>
                  <option value="extra-rounded">Extra Rounded</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cornersColor">Corners Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="cornersColor"
                    value={cornersOptions.color}
                    onChange={(e) =>
                      setCornersOptions({
                        ...cornersOptions,
                        color: e.target.value,
                      })
                    }
                  />
                  <div
                    className="color-preview"
                    style={{ backgroundColor: cornersOptions.color }}
                  ></div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="backgroundColor">Background Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="backgroundColor"
                    value={backgroundOptions.color}
                    onChange={(e) =>
                      setBackgroundOptions({ color: e.target.value })
                    }
                  />
                  <div
                    className="color-preview"
                    style={{ backgroundColor: backgroundOptions.color }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Logo Tab */}
            <div
              className={`tab-content ${activeTab === "logo" ? "active" : ""}`}
            >
              <div className="form-group">
                <label htmlFor="logoUpload">Upload Logo</label>
                <input
                  type="file"
                  id="logoUpload"
                  ref={logoInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                />
              </div>

              <div className="form-group">
                <label htmlFor="logoSize">
                  Logo Size: {Math.round(logoOptions.size * 100)}%
                </label>
                <input
                  type="range"
                  id="logoSize"
                  min="0.1"
                  max="0.5"
                  step="0.05"
                  value={logoOptions.size}
                  onChange={(e) =>
                    setLogoOptions({
                      ...logoOptions,
                      size: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={logoOptions.hideBackgroundDots}
                    onChange={(e) =>
                      setLogoOptions({
                        ...logoOptions,
                        hideBackgroundDots: e.target.checked,
                      })
                    }
                  />
                  Hide dots behind logo
                </label>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => setLogoOptions({ ...logoOptions, src: "" })}
                >
                  Remove Logo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrGeneratorNew;
