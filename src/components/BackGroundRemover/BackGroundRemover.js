"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Spinner,
  Image,
  Alert,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./BackgroundRemover.module.css";
import { REMOVER_API_KEY } from "@/utils/constants";


export default function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outputImage, setOutputImage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image_file", selectedFile);
    formData.append("size", "auto");

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": REMOVER_API_KEY,
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );

      const base64Image = Buffer.from(response.data, "binary").toString("base64");
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setOutputImage(imageUrl);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.errors?.[0]?.title ||
          "Failed to remove background. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (outputImage) {
      const link = document.createElement("a");
      link.href = outputImage;
      link.download = "background_removed_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const imageStyle = {
    maxHeight: "300px",
    maxWidth: "100%",
    objectFit: "contain",
    width: "auto",
    height: "auto",
  };

  return (
    <>
      <div className="text-center py-5 mb-5 bg-light shadow-sm w-100" style={{ margin: 0, paddingLeft: 0, paddingRight: 0 }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Remove Image Backgrounds Instantly</h1>
          <p className="lead text-muted">
            Get perfect cutouts in seconds with our AI-powered background remover. No
            design skills needed – just upload and let our tool do the magic.
          </p>
        </div>
      </div>

      <Container className={styles.container}>
        <Form.Group controlId="formFile" className={`${styles.formGroup} mb-4`}>
          
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        <div className="row justify-content-center">
          {/* Input Preview Box */}
          <div className="col-md-5 mb-4">
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>Original Image</Card.Title>
                {previewImage ? (
                  <div className="mt-3 text-center">
                    <Image 
                      src={previewImage} 
                      style={imageStyle}
                      alt="Preview"
                    />
                  </div>
                ) : (
                  <div className="text-center text-muted py-5">
                    Upload an image to see preview
                  </div>
                )}
                <Button
                  variant="primary"
                  onClick={handleUpload}
                  disabled={loading || !selectedFile}
                  className={`${styles.customBtn} mt-3 w-100`}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Remove Background"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Output Box */}
          <div className="col-md-5 mb-4">
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>Output Image</Card.Title>
                {outputImage ? (
                  <div className="text-center">
                    <Image 
                      src={outputImage} 
                      style={imageStyle}
                      alt="Processed"
                    />
                    <Button
                      variant="success"
                      onClick={handleDownload}
                      className={`${styles.customBtn} mt-3 w-100`}
                    >
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-muted py-5">
                    Processed image will appear here
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Container>
    </>
  );
}