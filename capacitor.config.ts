import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.premifarm.grower",
  appName: "Premifarm",
  webDir: "build",
  loggingBehavior: "debug",
  bundledWebRuntime: false,
  server: {
    androidScheme: "http",
    iosScheme: "http",
    cleartext: true,
    allowNavigation: ["http://192.168.4.1", "https://192.168.4.1", "http://192.168.191.193", "https://192.168.191.193"],
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
      
    },
  },
};

export default config;
