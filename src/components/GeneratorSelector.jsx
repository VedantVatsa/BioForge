import PropTypes from "prop-types";
import { generatorTypes } from "../data/generatorTypes";

export default function GeneratorSelector({ onSelect }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Bio Generator</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create the perfect professional bio for your social media profiles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {Object.entries(generatorTypes).map(([type, data]) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="group relative overflow-hidden rounded-xl bg-white p-6 
                     shadow-lg transition-all duration-300 hover:shadow-2xl 
                     hover:scale-105 border border-gray-100"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-50 
                          to-secondary-50 opacity-0 group-hover:opacity-10 
                          transition-opacity duration-300"
            />

            <div className="relative space-y-4">
              <div
                className="h-12 w-12 rounded-full bg-primary-100 
                           flex items-center justify-center"
              >
                <span className="text-2xl">{data.icon}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>

              <p className="text-sm text-gray-600">{data.description}</p>

              <div className="pt-2 text-xs text-primary-600 font-medium">
                {data.templates.length} templates available
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

GeneratorSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
