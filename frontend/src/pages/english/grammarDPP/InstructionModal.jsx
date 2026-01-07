export default function InstructionModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg pointer-events-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Instructions</h2>

        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Total time: 10 minutes</li>
          <li>• Each correct answer: +1</li>
          <li>• Wrong answer: -0.25</li>
          <li>• No marks for unattempted questions</li>
          <li>• Test auto-submits on time up</li>
          <li>• Changing set will auto-submit test</li>
        </ul>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            OK, Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
