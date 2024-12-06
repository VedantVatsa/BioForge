import { HuggingFaceInference } from "@langchain/community/llms/hf";

export class AIService {
  constructor() {
    // Initialize with Hugging Face Inference API (free tier)
    this.model = new HuggingFaceInference({
      model: "gpt2", // or other free models
      apiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY,
      temperature: 0.7,
    });
  }

  async generateBioSuggestions(bioText) {
    try {
      const prompt = `Improve this professional bio: ${bioText}\n\nImproved version:`;
      const response = await this.model.call(prompt);
      return response.trim();
    } catch (error) {
      console.error("AI suggestion error:", error);
      return null;
    }
  }

  async analyzeTone(text) {
    try {
      const prompt = `Analyze the tone of this text and provide suggestions: ${text}`;
      const response = await this.model.call(prompt);
      return response.trim();
    } catch (error) {
      console.error("Tone analysis error:", error);
      return null;
    }
  }

  async suggestKeywords(industry, role) {
    try {
      const prompt = `Suggest professional keywords for a ${role} in ${industry}:`;
      const response = await this.model.call(prompt);
      return response.split(",").map((keyword) => keyword.trim());
    } catch (error) {
      console.error("Keyword suggestion error:", error);
      return [];
    }
  }
}
