/***************
**
**  NON-VUE PACKAGES
**
***************/

import mitt from 'mitt'


/***************
**
**  VUE BASICS
**
***************/

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
// ↑ app.mount('#app') done after adding emitter to app.config


/****************
**
**  ERROR LOGGING
**
****************/

let l = function (to_log) { 
	console.log(to_log) 
}
let lo = l


/****************
**
**  EVENT BUS
**
****************/

const bus = mitt()
lo("bus =")
lo(bus)
app.config.globalProperties.bus = bus
app.mount('#app')





/************
**
**  Firebase (service worker part )
**
*************/

// Register service worked in standard vanillla JS way
// 
// (Alt method at https://dev.to/vbanditv/how-to-add-fcm-firebase-cloud-messaging-to-vuejs-37np)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
	.then(reg => {
	  console.log(`Service Worker Registered (Scope: ${reg.scope})`);
	})
	.catch(error => {
	  const msg = `Service Worker Error (${error})`;
	  console.error(msg);
	});
} else {
  // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
  console.warn('Service Worker not available');
}


/************
**
**  Firebase
**  (recreating on the main app thread, 
**  in addition to the service worker)
**
*************/

import firebaseMessaging from './firebase'

// *******TO DO: get the below working in Vue 3 ******
// Vue.prototype.$messaging = firebaseMessaging

/*
Now you can access FCM instance everywhere in your application by calling this.$messaging. And this seems to work when I test it in created().

HOWEVER, because this is Vue 3 not 2, this.$messaging won't be accessible in composition's API setup() method. So dev.to suggests using the below, to merge into the basic Vue setup below it:

import firebaseMessaging from './firebase'

const app = createApp(App)

app.config.globalProperties.$messaging = firebaseMessaging

app.mount('#app')
*/




