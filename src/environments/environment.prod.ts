declare let require;
export const environment = {
  production: true,
  api: {
    basePath: '/api',
    login: '/booking/login',
    logout: '/booking/logout',
    institution: '/booking/institutions',
    areas: '/booking/areas',
    timeslots: '/booking/timeslots',
    booking: '../booking-internal/booking/booking',
    strono: '/booking/storno',
    workload: '/booking/workload',
    bookings: '/booking/admin',
  },
  version: require('../../package.json').version,
  serviceWorker: 'sw-master.js',
  featureFlags: {
    rememberDisclaimerAcception: true,
    requireLogin: true,
    bookingsManagement: true,
    serviceWorker: true
  },
};
(window as any).package = require('../../package.json');
(window as any).env = environment;
