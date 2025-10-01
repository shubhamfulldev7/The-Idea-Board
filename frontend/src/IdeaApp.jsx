import { useEffect, useMemo, useState } from "react";
import IdeaList from "./components/IdeaList.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function fetchJson(path, options) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error("Request failed");
  return await res.json();
}

export default function IdeaApp() {
  const [ideas, setIdeas] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(
    () => text.trim().length > 0 && text.trim().length <= 280,
    [text]
  );

  async function loadIdeas() {
    setLoading(true);
    try {
      const data = await fetchJson("/ideas");
      setIdeas(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIdeas();
    const id = setInterval(loadIdeas, 5000);
    return () => clearInterval(id);
  }, []);

  async function submitIdea(e) {
    e.preventDefault();
    if (!canSubmit) return;
    await fetchJson("/ideas", {
      method: "POST",
      body: JSON.stringify({ text: text.trim() }),
    });
    setText("");
    await loadIdeas();
  }

  async function upvote(id) {
    await fetchJson(`/ideas/${id}/upvote`, { method: "POST" });
    await loadIdeas();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Idea Board</h1>
        <form
          onSubmit={submitIdea}
          className="bg-white rounded-lg shadow p-4 mb-6"
        >
          <label className="block text-sm font-medium mb-2">
            Share an idea (max 280 chars)
          </label>
          <textarea
            className="w-full border rounded p-3 focus:outline-none focus:ring focus:border-blue-300"
            rows="3"
            maxLength={280}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your idea..."
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span
              className={text.length > 280 ? "text-red-600" : "text-gray-500"}
            >
              {text.trim().length}/280
            </span>
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-300"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {loading && <div className="text-sm text-gray-600">Loading...</div>}
          {!loading && <IdeaList ideas={ideas} onUpvote={upvote} />}
        </div>
      </div>
    </div>
  );
}
