export default function IdeaList({ ideas, onUpvote }) {
  if (!ideas || ideas.length === 0) {
    return (
      <div className="text-sm text-gray-600">No ideas yet. Be the first!</div>
    );
  }

  return (
    <ul className="space-y-3">
      {ideas.map((idea) => (
        <li
          key={idea.id}
          className="bg-white rounded-lg shadow p-4 flex items-start justify-between hover:shadow-md transition-shadow"
        >
          <div className="pr-4 whitespace-pre-wrap break-words max-w-[85%] leading-relaxed">
            {idea.text}
          </div>
          <button
            onClick={() => onUpvote(idea.id)}
            className="flex items-center gap-2 px-3 py-2 rounded border hover:bg-gray-50"
            aria-label={`Upvote idea ${idea.id}`}
          >
            <span>▲</span>
            <span className="font-semibold tabular-nums">{idea.votes}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
