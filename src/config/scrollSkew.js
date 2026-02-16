// Scroll Skew Effect Configuration
export const scrollSkewConfig = {
  // Set to false to disable the scroll-skew effect entirely
  enabled: true,
  
  // Only enable on touch devices (mobile/tablet)
  touchDevicesOnly: true,
  
  // Advanced settings (only applies when enabled is true)
  velocityThreshold: 800,  // Minimum velocity (px/s) to trigger skew
  maxVelocity: 3000,       // Maximum velocity for skew mapping
  maxSkew: 2,              // Maximum skew angle in degrees
};
