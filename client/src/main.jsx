import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Container from "./Components/Container/Container.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import WhyUs from "./Components/Why Us/WhyUs.jsx";
import Pricing from "./Components/PricingPlans/Pricing.jsx";
import QrGenerator from "./Components/QR/QrGenerator.jsx";
import QrGeneratorNew from "./Components/QR/QrGeneratorNew.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<Container />} />
      <Route path="whyUs" element={<WhyUs />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="generateQr" element={<QrGenerator />} />
      <Route path="generateQrNew" element={<QrGeneratorNew />} />
      <Route path="qr-generator/:shortUrl" element={<QrGeneratorNew />} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
