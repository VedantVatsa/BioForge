import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../hooks/useTransition";
import toast, { Toaster } from "react-hot-toast";

const exampleBios = [
  {
    type: "Professional",
    example:
      "Sarah Johnson | Software Engineer 🚀\n🌍 San Francisco, CA\n🏆 Led 10+ successful projects\n💡 AI & Cloud Computing\n🔗 techblog.dev",
    theme: "from-blue-600 to-indigo-600",
    icon: "💼",
    bgLight: "bg-blue-50",
    category: "Business",
  },
  {
    type: "Creative",
    example:
      "✨ Alex Creative\n🎨 Digital Artist & Designer\n📍 NYC\n🏆 Featured in Adobe Gallery\n🌟 Creating magical experiences\n🎯 behance.net/alex",
    theme: "from-purple-600 to-pink-600",
    icon: "🎨",
    bgLight: "bg-purple-50",
    category: "Creative",
  },
  {
    type: "Minimal",
    example: "David Chen • Product Designer\nSF Bay Area • design.io",
    theme: "from-gray-700 to-gray-900",
    icon: "⚡",
    bgLight: "bg-gray-50",
    category: "Simple",
  },
  {
    type: "Friendly",
    example:
      "Hi, I'm Emma! 👋\nFood Blogger passionate about sustainable cooking\n📍 London\n🌱 Sharing eco-friendly recipes\n🔗 greenkitchen.com",
    theme: "from-green-600 to-teal-600",
    icon: "😊",
    bgLight: "bg-green-50",
    category: "Personal",
  },
  {
    type: "Tech",
    example:
      "Mark Roberts | 👨‍💻\n⚡ Full Stack Developer\n🛠 JavaScript, React, Node.js\n🚀 Building the future of web\n📫 github.com/markdev",
    theme: "from-cyan-600 to-blue-600",
    icon: "🚀",
    bgLight: "bg-cyan-50",
    category: "Tech",
  },
  {
    type: "Influencer",
    example:
      "✨ Lisa Style ✨\n👗 Fashion & Lifestyle\n📸 Daily inspo\n💌 300K+ Community\n🤝 Collab: lisa@style.com",
    theme: "from-rose-500 to-pink-500",
    icon: "⭐",
    bgLight: "bg-rose-50",
    category: "Social",
  },
];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { setSelectedTemplate } = useTransition();
  const [selectedCard, setSelectedCard] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [setPreviewBio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const categories = [
    "All",
    "Business",
    "Creative",
    "Simple",
    "Personal",
    "Tech",
    "Social",
  ];

  const filteredBios = exampleBios.filter((bio) => {
    const matchesFilter = filter === "All" || bio.category === filter;
    const matchesSearch =
      bio.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bio.example.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUseTemplate = async (template, index) => {
    setSelectedCard(index);
    setSelectedTemplate(template);

    // Show success toast
    toast.success("Template selected! Redirecting to generator...", {
      icon: "✨",
      duration: 2000,
    });

    // Animate card selection
    await new Promise((resolve) => setTimeout(resolve, 300));
    navigate("/generator");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="space-y-4 text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
          <p className="text-gray-600">Loading amazing templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <Toaster position="top-center" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent animate-gradient bg-300%">
            Choose Your Template
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates to create your
            perfect bio
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBios.map((bio, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ${
                selectedCard === index ? "scale-95 opacity-50" : ""
              }`}
              onMouseEnter={() => setPreviewBio(bio)}
              onMouseLeave={() => setPreviewBio(null)}
            >
              <div className="relative group h-full">
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                  {/* Card Header */}
                  <div
                    className={`bg-gradient-to-r ${bio.theme} p-6 text-white`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">
                        {bio.icon}
                      </span>
                      <h3 className="text-xl font-bold">{bio.type}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={`p-6 ${bio.bgLight} flex-grow flex flex-col`}>
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 mb-6 flex-grow">
                      {bio.example}
                    </pre>
                    <button
                      onClick={() => handleUseTemplate(bio, index)}
                      className={`w-full py-3 px-6 bg-gradient-to-r ${bio.theme} text-white rounded-xl font-medium 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 group`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Use Template
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredBios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No templates found matching your criteria.
            </p>
            <button
              onClick={() => {
                setFilter("All");
                setSearchTerm("");
              }}
              className="mt-4 text-primary-600 hover:text-primary-700"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
