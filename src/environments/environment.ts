declare let require;
export const environment = {
  production: false,
  api: {
    basePath: '/api',
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
    rememberDisclaimerAcception: false,
    requireLogin: false,
    bookingsManagement: true,
    serviceWorker: false
  },
};
(window as any).package = require('../../package.json');
(window as any).env = environment;
