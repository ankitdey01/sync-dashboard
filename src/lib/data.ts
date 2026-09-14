export const INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=1050725403276353557&permissions=36988944&scope=bot+applications.commands";
export const SUPPORT_URL = "https://discord.gg/syncmusic";
export const VOTE_URL = "https://top.gg/bot/1050725403276353557/vote";
export const REPO_URL =
  "https://github.com/ankitdey01/sync-main-music-bot-djs";
export const AUTHOR_URL = "https://ankitdey.dev";

export const STATS = [
  { value: "2,000+", label: "Active servers" },
  { value: "5", label: "Music platforms" },
  { value: "40+", label: "Slash commands" },
  { value: "24/7", label: "Lavalink uptime" },
] as const;

export const PLATFORMS = [
  "YouTube",
  "Spotify",
  "Apple Music",
  "Deezer",
  "Facebook",
  "YouTube Music",
  "SoundCloud",
  "Lavalink",
] as const;

export type Feature = {
  icon: string;
  title: string;
  body: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "Play",
    title: "Multi-platform playback",
    body: "YouTube, Spotify, Apple Music, Deezer and Facebook through one stable Lavalink pipeline. No dead links.",
  },
  {
    icon: "ListMusic",
    title: "Queue that behaves",
    body: "View, reorder, clear, replay and back-track. The queue survives skips, seeks and restarts cleanly.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Audio filters",
    body: "Bass, nightcore, vaporwave and more. One command, applied instantly, reversible anytime.",
  },
  {
    icon: "FolderHeart",
    title: "Personal playlists",
    body: "Create, save and share playlists across every server you are in. Your library follows you.",
  },
  {
    icon: "MousePointerClick",
    title: "Button controls",
    body: "Pause, skip, loop, volume and grab — directly under Now Playing. Nobody needs to memorise syntax.",
  },
  {
    icon: "Activity",
    title: "Now Playing + profile",
    body: "Rich embeds for the current track, plus per-user stats: songs played and time listened.",
  },
];

export type CommandGroup = {
  id: string;
  label: string;
  blurb: string;
  commands: { name: string; desc: string }[];
};

export const COMMAND_GROUPS: CommandGroup[] = [
  {
    id: "music",
    label: "Music",
    blurb: "Playback core. The 90% use case.",
    commands: [
      { name: "/play", desc: "Play a song or playlist from any source" },
      { name: "/pause", desc: "Pause the current track" },
      { name: "/resume", desc: "Pick up right where you left off" },
      { name: "/skip", desc: "Jump to the next track" },
      { name: "/back", desc: "Replay the previous song" },
      { name: "/seek", desc: "Jump to an exact timestamp" },
      { name: "/forward", desc: "Nudge ahead by a few seconds" },
      { name: "/loop", desc: "Loop track, queue, or off" },
      { name: "/queue", desc: "See what's coming up next" },
      { name: "/clearqueue", desc: "Empty the queue in one tap" },
      { name: "/now-playing", desc: "Rich embed of the current track" },
      { name: "/grab", desc: "DM yourself the current song" },
      { name: "/volume", desc: "Fine volume with button stepper" },
    ],
  },
  {
    id: "filter",
    label: "Filter",
    blurb: "One-word sound shaping.",
    commands: [
      { name: "/filter bass", desc: "Deeper low end for EDM and hip-hop" },
      { name: "/filter nightcore", desc: "Lifted pitch + tempo" },
      { name: "/filter vaporwave", desc: "Slowed, wide, late-night" },
      { name: "/filter clear", desc: "Return to flat studio sound" },
    ],
  },
  {
    id: "playlist",
    label: "Playlist",
    blurb: "Your library, portable.",
    commands: [
      { name: "/playlist create", desc: "Start a named collection" },
      { name: "/playlist add", desc: "Save the current track or URL" },
      { name: "/playlist play", desc: "Queue a whole playlist at once" },
      { name: "/playlist share", desc: "Hand it to a friend or server" },
    ],
  },
  {
    id: "general",
    label: "General",
    blurb: "Status, help and voting.",
    commands: [
      { name: "/help", desc: "Every command, grouped and searchable" },
      { name: "/ping", desc: "Latency and node health" },
      { name: "/vote", desc: "Support Sync on Top.gg" },
      { name: "/profile", desc: "Your songs played and hours listened" },
    ],
  },
];

export const COMPARISON_ROWS = [
  { label: "Slash commands, no prefix to learn", sync: true, others: false },
  { label: "Spotify + Apple + Deezer + YouTube", sync: true, others: false },
  { label: "Button controls under Now Playing", sync: true, others: false },
  { label: "Personal playlists that travel", sync: true, others: false },
  { label: "Audio filters built in", sync: true, others: true },
  { label: "Open source (GPL-3.0) core", sync: true, others: false },
  { label: "Paywalled basics", sync: false, others: true },
] as const;

export const FAQS = [
  {
    q: "How do I add Sync to my server?",
    a: "Click Add to Discord, pick your server, grant Connect + Speak + View Channel. Then join a voice channel and run /play with a song name or link. First track usually starts in seconds.",
  },
  {
    q: "Which sources actually work?",
    a: "YouTube, Spotify, Apple Music, Deezer and Facebook links, resolved through Lavalink. Paste a track, album, playlist or search text — Sync figures out the rest.",
  },
  {
    q: "Is Sync free? What does voting unlock?",
    a: "Playback, queue, filters and playlists are free. Top.gg votes unlock priority queue handling on busy nodes. Nothing essential sits behind a paywall.",
  },
  {
    q: "Why does music sometimes stutter on other bots?",
    a: "Most stutter is node overload or region mismatch. Sync runs dedicated Lavalink nodes close to Discord voice regions and exposes /ping so you can verify node health yourself.",
  },
  {
    q: "Can I trust it in a 10k-member server?",
    a: "Sync already serves 2,000+ servers with per-guild queues, DJ-safe button controls and permission-aware commands. Mods keep full control of who can skip, clear or change filters.",
  },
] as const;
