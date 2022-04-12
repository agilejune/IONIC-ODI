import { CapacitorConfig } from '@capacitor/cli';

const baseUrl = 'http://182.23.86.213:4000/odi';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ODI',
  webDir: 'build',
  bundledWebRuntime: false,
  server: { 
    allowNavigation: [ 
      `${baseUrl}/authenticate`,
      `${baseUrl}/shipment`,
      `${baseUrl}/order`,
      `${baseUrl}/feedback`,
      `${baseUrl}/transportloss_all`,
      `${baseUrl}/driver_detail`,
      `${baseUrl}/vehicle_detail`,
      `${baseUrl}/get_survey`,
      `${baseUrl}/slc_tank_spbu`,
      `${baseUrl}/slc_justify`,
      `${baseUrl}/transportloss`,
      `${baseUrl}/transportloss_ofline`,
      `${baseUrl}/slc_feedback`,
      `${baseUrl}/send_feedback`,
      `${baseUrl}/send_survey`,
      `${baseUrl}/send_transportloss_ofline`
    ] 
  }
};

export default config;
