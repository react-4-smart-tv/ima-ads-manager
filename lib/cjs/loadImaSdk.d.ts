import type { google } from "./ima";
declare const loadImaSdk: (config?: {
    isDebug?: boolean;
}) => Promise<typeof google.ima>;
export default loadImaSdk;
