import { DefaultTheme } from 'react-native-paper';
import * as Font from 'expo-font';

// Define the paths to your font files
const fonts = {
  'space-grotesk-regular': require('./assets/fonts/SpaceGrotesk-Regular.ttf'),
  'space-grotesk-medium': require('./assets/fonts/SpaceGrotesk-Medium.ttf'),
  'space-grotesk-light': require('./assets/fonts/SpaceGrotesk-Light.ttf'),
};

// Load custom fonts asynchronously
async function loadFonts() {
  await Font.loadAsync(fonts);
}

// Load fonts before exporting the theme
loadFonts();

// Define the theme
const Theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: 'space-grotesk-regular',
    medium: 'space-grotesk-medium',
    light: 'space-grotesk-light',
  },
  colors: {
    ...DefaultTheme.colors,
    background: '#F6F4EB',
    primary: '#91C8E4',
    secondary: '#4682A9',
    blue: '#749BC2',
    white: '#FFFFFF',
    black: '#000000',
    bar: '#ADD9D8',
    card: '#FFE3B3',
    icons: '#749BC2'
  },
};

export default Theme;
