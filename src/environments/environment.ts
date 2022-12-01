// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'track-a-day',
    appId: '1:15072224673:web:b5978b1aaa97c13c6897e0',
    databaseURL: 'https://track-a-day-default-rtdb.firebaseio.com',
    storageBucket: 'track-a-day.appspot.com',
    apiKey: 'AIzaSyD8DXvXxmkkTdehZT8lZxEB70UNafb0pKg',
    authDomain: 'track-a-day.firebaseapp.com',
    messagingSenderId: '15072224673',
    measurementId: 'G-84E0YWQ582',
  },
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyD8DXvXxmkkTdehZT8lZxEB70UNafb0pKg",
    authDomain: "track-a-day.firebaseapp.com",
    projectId: "track-a-day",
    databaseURL: "https://track-a-day-default-rtdb.firebaseio.com",
    storageBucket: "track-a-day.appspot.com",
    messagingSenderId: "15072224673",
    appId: "1:15072224673:web:b5978b1aaa97c13c6897e0",
    measurementId: "G-84E0YWQ582"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
