import { api } from '../../electron/bridge'
import fs from 'fs';

declare global {
  interface Window {
    electron: typeof api,
  }
}