export type Credential = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
};

export const CREDENTIALS: Credential[] = [
  {
    id: "ethical-hacking",
    title: "Ethical Hacking & Network Security Mastery",
    issuer: "Lovely Professional University",
    date: "July 2026",
    url: "https://drive.google.com/file/d/1WLx7aiDztEKRxzBBU2QDAOF7WU97Mo3_/view"
  },
  {
    id: "cpp-programming",
    title: "Programming Using C++",
    issuer: "Infosys Springboard",
    date: "August 2025",
    url: "https://drive.google.com/file/d/1yc8CTtyTGOp0IX6OjHcqfq3lDKkrCQ6X/view"
  },
  {
    id: "linux-shell",
    title: "Linux Commands and Shell Scripting",
    issuer: "SkillEra",
    date: "November 2024",
    url: "https://drive.google.com/file/d/1Uc65toKrBd6PDRjzg2lMF3x7ZpuMkTWH/view"
  },
  {
    id: "pahal-ngo",
    title: "Pahal NGO Community Development Project",
    issuer: "Community development training",
    date: "June 2025",
    url: "https://drive.google.com/file/d/19g6CQZn5ItkJRCkvRvFaNSMhCCQlBtlL/view"
  }
];
