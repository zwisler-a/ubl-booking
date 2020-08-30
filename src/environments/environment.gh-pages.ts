declare let require;
export const environment = {
  production: true,
  api: {
    basePath: 'https://demo.zwisler.dev/api',
    login: '/booking/login',
    institution: '/booking/institutions',
    areas: '/booking/areas',
    timeslots: '/booking/timeslots',
    booking: '/booking/booking',
    strono: '/booking/storno',
    workload: '/booking/workload',
  },
  version: require('../../package.json').version,

  featureFlags: {
    rememberDisclaimerAcception: true,
    requireLogin: true,
    bookingsManagement: true,
    serviceWorker: true
  },
};
(window as any).package = require('../../package.json');
(window as any).env = environment;
