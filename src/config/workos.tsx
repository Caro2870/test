import { ReactNode } from 'react';
import { AuthKitProvider } from '@workos-inc/authkit-react';
import { CONFIG } from '../config-global';

interface WorkOSWrapperProps {
  children: ReactNode;
}

export const WorkOSWrapper = ({ children }: WorkOSWrapperProps) => (
  <AuthKitProvider 
    clientId={CONFIG.workos.clientId}
    apiHostname={CONFIG.workos.apiHostname}
  >
    {children}
  </AuthKitProvider>
);