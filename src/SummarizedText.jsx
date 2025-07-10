import Button from "./Button";

export default function SummarizedText({ summary }) {
  return (
    <div className="summarized-text">
      <h2>Summary</h2>
      <p>{summary}</p>
      <Button onClick={() => window.location.reload()}>
        Summarize New Text
      </Button>
    </div>
  );
}
