import "./App.css";
import { useState } from "react";

function App() {
  const [textToSummarize, setTextToSummarize] = useState("");

  function handleTextChange(text) {
    setTextToSummarize(text);
  }

  return (
    <div>
      <main>
        <p>Enter text you want to Summarize</p>
        <textarea
          value={textToSummarize}
          rows={20}
          cols={70}
          placeholder="Paste or type your text here..."
          onChange={(e) => handleTextChange(e.target.value)}
        />
        <br />
        <button>Summarize</button>
      </main>
    </div>
  );
}

export default App;
