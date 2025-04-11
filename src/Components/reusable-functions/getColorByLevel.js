export const getColorByLevel = (level) => {
    
  const colors = [
    // "#228B22", // Level 1 - Green
    // "#FF5733", // Level 2 - Red
    // "#3357FF", // Level 3 - Blue
    // "#FF33A1", // Level 4 - Pink
    // "#FFC300", // Level 5 - Yellow
    
    // "#333333", // Level 1 - Dark Gray (Readable Light Black)
    "#3357FF", // Level 3 - Blue
    "#4F4F4F", // Level 2 - Slightly Lighter Gray
    "#666666", // Level 3 - Medium Gray
    "#808080", // Level 4 - Neutral Gray
    "#A9A9A9", // Level 5 - Light Gray
  ];
  
  return colors[(level - 1) % colors.length]; // Cycle through colors
};
