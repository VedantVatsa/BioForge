export const bioTemplates = {
  // Developer Templates
  Developer: {
    fields: [
      "name",
      "profession",
      "currentRole",
      "company",
      "techStack",
      "achievements",
      "github",
      "contact",
    ],
    template: (data) =>
      `
👨‍💻 ${data.name} | ${data.profession}
⚡ ${data.currentRole} @${data.company}
🛠 Tech Stack: ${data.techStack.join(" • ")}
🚀 ${data.achievements.join("\n🎯 ")}
💻 ${data.github}
📫 ${data.contact}
    `.trim(),
    maxLength: 160,
  },

  OpenSource: {
    fields: [
      "name",
      "profession",
      "techStack",
      "contributions",
      "github",
      "projects",
      "contact",
    ],
    template: (data) =>
      `
${data.name} | Open Source Developer
🔧 ${data.techStack.join(" | ")}
📦 ${data.contributions} Contributions
🚀 Projects: ${data.projects.join(", ")}
📫 ${data.contact}
    `.trim(),
    maxLength: 160,
  },

  // Creative Templates
  Artist: {
    fields: [
      "name",
      "profession",
      "specialties",
      "portfolio",
      "achievements",
      "contact",
    ],
    template: (data) =>
      `
✨ ${data.name}
🎨 ${data.profession} • ${data.specialties}
🏆 ${data.achievements.join("\n💫 ")}
🎬 Portfolio: ${data.portfolio}
📩 ${data.contact}
    `.trim(),
    maxLength: 180,
  },

  Designer: {
    fields: [
      "name",
      "profession",
      "specialties",
      "portfolio",
      "tools",
      "contact",
    ],
    template: (data) =>
      `
${data.name} | ${data.profession}
🎨 Specializing in ${data.specialties}
🛠 Tools: ${data.tools.join(" • ")}
🔗 ${data.portfolio}
📫 ${data.contact}
    `.trim(),
    maxLength: 160,
  },

  // Professional Templates
  Executive: {
    fields: [
      "name",
      "currentRole",
      "company",
      "experience",
      "achievements",
      "contact",
    ],
    template: (data) =>
      `
${data.name}
${data.currentRole} at ${data.company}
${data.experience} years of leadership
• ${data.achievements.join("\n• ")}
Contact: ${data.contact}
    `.trim(),
    maxLength: 200,
  },

  Consultant: {
    fields: [
      "name",
      "specialties",
      "experience",
      "achievements",
      "industries",
      "contact",
    ],
    template: (data) =>
      `
${data.name} | Business Consultant
📊 ${data.specialties}
💼 ${data.experience} years in ${data.industries.join(", ")}
🏆 ${data.achievements.join("\n• ")}
📫 ${data.contact}
    `.trim(),
    maxLength: 180,
  },
};

export const fieldDefinitions = {
  name: { label: "Full Name", type: "text", required: true },
  profession: { label: "Profession", type: "text", required: true },
  currentRole: { label: "Current Role", type: "text", required: true },
  company: { label: "Company", type: "text", required: true },
  specialties: { label: "Specialties", type: "text", required: true },
  achievements: {
    label: "Achievements",
    type: "array",
    max: 3,
    required: true,
  },
  techStack: {
    label: "Tech Stack",
    type: "array",
    max: 5,
    required: true,
  },
  tools: {
    label: "Tools & Software",
    type: "array",
    max: 5,
    required: true,
  },
  projects: {
    label: "Projects",
    type: "array",
    max: 3,
    required: false,
  },
  contributions: { label: "Contributions", type: "number", required: false },
  github: { label: "GitHub Profile", type: "url", required: false },
  portfolio: { label: "Portfolio URL", type: "url", required: false },
  experience: { label: "Years of Experience", type: "number", required: true },
  industries: {
    label: "Industries",
    type: "array",
    max: 3,
    required: true,
  },
  contact: { label: "Contact Info", type: "text", required: true },
};
