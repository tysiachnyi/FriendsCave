import React from "react";
import { Participant } from "../types/participant";

interface AudioAvatarProps {
  p: Participant;
  onMuteToggle?: (id: string) => void;
}

export const AudioAvatar: React.FC<AudioAvatarProps> = ({
  p,
  onMuteToggle,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl w-36 transition-all shadow-sm border ${
        p.isSpeaking
          ? "bg-green-50 border-green-300 ring-2 ring-green-400"
          : "bg-white border-gray-200"
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-full h-20 w-20 select-none text-xl font-semibold tracking-wide transition-colors ${
          p.isSpeaking ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
        } ${p.muted ? "opacity-50" : ""}`}
      >
        {p.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="truncate max-w-[90px]" title={p.name}>
          {p.name}
        </span>
        {p.isSelf && (
          <span className="text-xs bg-gray-800 text-white rounded px-1">
            you
          </span>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {p.muted ? (
          <span className="text-red-500 text-xs font-semibold">Muted</span>
        ) : (
          <span
            className={`text-xs font-semibold ${
              p.isSpeaking ? "text-green-600" : "text-gray-400"
            }`}
          >
            {p.isSpeaking ? "Speaking" : "Idle"}
          </span>
        )}
        {p.isSelf && (
          <button
            onClick={() => onMuteToggle?.(p.id)}
            className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 border border-gray-300"
          >
            {p.muted ? "Unmute" : "Mute"}
          </button>
        )}
      </div>
    </div>
  );
};
