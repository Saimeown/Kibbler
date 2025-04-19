// @/constants/icons.ts

// 1. Define all possible icon names as a type
export type IconName =
    | 'home-light' | 'home-dark'
    | 'settings-light' | 'settings-dark'
    | 'camera-light' | 'camera-dark'
    | 'notification-light' | 'notification-dark'
    | 'profile-light' | 'profile-dark'
    // New dashboard icons
    | 'power-adapter'
    | 'battery'
    | 'food-bowl'
    | 'feeding-stats'
    | 'pet-collar'
    | 'food-level'
    | 'feeding-history'
    | 'warning'
    | 'error'
    | 'info'
    | 'cat-profile'
    | 'chevron-right'
    | 'help'
    | 'security'
    | 'paw'
    | 'plus'
    | 'check-paw'
    | 'solar-panel'
    | 'rfid'
    | 'clock'
    | 'preferences'
    | 'moon'
    | 'message'

// 2. Create the icons object using require()
export const icons: Record<IconName, any> = {
  // Light/Dark variants for tabs
  'home-light': require('@/assets/icons/home-light.png'),
  'home-dark': require('@/assets/icons/home-dark.png'),
  'settings-light': require('@/assets/icons/settings-light.png'),
  'settings-dark': require('@/assets/icons/settings-dark.png'),
  'camera-light': require('@/assets/icons/camera-light.png'),
  'camera-dark': require('@/assets/icons/camera-dark.png'),
  'notification-light': require('@/assets/icons/notification-light.png'),
  'notification-dark': require('@/assets/icons/notification-dark.png'),
  'profile-light': require('@/assets/icons/profile-light.png'),
  'profile-dark': require('@/assets/icons/profile-dark.png'),

  // Dashboard icons
  'power-adapter': require('@/assets/icons/power-adapter.png'),
  'battery': require('@/assets/icons/battery.png'),
  'food-bowl': require('@/assets/icons/food-bowl.png'),
  'feeding-stats': require('@/assets/icons/feeding-stats.png'),
  'pet-collar': require('@/assets/icons/pet-collar.png'),
  'food-level': require('@/assets/icons/food-level.png'),
  'feeding-history': require('@/assets/icons/feeding-history.png'),
  'warning': require('@/assets/icons/warning.png'),
  'error': require('@/assets/icons/error.png'),
  'info': require('@/assets/icons/info.png'),
  'cat-profile': require('@/assets/icons/cat-profile.png'),
  'chevron-right': require('@/assets/icons/chevron-right.png'),
  'help': require('@/assets/icons/help.png'),
  'security': require('@/assets/icons/security.png'),
  'paw': require('@/assets/icons/paw.png'),
  'plus': require('@/assets/icons/plus.png'),
  'check-paw': require('@/assets/icons/check-paw.png'),
  'solar-panel': require('@/assets/icons/solar-panel.png'),
  'rfid': require('@/assets/icons/rfid.png'),
  'clock': require('@/assets/icons/clock.png'),
  'preferences': require('@/assets/icons/preferences.png'),
  'moon': require('@/assets/icons/moon.png'),
  'message': require('@/assets/icons/message.png'),



};

// 3. Helper function for light/dark icons
export const getIcon = (baseName: string, focused: boolean): any => {
  const iconKey = `${baseName}-${focused ? 'dark' : 'light'}` as IconName;
  return icons[iconKey] || icons[baseName as IconName]; // Fallback to base if no variant exists
};
