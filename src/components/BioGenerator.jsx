import { useState, useEffect } from "react";
import { bioTemplates, fieldDefinitions } from "../data/advancedTemplates";
import { generatorTypes } from "../data/generatorTypes";
import GeneratorSelector from "./GeneratorSelector";
import RouteLoader from "./RouteLoader";
import { AIService } from "../services/aiService";
import toast from "react-hot-toast";

export default function BioGenerator() {
  const [generatorType, setGeneratorType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [generatedBio, setGeneratedBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const aiService = new AIService();

  useEffect(() => {
    if (generatorType) {
      const defaultTemplate = generatorTypes[generatorType].templates[0];
      setSelectedTemplate(defaultTemplate);
      initializeFormData(defaultTemplate);
    }
  }, [generatorType]);

  useEffect(() => {
    if (selectedTemplate) {
      initializeFormData(selectedTemplate);
    }
  }, [selectedTemplate]);

  const initializeFormData = (template) => {
    if (!bioTemplates[template]) return;

    const initialData = {};
    bioTemplates[template].fields.forEach((fieldKey) => {
      initialData[fieldKey] =
        fieldDefinitions[fieldKey].type === "array" ? [] : "";
    });
    setFormData(initialData);
    setGeneratedBio("");
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInput = (field, index, value) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    handleInputChange(field, newArray);
  };

  const addArrayItem = (field) => {
    const currentArray = formData[field] || [];
    if (currentArray.length < fieldDefinitions[field].max) {
      handleInputChange(field, [...currentArray, ""]);
    }
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    handleInputChange(field, newArray);
  };

  const validateForm = () => {
    if (!selectedTemplate || !bioTemplates[selectedTemplate]) return false;

    const newErrors = {};
    bioTemplates[selectedTemplate].fields.forEach((fieldKey) => {
      const field = fieldDefinitions[fieldKey];
      if (
        field.required &&
        (!formData[fieldKey] ||
          (Array.isArray(formData[fieldKey]) &&
            formData[fieldKey].length === 0))
      ) {
        newErrors[fieldKey] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateBio = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const template = bioTemplates[selectedTemplate];
      if (!template) throw new Error("Template not found");

      // Simulate loading for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const bio = template.template(formData);
      setGeneratedBio(bio);
      setCharCount(bio.length);
    } catch (error) {
      console.error("Error generating bio:", error);
      toast.error("Failed to generate bio");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
  };

  const handleAIAnalysis = async () => {
    if (!generatedBio) {
      toast.error("Please generate a bio first!");
      return;
    }

    setIsAnalyzing(true);
    try {
      // Show different loading messages during analysis
      const loadingMessages = [
        "Analyzing tone and style...",
        "Generating suggestions...",
        "Finding relevant keywords...",
      ];

      for (const message of loadingMessages) {
        RouteLoader({ message });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const suggestions = await aiService.generateBioSuggestions(generatedBio);
      const toneAnalysis = await aiService.analyzeTone(generatedBio);
      const keywords = await aiService.suggestKeywords(
        formData.industry || "technology",
        formData.role || "professional"
      );

      setAiSuggestions({
        improvedBio: suggestions,
        tone: toneAnalysis,
        keywords: keywords,
      });
      toast.success("AI analysis complete!");
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast.error("AI analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderForm = () => {
    if (!selectedTemplate || !bioTemplates[selectedTemplate]) return null;

    return (
      <form
        onSubmit={generateBio}
        className="space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bioTemplates[selectedTemplate].fields.map((fieldKey) => {
            const field = fieldDefinitions[fieldKey];
            return (
              <div key={fieldKey} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && (
                    <span className="text-primary-500">*</span>
                  )}
                </label>

                {field.type === "array" ? (
                  <div className="space-y-3">
                    {(formData[fieldKey] || []).map((item, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleArrayInput(fieldKey, index, e.target.value)
                          }
                          className="input-field"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem(fieldKey, index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {(!formData[fieldKey] ||
                      formData[fieldKey].length < field.max) && (
                      <button
                        type="button"
                        onClick={() => addArrayItem(fieldKey)}
                        className="inline-flex items-center space-x-2 text-sm text-primary-600 
                                 hover:text-primary-700 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span>Add {field.label}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <textarea
                    className="textarea-field"
                    placeholder="Enter your professional bio here..."
                    value={formData[fieldKey] || ""}
                    onChange={(e) =>
                      handleInputChange(fieldKey, e.target.value)
                    }
                  />
                )}

                {errors[fieldKey] && (
                  <p className="text-red-500 text-sm">{errors[fieldKey]}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition-colors"
          >
            Generate Bio
          </button>

          {charCount > 0 && bioTemplates[selectedTemplate] && (
            <span
              className={`text-sm ${
                charCount > bioTemplates[selectedTemplate].maxLength
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {charCount} / {bioTemplates[selectedTemplate].maxLength}{" "}
              characters
            </span>
          )}
        </div>
      </form>
    );
  };

  const renderHeader = () => {
    if (!generatorType) return null;

    return (
      <div
        className="sticky top-16 bg-white/70 backdrop-blur-lg z-40 
                    border-b border-gray-100 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Title with Icon */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
                <span className="text-2xl">
                  {generatorTypes[generatorType].icon}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {generatorTypes[generatorType].title}
                </h2>
                <p className="text-sm text-gray-500">
                  {generatorTypes[generatorType].description}
                </p>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => {
                setGeneratorType(null);
                setSelectedTemplate(null);
                setFormData({});
              }}
              className="group flex items-center space-x-2 px-5 py-2.5 rounded-xl
                       bg-white hover:bg-primary-50
                       border border-gray-100 hover:border-primary-100
                       transition-all duration-300 hover:shadow-lg
                       hover:shadow-primary-100"
            >
              <span className="text-lg transform group-hover:-translate-x-1 transition-transform text-primary-500">
                ←
              </span>
              <span
                className="font-medium text-gray-600 
                           group-hover:text-primary-600"
              >
                Change Generator Type
              </span>
            </button>
          </div>

          {/* Template Selection */}
          <div className="mt-8 flex flex-wrap gap-3">
            {generatorTypes[generatorType].templates.map((template) => (
              <button
                key={template}
                onClick={() => setSelectedTemplate(template)}
                className={`px-5 py-2.5 rounded-xl transition-all duration-300
                  ${
                    selectedTemplate === template
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-100"
                      : "bg-white hover:bg-primary-50 text-gray-600 hover:text-primary-600 border border-gray-100 hover:border-primary-100 hover:shadow-lg hover:shadow-primary-50"
                  }`}
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAISection = () => {
    if (!generatedBio) return null;

    return (
      <div className="mt-6 space-y-4">
        <button
          onClick={handleAIAnalysis}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg
                    hover:bg-primary-700 transition-colors duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? "Analyzing..." : "Get AI Suggestions"}
        </button>

        {aiSuggestions && (
          <div className="space-y-4 text-left">
            <div className="p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-primary-700">
                Improved Version
              </h3>
              <p className="mt-2 text-gray-700">{aiSuggestions.improvedBio}</p>
            </div>

            <div className="p-4 bg-secondary-50 rounded-lg">
              <h3 className="font-semibold text-secondary-700">
                Tone Analysis
              </h3>
              <p className="mt-2 text-gray-700">{aiSuggestions.tone}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">
                Suggested Keywords
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {aiSuggestions.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white rounded-full text-sm
                              text-primary-600 border border-primary-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pt-16 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4">
        {!generatorType ? (
          <GeneratorSelector onSelect={setGeneratorType} />
        ) : (
          <div className="space-y-8">
            {renderHeader()}

            <div className="py-8">
              {renderForm()}

              {generatedBio && (
                <div className="mt-8 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Your Generated Bio
                    </h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-xl
                               bg-primary-50 hover:bg-primary-100
                               text-primary-600 
                               transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      <span>Copy Bio</span>
                    </button>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <pre className="whitespace-pre-wrap break-words text-gray-600">
                      {generatedBio}
                    </pre>
                  </div>
                </div>
              )}
              {renderAISection()}
            </div>
          </div>
        )}
      </div>
      {isLoading && <RouteLoader />}
    </div>
  );
}
