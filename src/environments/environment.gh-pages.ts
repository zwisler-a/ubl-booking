declare let require;
export const environment = {
  production: true,
  api: {
    basePath: 'https://demo.zwisler.dev/api',
    login: '/api/booking/login',
    logout: '/api/booking/logout',
    institution: '/api/booking/institutions',
    areas: '/api/booking/areas',
    timeslots: '/api/booking/timeslots',
    booking: '/booking-internal/booking/booking',
    strono: '/api/booking/storno',
    workload: '/api/booking/workload',
    bookings: '/api/booking/admin',
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
