import { useState } from "react";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  // average = (good*1 + neutral*0 + bad*(-1)) / total
  const average = total === 0 ? 0 : (good - bad) / total;

  // positive % = (good / total) * 100
  const positive = total === 0 ? 0 : (good / total) * 100;


  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Give Feedback</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setGood(good + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Good
        </button>
        <button
          onClick={() => setNeutral(neutral + 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Neutral
        </button>
        <button
          onClick={() => setBad(bad + 1)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Bad
        </button>
      </div>

      <h2 className="text-lg font-semibold">Statistics</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
        <li>Total: {total}</li>
        <li>Average: {average.toFixed(2)}</li>
        <li>Positive: {positive.toFixed(1)}%</li>
      </ul>
    </div>
  );
}