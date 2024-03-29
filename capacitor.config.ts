import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ODI',
  webDir: 'build',
  bundledWebRuntime: false,
  server: { 
    allowNavigation: [ 
      "*"
    ] 
  }
};

export default config;
