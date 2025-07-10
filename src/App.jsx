import "./App.css";
import { useState } from "react";
import Button from "./Button";
import SummarizedText from "./SummarizedText";

function App() {
  const [textToSummarize, setTextToSummarize] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function summarizeText() {
    if (!textToSummarize.trim()) {
      alert("Please enter some text to summarize.");
      return;
    }

    setLoading(true);

    try {
      if ("ai" in window && "summarizer" in window.ai) {
        const summarizer = await window.ai.summarizer.create({
          type: "key-points",
          format: "paragraph",
          length: "medium",
        });

        const aiSummary = await summarizer.summarize(textToSummarize);
        setSummary(aiSummary);
        summarizer.destroy();
      } else {
        throw new Error("Chrome AI not available");
      }
    } catch (error) {
      const sentences = textToSummarize
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 20);
      const localSummary =
        sentences.slice(0, Math.min(3, sentences.length)).join(". ") + ".";
      setSummary(localSummary);
    }

    setLoading(false);
  }

  return (
    <div>
      {!summary ? (
        <main>
          <h1>Text Summarizer</h1>
          <p>Enter text you want to summarize:</p>
          <textarea
            value={textToSummarize}
            rows={10}
            cols={70}
            placeholder="Paste or type your text here..."
            onChange={(e) => setTextToSummarize(e.target.value)}
          />
          <br />
          <Button onClick={summarizeText} disabled={loading}>
            {loading ? "Summarizing..." : "Summarize Text"}
          </Button>
        </main>
      ) : (
        <SummarizedText summary={summary} />
      )}
    </div>
  );
}

export default App;
