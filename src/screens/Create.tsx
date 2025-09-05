import { useState } from "react";

interface CreateProps {
  onCreate?: (data: { name: string; description: string }) => void;
}

export const Create = ({ onCreate }: CreateProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setError("");
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setGeneratedCode(code);
    onCreate?.({ name: name.trim(), description: description.trim() });
    await window.store.set("roomData", {
      name: name.trim(),
      description: description.trim(),
      code,
    });
  };

  const handleCopy = async () => {
    if (generatedCode) {
      try {
        await navigator.clipboard.writeText(generatedCode);
      } catch {
        // ignore clipboard errors (e.g., not supported / permissions)
      }
    }
  };

  return (
    <>
      {!generatedCode && (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4">Create a Cave</h2>
          <p className="text-lg text-gray-700 text-center max-w-lg">
            Give your new cave a name and an optional description. We'll
            generate an invite code you can share.
          </p>
          <div className="flex flex-col gap-4 mt-8 w-full max-w-lg">
            <input
              type="text"
              placeholder="Cave Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-4 w-full bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              maxLength={40}
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-4 w-full h-28 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              maxLength={180}
            />
            <button
              onClick={handleGenerate}
              disabled={!name.trim()}
              className="bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600 text-white rounded-lg shadow-md cursor-pointer px-8 py-4 font-semibold"
            >
              Generate Invite Code
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      )}
      {generatedCode && (
        <div className="flex flex-col gap-4 mt-8 w-full max-w-lg">
          <div className="mt-4 bg-white border border-green-200 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm">
            <p className="text-sm text-gray-600">
              Share this code with friends:
            </p>
            <div className="text-3xl font-mono tracking-widest font-bold">
              {generatedCode}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="bg-gray-800 text-white px-5 py-2 rounded-md text-sm hover:bg-black"
              >
                Copy
              </button>
              <button
                onClick={() => setGeneratedCode(null)}
                className="bg-white border border-gray-300 px-5 py-2 rounded-md text-sm hover:bg-gray-50"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
