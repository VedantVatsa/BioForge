import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();
  const [setActiveFeature] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Social Bio";

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  // Animation variants for sections
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      title: "Multiple Templates",
      description:
        "Choose from various professionally designed templates for different platforms and purposes.",
      icon: "🎨",
      color: "from-purple-600 to-indigo-600",
    },
    {
      title: "Easy Customization",
      description:
        "Personalize your bio with just a few clicks. Add your personal touch to stand out.",
      icon: "⚡",
      color: "from-pink-600 to-rose-600",
    },
    {
      title: "Platform Optimized",
      description:
        "Templates designed specifically for different social media platforms and professional networks.",
      icon: "🎯",
      color: "from-blue-600 to-cyan-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketing Manager",
      content:
        "BioForge helped me create the perfect professional bio for LinkedIn. Highly recommended!",
      avatar: "SJ",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Alex Chen",
      role: "Content Creator",
      content:
        "The creative templates are amazing! Made my Instagram bio stand out in minutes.",
      avatar: "AC",
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "Mike Brown",
      role: "Entrepreneur",
      content:
        "Simple, fast, and effective. Exactly what I needed for my Twitter profile.",
      avatar: "MB",
      color: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
        <div className="animate-blob absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="animate-blob animation-delay-4000 absolute -right-4 -bottom-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create Your Perfect
            <span
              className="block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 
                           bg-clip-text text-transparent animate-gradient bg-300% 
                           relative after:absolute after:inset-0 
                           after:bg-gradient-to-r after:from-transparent 
                           after:via-white/20 after:to-transparent 
                           after:animate-shine-text after:transform after:-skew-x-12"
            >
              {displayText}
              <span className="animate-blink">|</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Stand out from the crowd with professionally crafted bios for all
            your social media profiles.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => navigate("/templates")}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-xl font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[25deg] -translate-x-full group-hover:animate-shine" />
            </button>
            <button
              onClick={() => navigate("/generator")}
              className="px-8 py-4 border-2 border-gray-200 rounded-xl font-medium hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              Try Generator
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose BioForge?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Template", icon: "📝" },
              { step: "2", title: "Fill Details", icon: "✏️" },
              { step: "3", title: "Generate Bio", icon: "⚡" },
              { step: "4", title: "Copy & Use", icon: "✨" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {item.icon}
                </div>
                <div className="text-xl font-semibold mb-2">
                  Step {item.step}
                </div>
                <div className="text-gray-600">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold mr-4`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">
            Ready to Create Your Perfect Bio?
          </h2>
          <button
            onClick={() => navigate("/templates")}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-xl font-medium hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started Now</span>
            <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[25deg] -translate-x-full group-hover:animate-shine" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
