// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.4/esri/copyright.txt for details.

define(["require","exports","dojo/_base/lang","../Symbol3D","./jsonUtils","./Thumbnail","./StyleOrigin","../../core/urlUtils","../../core/promiseUtils","../../core/Error","../../core/sniff","../../request","../../portal/Portal","../../portal/PortalQueryParams"],function(e,t,r,n,a,l,s,o,u,i,y,m,f,c){function b(e,t){e=o.normalize(o.makeAbsolute(e,t));var r=e.lastIndexOf("/");return-1===r?{url:e,base:e,filename:null}:{url:e,base:e.slice(0,r),filename:e.slice(r+1)}}function h(e,t){d(e,function(e){return o.makeAbsolute(e,t)})}function p(e,t){var r=e;r.symbolLayers&&r.symbolLayers.forEach(t)}function d(e,t){p(e,function(e){var r=e.resource;r&&r.href&&(r.href=t(r.href))})}function v(e,t){var r=t.resource.href,n=!y("esri-canvas-svg-support");return n&&e.styleOrigin&&T.test(r)?r.replace(T,"/resource/png/$1.png"):r}function g(e,t){return e=r.clone(e),h(e,t),a.fromJSON(e)}function w(e,t){var r=b(e,t&&t.url&&t.url.path);return x(r.url).then(function(t){return{reference:{styleUrl:e},data:t.data,base:r.base,filename:r.filename,styleUrl:e}})}function S(e,t){var r,n=t.portal||f.getDefault(),a=n.url+" - "+e;return E[a]?u.resolve(E[a]):U(e,n).then(function(e){return r=e,e.fetchData()}).then(function(t){var n={data:t,base:r.itemUrl,filename:"data",styleName:e};return E[a]=n,n})}function U(e,t){return t.load().then(function(){if(!t.stylesGroupQuery)throw new i("layer-templates:styles-group-query-missing","The styles group query needs to be configured in the portal to query styles");var e=new c({disableExtraQuery:!0,query:t.stylesGroupQuery});return t.queryGroups(e)}).then(function(t){var r=t.results;if(!r||!Array.isArray(r)||0===r.length)throw new i("layer-templates:styles-missing","The styles group does not contain any styles");var n=r[0],a=new c({disableExtraQuery:!0,query:'typekeywords:"'+e+'"'});return n.queryItems(a)}).then(function(t){var r=t.results;if(!r||!Array.isArray(r)||0===r.length)throw new i("layer-templates:style-missing","The style '${styleName}' is not part of the styles group",{styleName:e});return r[0].load()})}function N(e,t){return e.styleUrl?w(e.styleUrl,t):e.styleName?S(e.styleName,t):u.reject(new i("layer-templates:style-url-and-name-missing","Either styleUrl or styleName is required in layerDefinition"))}function j(e,t){return e.name?N(e,t).then(function(r){return q(r,e.name,t)}):u.reject(new i("layer-templates:style-symbol-reference-name-missing","Missing name in style symbol reference"))}function q(e,t,r){for(var a=e.data,y=function(a){if(a.name===t){var u=b(a.webRef,e.base);return{value:x(u.url).then(function(i){var y=g(i.data,u.base);if(y&&y.isInstanceOf(n)){if(a.thumbnail)if(a.thumbnail.href){var m=o.makeAbsolute(a.thumbnail.href,e.base);y.thumbnail=new l["default"]({url:m})}else a.thumbnail.imageData&&(y.thumbnail=new l["default"]({url:"data:image/png;base64,"+a.thumbnail.imageData}));e.styleUrl?y.styleOrigin=new s({portal:r.portal,styleUrl:e.styleUrl,name:t}):e.styleName&&(y.styleOrigin=new s({portal:r.portal,styleName:e.styleName,name:t}))}return y})}}},m=0,f=a.items;m<f.length;m++){var c=f[m],h=y(c);if("object"==typeof h)return h.value}return u.reject(new i("layer-templates:symbol-name-not-found","The symbol name '${symbolName}' could not be found",{symbolName:t}))}function O(e){var t=e.data;if(!t.symbolSetUrl)return u.reject(new i("layer-templates:symbol-set-url-missing","Style does not provide symbol set URL",{style:t}));var r=b(t.symbolSetUrl,e.base);return x(r.url).then(function(e){var n=e.data;if(0===n.length||!n[0].name)throw new i("layer-templates:symbol-set-missing-data","Invalid syntax or missing data in symbol set",{style:t});for(var a={},l=0;l<n.length;l++){var s=g(n[l],r.base);a[n[l].name]=s,n[l].name===t.defaultItem&&(a.defaultSymbol=s)}return a.defaultSymbol||(a.defaultSymbol=a[n[0].name]),a})}function A(e,t){return e?g(e,t&&t.url&&t.url.path):null}function I(e){for(var t=0,r=e.typeKeywords;t<r.length;t++){var n=r[t];if(/^Esri.*Style$/.test(n))return n}}function x(e){var t={responseType:"json"};return/\.json$/.test(e)||(t.query={f:"json"}),m(o.normalize(e),t)}function D(e){var t=e&&e.symbolLayers;return t?t.some(function(e){var t=e.type;return"object"===t||"path"===t||"extrude"===t}):!1}Object.defineProperty(t,"__esModule",{value:!0}),t.getIconHref=v,t.fetchStyleFromUrl=w;var E={};t.fetchStyle=N,t.fetchStyleSymbol=j,t.fetchSymbolFromStyle=q,t.fetchSymbolSet=O,t.createSymbol=A,t.styleNameFromItem=I,t.isVolumetricSymbol=D;var T=/\/resource\/(.*?)\.svg$/});