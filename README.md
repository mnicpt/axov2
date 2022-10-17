# AXO V2 Exploration

## Overview
This repo shows options on how we can provide a componentized option for mid to large merchants who want more flexibility to interact will PayPal rails. This if focussed on options to move forward with for AXO V2.

## Option 1: Zoid
Zoid provides a familiar integration style with iframes communicating through post messaging.  For individual components to be integrated on the merchant site, we will need to render very fast.  Iframes don't afford is the fastest way to render but do provide a sandboxed area on the page.  Iframes, at this time, are required for the paywall. Minified zoid library is 99kb.

## Option 2: Web Components
Web components provide a different way to integrate that allows the merchant to place an HTMLElement on their page. Web Components are supported across all modern browsers and do not require a library to be loaded. Web components also provide a sandboxed area on the page when mode is set to closed.

## Browser Support
https://caniuse.com/?search=web%20components

Some of the browsers that we support at PayPal, https://developer.paypal.com/reference/guidelines/browser-support/, do not support web components.  In these cases, we will need to provide polyfills. https://www.webcomponents.org/polyfills

## View Demo
Load node packages:
`npm i`
<br>
Load in browser:
`http://localhost.paypal.com:8080`


