import { useEffect, useState } from 'react';
import { isProduction, VITE_ENV } from '../config';
import { getAppVersion } from '../lib';

export default function AppInfo() {
  const [onlyClient, setOnlyClient] = useState(false);

  useEffect(() => {
    setOnlyClient(true);
  }, []);

  return (
    !isProduction &&
    onlyClient && (
      <div className="border-t border-red-200 text-center text-red-400 pt-4 mb-4">
        VERS: {getAppVersion()} ENV: {VITE_ENV}
      </div>
    )
  );
}
