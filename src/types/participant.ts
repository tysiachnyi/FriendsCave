export interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
  isSelf?: boolean;
  muted?: boolean; // remote mute state (e.g., server-driven)
}
