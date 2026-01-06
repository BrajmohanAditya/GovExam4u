export default function InstructionModal({ open, onStart, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white max-w-md w-[90%] p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Test Instructions
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Total time: 10 minutes</li>
          <li>Each correct answer: +1</li>
          <li>Wrong answer: −0.25</li>
          <li>Auto-submit on time up</li>
          <li>Changing set auto-submits test</li>
        </ul>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={onStart}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
