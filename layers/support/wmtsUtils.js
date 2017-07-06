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

define(["require","exports","../../geometry/Extent","../../geometry/Point","../../geometry/SpatialReference","../../geometry/support/WKIDUnitConversion","./TileInfo"],function(e,t,r,i,n,a,l){function o(e,t){e=e.replace(/ows:/gi,"");var r=new DOMParser,i=r.parseFromString(e,"text/xml"),n=i.documentElement,a=u("Contents",n);if(!a)return void console.error("The WMTS capabilities XML is not valid");var l,o,s,c=u("OperationsMetadata",n),m=c.querySelector("[name='GetTile']"),g=m.getElementsByTagName("Get"),v=Array.prototype.slice.call(g),x=t.serviceMode;v.some(function(e){var t=u("Constraint",e);return!t||f("AllowedValues","Value",x,t)?(o=e.attributes[0].nodeValue,!0):(!t||f("AllowedValues","Value","RESTful",t)?s=e.attributes[0].nodeValue:(!t||f("AllowedValues","Value","KVP",t))&&(l=e.attributes[0].nodeValue),!1)}),o||("KVP"===x&&s?(o=s,x="RESTful"):"RESTful"===x&&l&&(o=l,x="KVP")),-1===o.indexOf("/1.0.0/")&&"RESTful"===x&&(o+="/"),"KVP"===x&&(o+=o.indexOf("?")>-1?"":"?");var y=p("ServiceIdentification>AccessConstraints",n),T=Array.prototype.slice.call(a.getElementsByTagName("Layer")),h=T.map(function(e){var t=p("Identifier",e);return R[t]=e,d(t,e,a)});return{copyright:y,layers:h,tileUrl:o,serviceMode:x}}function s(e){var t=e.layers;return t.forEach(function(e){e.tileMatrixSets.forEach(function(e){var t=e.tileInfo;96!==t.dpi&&(t.lods.forEach(function(r){r.scale=96*r.scale/t.dpi,r.resolution=S(t.spatialReference.wkid,r.scale*V/96,e.id)}),t.dpi=96)})}),e}function u(e,t){var r=t.getElementsByTagName(e);return r&&r.length>0?r[0]:null}function c(e,t){var r=Array.prototype.slice.call(t.getElementsByTagName(e));return r.map(function(e){return e.textContent})}function p(e,t){var r=e.split(">");return r.forEach(function(e){t=u(e,t)}),t&&t.textContent}function f(e,t,r,i){var n,a=Array.prototype.slice.call(i.childNodes);return a.some(function(i){if(i.nodeName.indexOf(e)>-1){var a=u(t,i),l=a&&a.textContent;return l===r||r.split(":")&&r.split(":")[1]===l?(n=i,!0):!1}}),n}function d(e,t,r){var i=p("Abstract",t),n=c("Format",t),a=x(t),l=y(t),o=p("Title",t),s=T(t,r);return{id:e,fullExtent:a,description:i,formats:n,styles:l,title:o,tileMatrixSets:s}}function m(e){var t,r,i,n,a=[],l=R[e],o=Array.prototype.slice.call(l.getElementsByTagName("ResourceURL")),s=l.getElementsByTagName("Dimension");return s.length&&(t=p("Identifier",s[0]),r=c("Default",s[0])||c("Value",s[0])),s.length>1&&(i=p("Identifier",s[1]),n=c("Default",s[1])||c("Value",s[1])),C[e]={dimensions:r,dimensions2:n},o.forEach(function(e){var l=e.getAttribute("template");if(t&&r.length)if(l.indexOf("{"+t+"}")>-1)l=l.replace("{"+t+"}","{dimensionValue}");else{var o=l.toLowerCase().indexOf("{"+t.toLowerCase()+"}");o>-1&&(l=l.substring(0,o)+"{dimensionValue}"+l.substring(o+t.length+2))}if(i&&n.length)if(l.indexOf("{"+i+"}")>-1)l=l.replace("{"+i+"}","{dimensionValue2}");else{var o=l.toLowerCase().indexOf("{"+i.toLowerCase()+"}");o>-1&&(l=l.substring(0,o)+"{dimensionValue2}"+l.substring(o+i.length+2))}a.push({template:l,format:e.getAttribute("fomrat"),resourceType:e.getAttribute("resourceType")})}),a}function g(e,t,r,i,n,a){var l=m(e),o=C[e].dimensions&&C[e].dimensions[0],s=C[e].dimensions2&&C[e].dimensions2[0],u="";return l&&l.length>0&&(u=l[n%l.length].template.replace(/\{Style\}/gi,r).replace(/\{TileMatrixSet\}/gi,t).replace(/\{TileMatrix\}/gi,i).replace(/\{TileRow\}/gi,n).replace(/\{TileCol\}/gi,a).replace(/\{dimensionValue\}/gi,o).replace(/\{dimensionValue2\}/gi,s)),u}function v(e,t,r,i){var n=m(e),a="";if(n&&n.length>0){var l=C[e].dimensions&&C[e].dimensions[0],o=C[e].dimensions2&&C[e].dimensions2[0];a=n[0].template,a.indexOf(".xxx")===a.length-4&&(a=a.slice(0,a.length-4)),a=a.replace(/\{Style\}/gi,i),a=a.replace(/\{TileMatrixSet\}/gi,t),a=a.replace(/\{TileMatrix\}/gi,"{level}"),a=a.replace(/\{TileRow\}/gi,"{row}"),a=a.replace(/\{TileCol\}/gi,"{col}"),a=a.replace(/\{dimensionValue\}/gi,l),a=a.replace(/\{dimensionValue2\}/gi,o)}return a}function x(e){var t=u("WGS84BoundingBox",e),r=t?p("LowerCorner",t).split(" "):["-180","-90"],i=t?p("UpperCorner",t).split(" "):["180","90"];return{xmin:parseFloat(r[0]),ymin:parseFloat(r[1]),xmax:parseFloat(i[0]),ymax:parseFloat(i[1]),spatialReference:{wkid:4326}}}function y(e){var t=Array.prototype.slice.call(e.getElementsByTagName("Style"));return t.map(function(e){var t=u("LegendURL",e),r=u("Keywords",e),i=r&&c("Keyword",r),n={"abstract":p("Abstract",e),id:p("Identifier",e),isDefault:"true"===e.getAttribute("isDefault"),keywords:i,legendUrl:t&&t.getAttribute("xlink:href"),title:p("Title",e)};return n})}function T(e,t){var r=c("TileMatrixSet",e);return r.map(function(r){return h(r,e,t)})}function h(e,t,r){var i=f("TileMatrixSetLink","TileMatrixSet",e,t),n=c("TileMatrix",i),a=f("TileMatrixSet","Identifier",e,r),o=w(a),s=o.spatialReference,d=s.wkid,m=u("TileMatrix",a),g=[parseInt(p("TileWidth",m),10),parseInt(p("TileHeight",m),10)],v=[];if(n.length)n.forEach(function(t,r){var i=f("TileMatrix","Identifier",t,a);v.push(E(i,d,r,e))});else{var x=Array.prototype.slice.call(a.getElementsByTagName("TileMatrix"));x.forEach(function(t,r){v.push(E(t,d,r,e))})}var y=M(a,o,g,v[0]),T={id:e,fullExtent:y,tileInfo:new l({dpi:96,spatialReference:s,size:g,origin:o,lods:v})};return T}function w(e){var t=p("SupportedCRS",e);t&&(t=t.toLowerCase());var r=parseInt(t.split(":").pop(),10);(900913===r||3857===r)&&(r=102100);var a=!1;t.indexOf("crs84")>-1||t.indexOf("crs:84")>-1?(r=4326,a=!0):t.indexOf("crs83")>-1||t.indexOf("crs:83")>-1?(r=4269,a=!0):(t.indexOf("crs27")>-1||t.indexOf("crs:27")>-1)&&(r=4267,a=!0);var l,o=new n({wkid:r}),s=u("TileMatrix",e),c=p("TopLeftCorner",s).split(" "),f=c[0].split("E").map(function(e){return Number(e)}),d=c[1].split("E").map(function(e){return Number(e)}),m=f[0],g=d[0];f.length>1&&(m=f[0]*Math.pow(10,f[1])),d.length>1&&(g=d[0]*Math.pow(10,d[1]));var v=a&&4326===r&&90===m&&-180===g;return b.some(function(e,n){var s=Number(t.split(":").pop());return s>=e[0]&&s<=e[1]||4326===r&&(!a||v)?(l=new i(g,m,o),!0):(n===b.length-1&&(l=new i(m,g,o)),!1)}),l}function M(e,t,i,n){var a,l,o=u("BoundingBox",e);o&&(a=p("LowerCorner",o).split(" "),l=p("UpperCorner",o).split(" "));var s,c,f,d;if(a&&a.length>1&&l&&l.length>1)s=parseFloat(a[0]),f=parseFloat(a[1]),c=parseFloat(l[0]),d=parseFloat(l[1]);else{var m=u("TileMatrix",e),g=parseFloat(p("MatrixWidth",m)),v=parseFloat(p("MatrixHeight",m));s=t.x,d=t.y,c=s+g*i[0]*n.resolution,f=d-v*i[1]*n.resolution}return new r(s,f,c,d,t.spatialReference)}function E(e,t,r,i){var n,a=p("Identifier",e),l=p("ScaleDenominator",e),o=l.split("E").map(function(e){return Number(e)});n=o.length>1?o[0]*Math.pow(10,o[1]):o[0];var s=S(t,n,i);return n*=96/V,{level:r,levelValue:a,scale:n,resolution:s}}function S(e,t,r){var i;return i=a.hasOwnProperty(String(e))?a.values[a[e]]:"default028mm"===r?6370997*Math.PI/180:6378137*Math.PI/180,7*t/25e3/i}Object.defineProperty(t,"__esModule",{value:!0});var V=90.71428571428571,b=[[3819,3819],[3821,3824],[3889,3889],[3906,3906],[4001,4025],[4027,4036],[4039,4047],[4052,4055],[4074,4075],[4080,4081],[4120,4176],[4178,4185],[4188,4216],[4218,4289],[4291,4304],[4306,4319],[4322,4326],[4463,4463],[4470,4470],[4475,4475],[4483,4483],[4490,4490],[4555,4558],[4600,4646],[4657,4765],[4801,4811],[4813,4821],[4823,4824],[4901,4904],[5013,5013],[5132,5132],[5228,5229],[5233,5233],[5246,5246],[5252,5252],[5264,5264],[5324,5340],[5354,5354],[5360,5360],[5365,5365],[5370,5373],[5381,5381],[5393,5393],[5451,5451],[5464,5464],[5467,5467],[5489,5489],[5524,5524],[5527,5527],[5546,5546],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3038,3051],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3150,3151],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3389,3390],[3416,3417],[3833,3841],[3844,3850],[3854,3854],[3873,3885],[3907,3910],[4026,4026],[4037,4038],[4417,4417],[4434,4434],[4491,4554],[4839,4839],[5048,5048],[5105,5130],[5253,5259],[5269,5275],[5343,5349],[5479,5482],[5518,5519],[5520,5520],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],C=new Map,R=new Map;t.parseCapabilities=o,t.parseResourceInfo=s,t.getTileUrlFromResourceUrls=g,t.getTileUrlTemplateFromResourceUrls=v});