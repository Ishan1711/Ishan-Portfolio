export type Project = {
  id: string;
  name: string;
  category: string;
  technologies: string[];
  description: string;
  links: {
    live?: string;
    github?: string;
  };
};

export const PROJECTS: Project[] = [
  {
    id: "phishscope",
    name: "PhishScope",
    category: "Full-Stack / Security / AI",
    technologies: ["React.js", "Flask", "Groq", "Pydantic", "Axios", "Chart.js"],
    description: "A full-stack web application that automates email-header analysis and identifies potential phishing indicators. The application analyzes email-header information, checks for suspicious indicators and generates a phishing-risk assessment in approximately 1.3 seconds.",
    links: {
      live: "https://phishscope-zlzv.onrender.com/",
      github: "https://github.com/Ishan1711/PhishScope",
    },
  },
  {
    id: "chemistry-ai",
    name: "Chemistry AI Chatbot",
    category: "AI / Full-Stack",
    technologies: ["Python", "Flask", "Groq", "HTML", "CSS", "JavaScript"],
    description: "A web-based AI chatbot focused on structured assistance for chemistry queries. It includes specialized modes for General, Organic, Inorganic, Chemical Reactions, and Topic Comparison, along with chat-history management.",
    links: {
      live: "https://chemistry-ai-chatbot-1.onrender.com",
      github: "https://github.com/Ishan1711/Chemistry-AI-Chatbot",
    },
  },
  {
    id: "securesys",
    name: "SecureSys",
    category: "Security / Systems",
    technologies: ["Python", "CustomTkinter", "RBAC"],
    description: "A sandboxed terminal emulator with a graphical interface for controlled system operations. It uses Role-Based Access Control to regulate command execution and system operations according to user permissions.",
    links: {
      github: "https://github.com/Tanvi566/Secure-System-Call-Interface",
    },
  },
];
