import { useEffect, useState, useCallback } from "react";
import { RoomData } from "../types/roomData";
import { Participant } from "../types/participant";
import { AudioAvatar } from "../components/AudioAvatar";

type Props = {
  toHome: () => void;
};

export const Room = ({ toHome }: Props) => {
  const [roomData, setRoomData] = useState<RoomData | undefined>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [username, setUsername] = useState("");
  const [micMuted, setMicMuted] = useState(false);
  const [connectionQuality] = useState("Good"); // placeholder

  // Load room + username
  useEffect(() => {
    (async () => {
      const [room, storedName] = await Promise.all([
        window.store.get<RoomData>("roomData"),
        window.store.get<string>("username"),
      ]);
      if (room) setRoomData(room);
      if (storedName) setUsername(storedName);
      // Mock initial participants (self + 2)
      setParticipants([
        {
          id: "self",
          name: storedName || "You",
          isSpeaking: false,
          isSelf: true,
          muted: false,
        },
        { id: "p2", name: "Luna", isSpeaking: true, muted: false },
        { id: "p3", name: "Kai", isSpeaking: false, muted: false },
      ]);
    })();
  }, []);

  // // Simulate speaking changes (demo animation)
  // useEffect(() => {
  //   if (!participants.length) return;
  //   const interval = setInterval(() => {
  //     setParticipants((prev) =>
  //       prev.map((p, idx) => ({
  //         ...p,
  //         isSpeaking: idx !== 0 && Math.random() > 0.6 ? true : false,
  //       }))
  //     );
  //   }, 2500);
  //   return () => clearInterval(interval);
  // }, [participants.length]);

  const toggleMuteSelf = useCallback((id: string) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              muted: !p.muted,
              isSpeaking: p.muted ? p.isSpeaking : false,
            }
          : p
      )
    );
    setMicMuted((m) => !m);
  }, []);

  const leave = () => {
    // Placeholder: real leave logic would go here
    toHome();
    // if owner then close the room
    // else just leave
  };

  return (
    <>
      {/* Header */}
      <div className="w-full flex items-center justify-between py-2 px-2 border-b bg-white shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <span>Room name: </span>
            {roomData?.name || "Untitled Cave"}
          </h1>
          <span className="text-xs text-gray-500 font-mono tracking-wider">
            <span>Room id: </span> {roomData?.code}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 hidden sm:block">
            Connection: <span className="font-medium">{connectionQuality}</span>
          </div>
          <button
            onClick={leave}
            className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Participants grid */}
      <div className="flex-1 overflow-y-auto p-8">
        {participants.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No one here yet…
          </div>
        )}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 place-items-center">
          {participants.map((p) => (
            <AudioAvatar key={p.id} p={p} onMuteToggle={toggleMuteSelf} />
          ))}
        </div>
      </div>

      {/* Footer controls */}
      <div className="border-t w-full bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-inner">
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleMuteSelf("self")}
            className={`px-5 py-3 rounded-lg text-sm font-medium shadow-sm transition-colors border flex items-center gap-2 ${
              micMuted
                ? "bg-red-600 hover:bg-red-700 text-white border-red-700"
                : "bg-green-600 hover:bg-green-700 text-white border-green-700"
            }`}
          >
            {micMuted ? "Unmute Mic" : "Mute Mic"}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500">
          <span>
            Participants: <strong>{participants.length}</strong>
          </span>
        </div>
      </div>
    </>
  );
};
