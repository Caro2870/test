import packageJson from '../package.json';

export type ConfigValue = {
  appName: string;
  appVersion: string;
  workos: {
    clientId: string;
    apiHostname: string;
  };
  auth: {
    storageTokenKeyName: string;
  };
};

export const CONFIG: ConfigValue = {
  appName: 'Minimal UI',
  appVersion: packageJson.version,
  
  workos: {
    clientId: import.meta.env.VITE_WORKOS_CLIENT_ID || '',
    apiHostname: import.meta.env.VITE_WORKOS_API_HOSTNAME || 'api.workos.com',
  },

  auth: {
    storageTokenKeyName: 'accessToken',
  },
};