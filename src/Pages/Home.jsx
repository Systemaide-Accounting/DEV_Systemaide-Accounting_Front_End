import companyLogo from "../assets/company-logo.gif";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import PropTypes from "prop-types";
import { HomeCards } from "../Components/HomeCards.jsx";

export function Home({ setOpenSidebar, setTransactionDropdown, setReportsDropdown, setLibraryDropdown, setUtilitiesDropdown }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();
  const filteredCards = HomeCards();

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleNavigation = (section) => {
    // Open the sidebar
    setOpenSidebar(true);
    
    let sectionElement;
    
    // Toggle the appropriate dropdown based on the section
    switch (section) {
      case 'transactions':
        setTransactionDropdown(prev => !prev);
        sectionElement = document.querySelector(`[data-section="${section}"]`);
        if (sectionElement) {
          // Remove any existing ring classes
          sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-purple-600', 'ring-green-600', 'ring-orange-600', 'ring-red-600', 'ring-opacity-75', 'ring-opacity-0');
          // Add blue highlight
          sectionElement.classList.add('ring-2', 'ring-blue-600', 'ring-opacity-75', 'transition-all', 'duration-400', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
          // Scroll into view smoothly if element is not visible
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            sectionElement.classList.remove('ring-opacity-75');
            sectionElement.classList.add('ring-opacity-0');
            setTimeout(() => {
              sectionElement.classList.remove('ring-opacity-0');
              sectionElement.classList.add('ring-opacity-75');
              setTimeout(() => {
                sectionElement.classList.remove('ring-opacity-75');
                sectionElement.classList.add('ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out');
                setTimeout(() => {
                  sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
                }, 1000);
              }, 400);
            }, 400);
          }, 400);
        }
        break;
      case 'reports':
        setReportsDropdown(prev => !prev);
        sectionElement = document.querySelector(`[data-section="${section}"]`);
        if (sectionElement) {
          // Remove any existing ring classes
          sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-purple-600', 'ring-green-600', 'ring-orange-600', 'ring-red-600', 'ring-opacity-75', 'ring-opacity-0');
          // Add blue highlight
          sectionElement.classList.add('ring-2', 'ring-blue-600', 'ring-opacity-75', 'transition-all', 'duration-400', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
          // Scroll into view smoothly if element is not visible
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            sectionElement.classList.remove('ring-opacity-75');
            sectionElement.classList.add('ring-opacity-0');
            setTimeout(() => {
              sectionElement.classList.remove('ring-opacity-0');
              sectionElement.classList.add('ring-opacity-75');
              setTimeout(() => {
                sectionElement.classList.remove('ring-opacity-75');
                sectionElement.classList.add('ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out');
                setTimeout(() => {
                  sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
                }, 1000);
              }, 400);
            }, 400);
          }, 400);
        }
        break;
      case 'library':
        setLibraryDropdown(prev => !prev);
        sectionElement = document.querySelector(`[data-section="${section}"]`);
        if (sectionElement) {
          // Remove any existing ring classes
          sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-purple-600', 'ring-green-600', 'ring-orange-600', 'ring-red-600', 'ring-opacity-75', 'ring-opacity-0');
          // Add blue highlight
          sectionElement.classList.add('ring-2', 'ring-blue-600', 'ring-opacity-75', 'transition-all', 'duration-400', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
          // Scroll into view smoothly if element is not visible
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            sectionElement.classList.remove('ring-opacity-75');
            sectionElement.classList.add('ring-opacity-0');
            setTimeout(() => {
              sectionElement.classList.remove('ring-opacity-0');
              sectionElement.classList.add('ring-opacity-75');
              setTimeout(() => {
                sectionElement.classList.remove('ring-opacity-75');
                sectionElement.classList.add('ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out');
                setTimeout(() => {
                  sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
                }, 1000);
              }, 400);
            }, 400);
          }, 400);
        }
        break;
      case 'utilities':
        setUtilitiesDropdown(prev => !prev);
        sectionElement = document.querySelector(`[data-section="${section}"]`);
        if (sectionElement) {
          // Remove any existing ring classes
          sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-purple-600', 'ring-green-600', 'ring-orange-600', 'ring-red-600', 'ring-opacity-75', 'ring-opacity-0');
          // Add blue highlight
          sectionElement.classList.add('ring-2', 'ring-blue-600', 'ring-opacity-75', 'transition-all', 'duration-400', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
          // Scroll into view smoothly if element is not visible
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            sectionElement.classList.remove('ring-opacity-75');
            sectionElement.classList.add('ring-opacity-0');
            setTimeout(() => {
              sectionElement.classList.remove('ring-opacity-0');
              sectionElement.classList.add('ring-opacity-75');
              setTimeout(() => {
                sectionElement.classList.remove('ring-opacity-75');
                sectionElement.classList.add('ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out');
                setTimeout(() => {
                  sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
                }, 1000);
              }, 400);
            }, 400);
          }, 400);
        }
        break;
      case 'system':
        sectionElement = document.querySelector(`[data-section="${section}"]`);
        if (sectionElement) {
          // Remove any existing ring classes
          sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-purple-600', 'ring-green-600', 'ring-orange-600', 'ring-red-600', 'ring-opacity-75', 'ring-opacity-0');
          // Add blue highlight
          sectionElement.classList.add('ring-2', 'ring-blue-600', 'ring-opacity-75', 'transition-all', 'duration-400', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
          // Scroll into view smoothly if element is not visible
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            sectionElement.classList.remove('ring-opacity-75');
            sectionElement.classList.add('ring-opacity-0');
            setTimeout(() => {
              sectionElement.classList.remove('ring-opacity-0');
              sectionElement.classList.add('ring-opacity-75');
              setTimeout(() => {
                sectionElement.classList.remove('ring-opacity-75');
                sectionElement.classList.add('ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out');
                setTimeout(() => {
                  sectionElement.classList.remove('ring-2', 'ring-blue-600', 'ring-opacity-0', 'transition-all', 'duration-1000', 'ease-in-out', 'rounded-xl', 'relative', 'z-[9999]');
                }, 1000);
              }, 400);
            }, 400);
          }, 400);
        }
        break;
      default:
        break;
    }
    
    // Store the section in localStorage for sidebar to read
    localStorage.setItem('activeSection', section);
    
    // Navigate to home to ensure we're on the right page
    if (section !== 'system') {
      navigate('/home');
    } else {
      // For system-config, navigate and scroll to the system section
      navigate('/system-config', { replace: true });
      const systemSection = document.querySelector('[data-section="system"]');
      if (systemSection) {
        systemSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-[92vh] bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 px-2 font-poppins">
      <div className="max-w-5xl mx-auto px-2">
        {/* Welcome Section */}
        <div className="backdrop-blur-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-10 mb-12 transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex justify-center mb-6">
            <img
              src={companyLogo}
              alt="Company Logo"
              className="w-48 h-48 object-contain transition-opacity duration-300 hover:opacity-90"
            />
          </div>

          <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight animate-fade-in [animation-duration:1.5s]">
            Welcome to Our Platform
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 text-base">
            Your trusted partner in business solutions.
          </p>
        </div>

        {/* Shortcut Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="group aspect-square backdrop-blur-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative max-w-[320px] mx-auto"
            >
              {/* Card Content */}
              <div className="h-full flex flex-col">
                {/* Card Header */}
                <div
                  className={`p-6 flex-1 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                    expandedCard === card.id ? `bg-${card.color}-50 dark:bg-${card.color}-900/20` : ""
                  }`}
                  onClick={() => toggleCard(card.id)}
                >
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <h2 className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                    card.id === "transactions" ? "text-blue-600 dark:text-blue-400" :
                    card.id === "reports" ? "text-purple-600 dark:text-purple-400" :
                    card.id === "library" ? "text-green-600 dark:text-green-400" :
                    card.id === "utilities" ? "text-orange-600 dark:text-orange-400" :
                    card.id === "system" ? "text-red-600 dark:text-red-400" : ""
                  }`}>
                    {card.title}
                  </h2>
                  <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                    {card.description}
                  </p>
                </div>

                {/* Expandable Content */}
                {expandedCard === card.id && (
                  <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-6 flex flex-col animate-fade-in z-[9999]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold text-${card.color}-600 dark:text-${card.color}-400 tracking-tight`}>
                        {card.title}
                      </h3>
                      <button
                        onClick={() => toggleCard(card.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <div className="space-y-4">
                        {card.features.map((feature, index) => (
                          feature.type === "header" ? (
                            <h4 key={index} className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">{feature.description}</h4>
                          ) : feature.path ? (
                            <button
                              key={index}
                              onClick={() => {
                                setOpenSidebar(true);
                                navigate(feature.path);
                              }}
                              className={`flex items-center gap-3 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-${card.color}-500 focus:ring-offset-2 ${
                                card.id === "transactions" ? "hover:text-blue-600 dark:hover:text-blue-400" :
                                card.id === "reports" ? "hover:text-purple-600 dark:hover:text-purple-400" :
                                card.id === "library" ? "hover:text-green-600 dark:hover:text-green-400" :
                                card.id === "utilities" ? "hover:text-orange-600 dark:hover:text-orange-400" :
                                card.id === "system" ? "hover:text-red-600 dark:hover:text-red-400" : ""
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                              {feature.description}
                            </button>
                          ) : (
                            <div
                              key={index}
                              className={`flex items-center gap-3 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                card.id === "transactions" ? "hover:text-blue-600 dark:hover:text-blue-400" :
                                card.id === "reports" ? "hover:text-purple-600 dark:hover:text-purple-400" :
                                card.id === "library" ? "hover:text-green-600 dark:hover:text-green-400" :
                                card.id === "utilities" ? "hover:text-orange-600 dark:hover:text-orange-400" :
                                card.id === "system" ? "hover:text-red-600 dark:hover:text-red-400" : ""
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                              {feature.description}
                            </div>
                          )
                        ))}
                      </div>
                      <button
                        onClick={() => handleNavigation(card.section)}
                        className={`block w-full mt-6 text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                          card.id === "transactions" ? "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30" :
                          card.id === "reports" ? "bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30" :
                          card.id === "library" ? "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30" :
                          card.id === "utilities" ? "bg-orange-50 text-orange-600 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30" :
                          card.id === "system" ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30" : ""
                        }`}
                      >
                        Go to {card.title}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  setOpenSidebar: PropTypes.func.isRequired,
  setTransactionDropdown: PropTypes.func.isRequired,
  setReportsDropdown: PropTypes.func.isRequired,
  setLibraryDropdown: PropTypes.func.isRequired,
  setUtilitiesDropdown: PropTypes.func.isRequired
};