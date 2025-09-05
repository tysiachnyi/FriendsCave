import { useState } from "react";

interface JoinProps {
  onSubmitCode?: (code: string) => void;
}

export const Join = ({ onSubmitCode }: JoinProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (!code.trim()) {
      setError("Code is required");
      return;
    }
    setError("");
    await window.store.set("code", code.trim());
    const codeData = await window.store.get<string>("code");
    console.log("Stored code is:", codeData);
    onSubmitCode?.(code.trim());
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-4">Join a Cave</h2>
      <p className="text-lg text-gray-700 text-center max-w-lg">
        Enter the access code a friend shared with you to hop into their cave.
      </p>
      <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter Cave Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="border border-gray-300 rounded-lg p-4 w-full sm:w-72 text-center 
          tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          maxLength={8}
        />
        <button
          onClick={handleJoin}
          disabled={!code.trim()}
          className="bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600
           text-white rounded-lg shadow-md cursor-pointer px-8 py-4 w-full sm:w-40 font-semibold"
        >
          Join
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </>
  );
};
