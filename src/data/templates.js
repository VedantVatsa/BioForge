// src/data/templates.js
export const templates = {
  professional: (data) =>
    `${data.name} | ${data.profession}\n🌍 ${data.location}\n🏆 ${data.achievement}\n💡 ${data.interests}\n🔗 ${data.website}`,
  creative: (data) =>
    `✨ ${data.name}\n🎨 Making magic in ${data.profession}\n📍 ${data.location}\n${data.achievement}\n🌟 ${data.interests}\n${data.website}`,
  minimal: (data) =>
    `${data.name} • ${data.profession}\n${data.location} • ${data.website}`,
  friendly: (data) =>
    `Hi, I'm ${data.name}! 👋\n${data.profession} passionate about ${data.interests}\n📍 ${data.location}\n${data.website}`,
};
