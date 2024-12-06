export const generatorTypes = {
  Developer: {
    icon: "👨‍💻",
    title: "Tech Bio Generator",
    description:
      "Create a professional tech-focused bio highlighting your skills and achievements",
    templates: ["Developer", "OpenSource"],
    specialFields: {
      techStack: {
        suggestions: [
          "React",
          "Node.js",
          "Python",
          "AWS",
          "Docker",
          "TypeScript",
          "MongoDB",
        ],
        max: 8,
      },
      githubStats: {
        include: true,
        metrics: ["repositories", "contributions", "stars", "followers"],
      },
    },
  },

  Creative: {
    icon: "🎨",
    title: "Creative Bio Generator",
    description: "Design an engaging bio for creative professionals",
    templates: ["Artist", "Designer"],
    specialFields: {
      portfolio: {
        types: ["Behance", "Dribbble", "Instagram", "Personal Website"],
        format: "🎨 Portfolio: {link}",
      },
    },
  },

  Professional: {
    icon: "💼",
    title: "Business Bio Generator",
    description: "Generate a professional business-focused bio",
    templates: ["Executive", "Consultant"],
    specialFields: {
      industries: {
        max: 3,
        suggestions: [
          "Finance",
          "Technology",
          "Healthcare",
          "Education",
          "Marketing",
        ],
      },
    },
  },
};
