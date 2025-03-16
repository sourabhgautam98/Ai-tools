"use client";

import { useState } from "react";
import { Form, Button, Container, Navbar} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { SPEECH_API_KEY } from "@/utils/constants";
import styles from "./TextToSpeech.module.css"; 

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const options = {
        method: "POST",
        url: "https://open-ai-text-to-speech1.p.rapidapi.com/",
        headers: {
          "x-rapidapi-key": SPEECH_API_KEY,
          "x-rapidapi-host": "open-ai-text-to-speech1.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          model: "tts-1",
          input: text,
          voice: "alloy",
        },
        responseType: "arraybuffer",
      };

      const response = await axios.request(options);

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <>
    {/* Main Container */}
      <div className="text-center py-5 mb-5 bg-light shadow-sm w-100" style={{ margin: 0, paddingLeft: 0, paddingRight: 0 }}>
        <div className="container">
          <h1 className="display-3 fw-bold">Text to Speech with high quality</h1>
          <p className="lead text-muted">
          Convert text to the most natural sounding AI voice online for free!
          </p>
        </div>
      </div>
      <Container className={styles.container}>
       
        <Form className={styles.form}>
          <Form.Group controlId="textInput" className="mb-4">
            <Form.Control
              as="textarea"
              rows={12}
              placeholder="Enter the Text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.textarea}
            />
          </Form.Group>
          <div className="d-grid">
            <Button
              variant="primary"
              size="lg"
              onClick={handleConvert}
              disabled={loading}
              className={styles.customBtn}
              style={{
                fontSize: "1.2rem",
                padding: "10px",
                border: "none",
              }}
            >
              {loading ? "Converting..." : "Convert to Speech"}
            </Button>
          </div>
        </Form>
        {audioUrl && (
          <div className="mt-5 text-center">
            <audio controls style={{ width: "100%" }}>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </Container>
    </>
  );
}