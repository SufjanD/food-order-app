(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const v={get(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}},set(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}},remove(e){localStorage.removeItem(e)},clear(){localStorage.clear()}},ie="bb_users",ee="bb_session";function Xt(){const e=v.get(ie)||[];e.find(t=>t.email==="demo@bitebridge.com")||(e.push({id:"demo-001",name:"Demo User",email:"demo@bitebridge.com",password:"demo1234",createdAt:new Date().toISOString()}),v.set(ie,e))}Xt();const D={register({name:e,email:t,password:r}){const n=v.get(ie)||[];if(n.find(l=>l.email===t))return{ok:!1,error:"Email already registered."};const s={id:`u-${Date.now()}`,name:e,email:t,password:r,createdAt:new Date().toISOString()};n.push(s),v.set(ie,n);const{password:o,...i}=s;return v.set(ee,i),{ok:!0,user:i}},login({email:e,password:t}){const n=(v.get(ie)||[]).find(i=>i.email===e&&i.password===t);if(!n)return{ok:!1,error:"Invalid email or password."};const{password:s,...o}=n;return v.set(ee,o),{ok:!0,user:o}},logout(){v.remove(ee)},getUser(){return v.get(ee)},isLoggedIn(){return!!v.get(ee)}},te={};let et=null;const $={register(e,t){te[e]=t},navigate(e){window.location.hash=e},init(){window.addEventListener("hashchange",()=>this._resolve()),this._resolve()},_resolve(){const e=window.location.hash.replace("#","")||"/",t=["/dashboard","/cart","/orders"],r=["/login","/register"];if(t.includes(e)&&!D.isLoggedIn()){this.navigate("/login");return}if(r.includes(e)&&D.isLoggedIn()){this.navigate("/menu");return}et=e;const n=te[e]||te["/404"];n?n():te["/"]&&te["/"](),window.scrollTo(0,0)},getCurrentRoute(){return et}};function wt(e,t){return function(){return e.apply(t,arguments)}}const{toString:Qt}=Object.prototype,{getPrototypeOf:je}=Object,{iterator:Oe,toStringTag:Et}=Symbol,Ae=(e=>t=>{const r=Qt.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),U=e=>(e=e.toLowerCase(),t=>Ae(t)===e),Ce=e=>t=>typeof t===e,{isArray:Q}=Array,X=Ce("undefined");function de(e){return e!==null&&!X(e)&&e.constructor!==null&&!X(e.constructor)&&x(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const St=U("ArrayBuffer");function Zt(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&St(e.buffer),t}const er=Ce("string"),x=Ce("function"),Rt=Ce("number"),ue=e=>e!==null&&typeof e=="object",tr=e=>e===!0||e===!1,ve=e=>{if(Ae(e)!=="object")return!1;const t=je(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Et in e)&&!(Oe in e)},rr=e=>{if(!ue(e)||de(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},nr=U("Date"),sr=U("File"),or=e=>!!(e&&typeof e.uri<"u"),ir=e=>e&&typeof e.getParts<"u",ar=U("Blob"),lr=U("FileList"),cr=e=>ue(e)&&x(e.pipe);function dr(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const tt=dr(),rt=typeof tt.FormData<"u"?tt.FormData:void 0,ur=e=>{let t;return e&&(rt&&e instanceof rt||x(e.append)&&((t=Ae(e))==="formdata"||t==="object"&&x(e.toString)&&e.toString()==="[object FormData]"))},fr=U("URLSearchParams"),[pr,mr,hr,gr]=["ReadableStream","Request","Response","Headers"].map(U),br=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function fe(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let n,s;if(typeof e!="object"&&(e=[e]),Q(e))for(n=0,s=e.length;n<s;n++)t.call(null,e[n],n,e);else{if(de(e))return;const o=r?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let l;for(n=0;n<i;n++)l=o[n],t.call(null,e[l],l,e)}}function Ot(e,t){if(de(e))return null;t=t.toLowerCase();const r=Object.keys(e);let n=r.length,s;for(;n-- >0;)if(s=r[n],t===s.toLowerCase())return s;return null}const J=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,At=e=>!X(e)&&e!==J;function Fe(){const{caseless:e,skipUndefined:t}=At(this)&&this||{},r={},n=(s,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const i=e&&Ot(r,o)||o;ve(r[i])&&ve(s)?r[i]=Fe(r[i],s):ve(s)?r[i]=Fe({},s):Q(s)?r[i]=s.slice():(!t||!X(s))&&(r[i]=s)};for(let s=0,o=arguments.length;s<o;s++)arguments[s]&&fe(arguments[s],n);return r}const yr=(e,t,r,{allOwnKeys:n}={})=>(fe(t,(s,o)=>{r&&x(s)?Object.defineProperty(e,o,{value:wt(s,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:n}),e),vr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),wr=(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},Er=(e,t,r,n)=>{let s,o,i;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!n||n(i,e,t))&&!l[i]&&(t[i]=e[i],l[i]=!0);e=r!==!1&&je(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},Sr=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return n!==-1&&n===r},Rr=e=>{if(!e)return null;if(Q(e))return e;let t=e.length;if(!Rt(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},Or=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&je(Uint8Array)),Ar=(e,t)=>{const n=(e&&e[Oe]).call(e);let s;for(;(s=n.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},Cr=(e,t)=>{let r;const n=[];for(;(r=e.exec(t))!==null;)n.push(r);return n},Tr=U("HTMLFormElement"),xr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,n,s){return n.toUpperCase()+s}),nt=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),Lr=U("RegExp"),Ct=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};fe(r,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(n[o]=i||s)}),Object.defineProperties(e,n)},$r=e=>{Ct(e,(t,r)=>{if(x(e)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const n=e[r];if(x(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},Pr=(e,t)=>{const r={},n=s=>{s.forEach(o=>{r[o]=!0})};return Q(e)?n(e):n(String(e).split(t)),r},Br=()=>{},Nr=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function _r(e){return!!(e&&x(e.append)&&e[Et]==="FormData"&&e[Oe])}const Ir=e=>{const t=new Array(10),r=(n,s)=>{if(ue(n)){if(t.indexOf(n)>=0)return;if(de(n))return n;if(!("toJSON"in n)){t[s]=n;const o=Q(n)?[]:{};return fe(n,(i,l)=>{const f=r(i,s+1);!X(f)&&(o[l]=f)}),t[s]=void 0,o}}return n};return r(e,0)},Dr=U("AsyncFunction"),Fr=e=>e&&(ue(e)||x(e))&&x(e.then)&&x(e.catch),Tt=((e,t)=>e?setImmediate:t?((r,n)=>(J.addEventListener("message",({source:s,data:o})=>{s===J&&o===r&&n.length&&n.shift()()},!1),s=>{n.push(s),J.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",x(J.postMessage)),Ur=typeof queueMicrotask<"u"?queueMicrotask.bind(J):typeof process<"u"&&process.nextTick||Tt,kr=e=>e!=null&&x(e[Oe]),a={isArray:Q,isArrayBuffer:St,isBuffer:de,isFormData:ur,isArrayBufferView:Zt,isString:er,isNumber:Rt,isBoolean:tr,isObject:ue,isPlainObject:ve,isEmptyObject:rr,isReadableStream:pr,isRequest:mr,isResponse:hr,isHeaders:gr,isUndefined:X,isDate:nr,isFile:sr,isReactNativeBlob:or,isReactNative:ir,isBlob:ar,isRegExp:Lr,isFunction:x,isStream:cr,isURLSearchParams:fr,isTypedArray:Or,isFileList:lr,forEach:fe,merge:Fe,extend:yr,trim:br,stripBOM:vr,inherits:wr,toFlatObject:Er,kindOf:Ae,kindOfTest:U,endsWith:Sr,toArray:Rr,forEachEntry:Ar,matchAll:Cr,isHTMLForm:Tr,hasOwnProperty:nt,hasOwnProp:nt,reduceDescriptors:Ct,freezeMethods:$r,toObjectSet:Pr,toCamelCase:xr,noop:Br,toFiniteNumber:Nr,findKey:Ot,global:J,isContextDefined:At,isSpecCompliantForm:_r,toJSONObject:Ir,isAsyncFn:Dr,isThenable:Fr,setImmediate:Tt,asap:Ur,isIterable:kr};let g=class xt extends Error{static from(t,r,n,s,o,i){const l=new xt(t.message,r||t.code,n,s,o);return l.cause=t,l.name=t.name,t.status!=null&&l.status==null&&(l.status=t.status),i&&Object.assign(l,i),l}constructor(t,r,n,s,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),n&&(this.config=n),s&&(this.request=s),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.status}}};g.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";g.ERR_BAD_OPTION="ERR_BAD_OPTION";g.ECONNABORTED="ECONNABORTED";g.ETIMEDOUT="ETIMEDOUT";g.ERR_NETWORK="ERR_NETWORK";g.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";g.ERR_DEPRECATED="ERR_DEPRECATED";g.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";g.ERR_BAD_REQUEST="ERR_BAD_REQUEST";g.ERR_CANCELED="ERR_CANCELED";g.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";g.ERR_INVALID_URL="ERR_INVALID_URL";const Mr=null;function Ue(e){return a.isPlainObject(e)||a.isArray(e)}function Lt(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function Pe(e,t,r){return e?e.concat(t).map(function(s,o){return s=Lt(s),!r&&o?"["+s+"]":s}).join(r?".":""):t}function qr(e){return a.isArray(e)&&!e.some(Ue)}const jr=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function Te(e,t,r){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=a.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,p){return!a.isUndefined(p[h])});const n=r.metaTokens,s=r.visitor||c,o=r.dots,i=r.indexes,f=(r.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function u(d){if(d===null)return"";if(a.isDate(d))return d.toISOString();if(a.isBoolean(d))return d.toString();if(!f&&a.isBlob(d))throw new g("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(d)||a.isTypedArray(d)?f&&typeof Blob=="function"?new Blob([d]):Buffer.from(d):d}function c(d,h,p){let w=d;if(a.isReactNative(t)&&a.isReactNativeBlob(d))return t.append(Pe(p,h,o),u(d)),!1;if(d&&!p&&typeof d=="object"){if(a.endsWith(h,"{}"))h=n?h:h.slice(0,-2),d=JSON.stringify(d);else if(a.isArray(d)&&qr(d)||(a.isFileList(d)||a.endsWith(h,"[]"))&&(w=a.toArray(d)))return h=Lt(h),w.forEach(function(E,C){!(a.isUndefined(E)||E===null)&&t.append(i===!0?Pe([h],C,o):i===null?h:h+"[]",u(E))}),!1}return Ue(d)?!0:(t.append(Pe(p,h,o),u(d)),!1)}const m=[],b=Object.assign(jr,{defaultVisitor:c,convertValue:u,isVisitable:Ue});function S(d,h){if(!a.isUndefined(d)){if(m.indexOf(d)!==-1)throw Error("Circular reference detected in "+h.join("."));m.push(d),a.forEach(d,function(w,B){(!(a.isUndefined(w)||w===null)&&s.call(t,w,a.isString(B)?B.trim():B,h,b))===!0&&S(w,h?h.concat(B):[B])}),m.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return S(e),t}function st(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(n){return t[n]})}function He(e,t){this._pairs=[],e&&Te(e,this,t)}const $t=He.prototype;$t.append=function(t,r){this._pairs.push([t,r])};$t.toString=function(t){const r=t?function(n){return t.call(this,n,st)}:st;return this._pairs.map(function(s){return r(s[0])+"="+r(s[1])},"").join("&")};function Hr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Pt(e,t,r){if(!t)return e;const n=r&&r.encode||Hr,s=a.isFunction(r)?{serialize:r}:r,o=s&&s.serialize;let i;if(o?i=o(t,s):i=a.isURLSearchParams(t)?t.toString():new He(t,s).toString(n),i){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class ot{constructor(){this.handlers=[]}use(t,r,n){return this.handlers.push({fulfilled:t,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(n){n!==null&&t(n)})}}const ze={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},zr=typeof URLSearchParams<"u"?URLSearchParams:He,Jr=typeof FormData<"u"?FormData:null,Vr=typeof Blob<"u"?Blob:null,Wr={isBrowser:!0,classes:{URLSearchParams:zr,FormData:Jr,Blob:Vr},protocols:["http","https","file","blob","url","data"]},Je=typeof window<"u"&&typeof document<"u",ke=typeof navigator=="object"&&navigator||void 0,Kr=Je&&(!ke||["ReactNative","NativeScript","NS"].indexOf(ke.product)<0),Yr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Gr=Je&&window.location.href||"http://localhost",Xr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Je,hasStandardBrowserEnv:Kr,hasStandardBrowserWebWorkerEnv:Yr,navigator:ke,origin:Gr},Symbol.toStringTag,{value:"Module"})),R={...Xr,...Wr};function Qr(e,t){return Te(e,new R.classes.URLSearchParams,{visitor:function(r,n,s,o){return R.isNode&&a.isBuffer(r)?(this.append(n,r.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Zr(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function en(e){const t={},r=Object.keys(e);let n;const s=r.length;let o;for(n=0;n<s;n++)o=r[n],t[o]=e[o];return t}function Bt(e){function t(r,n,s,o){let i=r[o++];if(i==="__proto__")return!0;const l=Number.isFinite(+i),f=o>=r.length;return i=!i&&a.isArray(s)?s.length:i,f?(a.hasOwnProp(s,i)?s[i]=[s[i],n]:s[i]=n,!l):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(r,n,s[i],o)&&a.isArray(s[i])&&(s[i]=en(s[i])),!l)}if(a.isFormData(e)&&a.isFunction(e.entries)){const r={};return a.forEachEntry(e,(n,s)=>{t(Zr(n),s,r,0)}),r}return null}function tn(e,t,r){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(e)}const pe={transitional:ze,adapter:["xhr","http","fetch"],transformRequest:[function(t,r){const n=r.getContentType()||"",s=n.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s?JSON.stringify(Bt(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t)||a.isReadableStream(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return Qr(t,this.formSerializer).toString();if((l=a.isFileList(t))||n.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return Te(l?{"files[]":t}:t,f&&new f,this.formSerializer)}}return o||s?(r.setContentType("application/json",!1),tn(t)):t}],transformResponse:[function(t){const r=this.transitional||pe.transitional,n=r&&r.forcedJSONParsing,s=this.responseType==="json";if(a.isResponse(t)||a.isReadableStream(t))return t;if(t&&a.isString(t)&&(n&&!this.responseType||s)){const i=!(r&&r.silentJSONParsing)&&s;try{return JSON.parse(t,this.parseReviver)}catch(l){if(i)throw l.name==="SyntaxError"?g.from(l,g.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:R.classes.FormData,Blob:R.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{pe.headers[e]={}});const rn=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),nn=e=>{const t={};let r,n,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),r=i.substring(0,s).trim().toLowerCase(),n=i.substring(s+1).trim(),!(!r||t[r]&&rn[r])&&(r==="set-cookie"?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)}),t},it=Symbol("internals");function re(e){return e&&String(e).trim().toLowerCase()}function we(e){return e===!1||e==null?e:a.isArray(e)?e.map(we):String(e).replace(/[\r\n]+$/,"")}function sn(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}const on=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Be(e,t,r,n,s){if(a.isFunction(n))return n.call(this,t,r);if(s&&(t=r),!!a.isString(t)){if(a.isString(n))return t.indexOf(n)!==-1;if(a.isRegExp(n))return n.test(t)}}function an(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,n)=>r.toUpperCase()+n)}function ln(e,t){const r=a.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+r,{value:function(s,o,i){return this[n].call(this,t,s,o,i)},configurable:!0})})}let L=class{constructor(t){t&&this.set(t)}set(t,r,n){const s=this;function o(l,f,u){const c=re(f);if(!c)throw new Error("header name must be a non-empty string");const m=a.findKey(s,c);(!m||s[m]===void 0||u===!0||u===void 0&&s[m]!==!1)&&(s[m||f]=we(l))}const i=(l,f)=>a.forEach(l,(u,c)=>o(u,c,f));if(a.isPlainObject(t)||t instanceof this.constructor)i(t,r);else if(a.isString(t)&&(t=t.trim())&&!on(t))i(nn(t),r);else if(a.isObject(t)&&a.isIterable(t)){let l={},f,u;for(const c of t){if(!a.isArray(c))throw TypeError("Object iterator must return a key-value pair");l[u=c[0]]=(f=l[u])?a.isArray(f)?[...f,c[1]]:[f,c[1]]:c[1]}i(l,r)}else t!=null&&o(r,t,n);return this}get(t,r){if(t=re(t),t){const n=a.findKey(this,t);if(n){const s=this[n];if(!r)return s;if(r===!0)return sn(s);if(a.isFunction(r))return r.call(this,s,n);if(a.isRegExp(r))return r.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=re(t),t){const n=a.findKey(this,t);return!!(n&&this[n]!==void 0&&(!r||Be(this,this[n],n,r)))}return!1}delete(t,r){const n=this;let s=!1;function o(i){if(i=re(i),i){const l=a.findKey(n,i);l&&(!r||Be(n,n[l],l,r))&&(delete n[l],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const r=Object.keys(this);let n=r.length,s=!1;for(;n--;){const o=r[n];(!t||Be(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const r=this,n={};return a.forEach(this,(s,o)=>{const i=a.findKey(n,o);if(i){r[i]=we(s),delete r[o];return}const l=t?an(o):String(o).trim();l!==o&&delete r[o],r[l]=we(s),n[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return a.forEach(this,(n,s)=>{n!=null&&n!==!1&&(r[s]=t&&a.isArray(n)?n.join(", "):n)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const n=new this(t);return r.forEach(s=>n.set(s)),n}static accessor(t){const n=(this[it]=this[it]={accessors:{}}).accessors,s=this.prototype;function o(i){const l=re(i);n[l]||(ln(s,i),n[l]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}};L.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.reduceDescriptors(L.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(n){this[r]=n}}});a.freezeMethods(L);function Ne(e,t){const r=this||pe,n=t||r,s=L.from(n.headers);let o=n.data;return a.forEach(e,function(l){o=l.call(r,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Nt(e){return!!(e&&e.__CANCEL__)}let me=class extends g{constructor(t,r,n){super(t??"canceled",g.ERR_CANCELED,r,n),this.name="CanceledError",this.__CANCEL__=!0}};function _t(e,t,r){const n=r.config.validateStatus;!r.status||!n||n(r.status)?e(r):t(new g("Request failed with status code "+r.status,[g.ERR_BAD_REQUEST,g.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}function cn(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function dn(e,t){e=e||10;const r=new Array(e),n=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(f){const u=Date.now(),c=n[o];i||(i=u),r[s]=f,n[s]=u;let m=o,b=0;for(;m!==s;)b+=r[m++],m=m%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),u-i<t)return;const S=c&&u-c;return S?Math.round(b*1e3/S):void 0}}function un(e,t){let r=0,n=1e3/t,s,o;const i=(u,c=Date.now())=>{r=c,s=null,o&&(clearTimeout(o),o=null),e(...u)};return[(...u)=>{const c=Date.now(),m=c-r;m>=n?i(u,c):(s=u,o||(o=setTimeout(()=>{o=null,i(s)},n-m)))},()=>s&&i(s)]}const Re=(e,t,r=3)=>{let n=0;const s=dn(50,250);return un(o=>{const i=o.loaded,l=o.lengthComputable?o.total:void 0,f=i-n,u=s(f),c=i<=l;n=i;const m={loaded:i,total:l,progress:l?i/l:void 0,bytes:f,rate:u||void 0,estimated:u&&l&&c?(l-i)/u:void 0,event:o,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(m)},r)},at=(e,t)=>{const r=e!=null;return[n=>t[0]({lengthComputable:r,total:e,loaded:n}),t[1]]},lt=e=>(...t)=>a.asap(()=>e(...t)),fn=R.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,R.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(R.origin),R.navigator&&/(msie|trident)/i.test(R.navigator.userAgent)):()=>!0,pn=R.hasStandardBrowserEnv?{write(e,t,r,n,s,o,i){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];a.isNumber(r)&&l.push(`expires=${new Date(r).toUTCString()}`),a.isString(n)&&l.push(`path=${n}`),a.isString(s)&&l.push(`domain=${s}`),o===!0&&l.push("secure"),a.isString(i)&&l.push(`SameSite=${i}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function mn(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function hn(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function It(e,t,r){let n=!mn(t);return e&&(n||r==!1)?hn(e,t):t}const ct=e=>e instanceof L?{...e}:e;function K(e,t){t=t||{};const r={};function n(u,c,m,b){return a.isPlainObject(u)&&a.isPlainObject(c)?a.merge.call({caseless:b},u,c):a.isPlainObject(c)?a.merge({},c):a.isArray(c)?c.slice():c}function s(u,c,m,b){if(a.isUndefined(c)){if(!a.isUndefined(u))return n(void 0,u,m,b)}else return n(u,c,m,b)}function o(u,c){if(!a.isUndefined(c))return n(void 0,c)}function i(u,c){if(a.isUndefined(c)){if(!a.isUndefined(u))return n(void 0,u)}else return n(void 0,c)}function l(u,c,m){if(m in t)return n(u,c);if(m in e)return n(void 0,u)}const f={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:l,headers:(u,c,m)=>s(ct(u),ct(c),m,!0)};return a.forEach(Object.keys({...e,...t}),function(c){if(c==="__proto__"||c==="constructor"||c==="prototype")return;const m=a.hasOwnProp(f,c)?f[c]:s,b=m(e[c],t[c],c);a.isUndefined(b)&&m!==l||(r[c]=b)}),r}const Dt=e=>{const t=K({},e);let{data:r,withXSRFToken:n,xsrfHeaderName:s,xsrfCookieName:o,headers:i,auth:l}=t;if(t.headers=i=L.from(i),t.url=Pt(It(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&i.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),a.isFormData(r)){if(R.hasStandardBrowserEnv||R.hasStandardBrowserWebWorkerEnv)i.setContentType(void 0);else if(a.isFunction(r.getHeaders)){const f=r.getHeaders(),u=["content-type","content-length"];Object.entries(f).forEach(([c,m])=>{u.includes(c.toLowerCase())&&i.set(c,m)})}}if(R.hasStandardBrowserEnv&&(n&&a.isFunction(n)&&(n=n(t)),n||n!==!1&&fn(t.url))){const f=s&&o&&pn.read(o);f&&i.set(s,f)}return t},gn=typeof XMLHttpRequest<"u",bn=gn&&function(e){return new Promise(function(r,n){const s=Dt(e);let o=s.data;const i=L.from(s.headers).normalize();let{responseType:l,onUploadProgress:f,onDownloadProgress:u}=s,c,m,b,S,d;function h(){S&&S(),d&&d(),s.cancelToken&&s.cancelToken.unsubscribe(c),s.signal&&s.signal.removeEventListener("abort",c)}let p=new XMLHttpRequest;p.open(s.method.toUpperCase(),s.url,!0),p.timeout=s.timeout;function w(){if(!p)return;const E=L.from("getAllResponseHeaders"in p&&p.getAllResponseHeaders()),F={data:!l||l==="text"||l==="json"?p.responseText:p.response,status:p.status,statusText:p.statusText,headers:E,config:e,request:p};_t(function(N){r(N),h()},function(N){n(N),h()},F),p=null}"onloadend"in p?p.onloadend=w:p.onreadystatechange=function(){!p||p.readyState!==4||p.status===0&&!(p.responseURL&&p.responseURL.indexOf("file:")===0)||setTimeout(w)},p.onabort=function(){p&&(n(new g("Request aborted",g.ECONNABORTED,e,p)),p=null)},p.onerror=function(C){const F=C&&C.message?C.message:"Network Error",H=new g(F,g.ERR_NETWORK,e,p);H.event=C||null,n(H),p=null},p.ontimeout=function(){let C=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const F=s.transitional||ze;s.timeoutErrorMessage&&(C=s.timeoutErrorMessage),n(new g(C,F.clarifyTimeoutError?g.ETIMEDOUT:g.ECONNABORTED,e,p)),p=null},o===void 0&&i.setContentType(null),"setRequestHeader"in p&&a.forEach(i.toJSON(),function(C,F){p.setRequestHeader(F,C)}),a.isUndefined(s.withCredentials)||(p.withCredentials=!!s.withCredentials),l&&l!=="json"&&(p.responseType=s.responseType),u&&([b,d]=Re(u,!0),p.addEventListener("progress",b)),f&&p.upload&&([m,S]=Re(f),p.upload.addEventListener("progress",m),p.upload.addEventListener("loadend",S)),(s.cancelToken||s.signal)&&(c=E=>{p&&(n(!E||E.type?new me(null,e,p):E),p.abort(),p=null)},s.cancelToken&&s.cancelToken.subscribe(c),s.signal&&(s.signal.aborted?c():s.signal.addEventListener("abort",c)));const B=cn(s.url);if(B&&R.protocols.indexOf(B)===-1){n(new g("Unsupported protocol "+B+":",g.ERR_BAD_REQUEST,e));return}p.send(o||null)})},yn=(e,t)=>{const{length:r}=e=e?e.filter(Boolean):[];if(t||r){let n=new AbortController,s;const o=function(u){if(!s){s=!0,l();const c=u instanceof Error?u:this.reason;n.abort(c instanceof g?c:new me(c instanceof Error?c.message:c))}};let i=t&&setTimeout(()=>{i=null,o(new g(`timeout of ${t}ms exceeded`,g.ETIMEDOUT))},t);const l=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(o):u.removeEventListener("abort",o)}),e=null)};e.forEach(u=>u.addEventListener("abort",o));const{signal:f}=n;return f.unsubscribe=()=>a.asap(l),f}},vn=function*(e,t){let r=e.byteLength;if(r<t){yield e;return}let n=0,s;for(;n<r;)s=n+t,yield e.slice(n,s),n=s},wn=async function*(e,t){for await(const r of En(e))yield*vn(r,t)},En=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:r,value:n}=await t.read();if(r)break;yield n}}finally{await t.cancel()}},dt=(e,t,r,n)=>{const s=wn(e,t);let o=0,i,l=f=>{i||(i=!0,n&&n(f))};return new ReadableStream({async pull(f){try{const{done:u,value:c}=await s.next();if(u){l(),f.close();return}let m=c.byteLength;if(r){let b=o+=m;r(b)}f.enqueue(new Uint8Array(c))}catch(u){throw l(u),u}},cancel(f){return l(f),s.return()}},{highWaterMark:2})},ut=64*1024,{isFunction:ye}=a,Sn=(({Request:e,Response:t})=>({Request:e,Response:t}))(a.global),{ReadableStream:ft,TextEncoder:pt}=a.global,mt=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Rn=e=>{e=a.merge.call({skipUndefined:!0},Sn,e);const{fetch:t,Request:r,Response:n}=e,s=t?ye(t):typeof fetch=="function",o=ye(r),i=ye(n);if(!s)return!1;const l=s&&ye(ft),f=s&&(typeof pt=="function"?(d=>h=>d.encode(h))(new pt):async d=>new Uint8Array(await new r(d).arrayBuffer())),u=o&&l&&mt(()=>{let d=!1;const h=new ft,p=new r(R.origin,{body:h,method:"POST",get duplex(){return d=!0,"half"}}).headers.has("Content-Type");return h.cancel(),d&&!p}),c=i&&l&&mt(()=>a.isReadableStream(new n("").body)),m={stream:c&&(d=>d.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(d=>{!m[d]&&(m[d]=(h,p)=>{let w=h&&h[d];if(w)return w.call(h);throw new g(`Response type '${d}' is not supported`,g.ERR_NOT_SUPPORT,p)})});const b=async d=>{if(d==null)return 0;if(a.isBlob(d))return d.size;if(a.isSpecCompliantForm(d))return(await new r(R.origin,{method:"POST",body:d}).arrayBuffer()).byteLength;if(a.isArrayBufferView(d)||a.isArrayBuffer(d))return d.byteLength;if(a.isURLSearchParams(d)&&(d=d+""),a.isString(d))return(await f(d)).byteLength},S=async(d,h)=>{const p=a.toFiniteNumber(d.getContentLength());return p??b(h)};return async d=>{let{url:h,method:p,data:w,signal:B,cancelToken:E,timeout:C,onDownloadProgress:F,onUploadProgress:H,responseType:N,headers:Le,withCredentials:he="same-origin",fetchOptions:Ke}=Dt(d),Ye=t||fetch;N=N?(N+"").toLowerCase():"text";let ge=yn([B,E&&E.toAbortSignal()],C),Z=null;const z=ge&&ge.unsubscribe&&(()=>{ge.unsubscribe()});let Ge;try{if(H&&u&&p!=="get"&&p!=="head"&&(Ge=await S(Le,w))!==0){let q=new r(h,{method:"POST",body:w,duplex:"half"}),Y;if(a.isFormData(w)&&(Y=q.headers.get("content-type"))&&Le.setContentType(Y),q.body){const[$e,be]=at(Ge,Re(lt(H)));w=dt(q.body,ut,$e,be)}}a.isString(he)||(he=he?"include":"omit");const T=o&&"credentials"in r.prototype,Xe={...Ke,signal:ge,method:p.toUpperCase(),headers:Le.normalize().toJSON(),body:w,duplex:"half",credentials:T?he:void 0};Z=o&&new r(h,Xe);let M=await(o?Ye(Z,Ke):Ye(h,Xe));const Qe=c&&(N==="stream"||N==="response");if(c&&(F||Qe&&z)){const q={};["status","statusText","headers"].forEach(Ze=>{q[Ze]=M[Ze]});const Y=a.toFiniteNumber(M.headers.get("content-length")),[$e,be]=F&&at(Y,Re(lt(F),!0))||[];M=new n(dt(M.body,ut,$e,()=>{be&&be(),z&&z()}),q)}N=N||"text";let Gt=await m[a.findKey(m,N)||"text"](M,d);return!Qe&&z&&z(),await new Promise((q,Y)=>{_t(q,Y,{data:Gt,headers:L.from(M.headers),status:M.status,statusText:M.statusText,config:d,request:Z})})}catch(T){throw z&&z(),T&&T.name==="TypeError"&&/Load failed|fetch/i.test(T.message)?Object.assign(new g("Network Error",g.ERR_NETWORK,d,Z,T&&T.response),{cause:T.cause||T}):g.from(T,T&&T.code,d,Z,T&&T.response)}}},On=new Map,Ft=e=>{let t=e&&e.env||{};const{fetch:r,Request:n,Response:s}=t,o=[n,s,r];let i=o.length,l=i,f,u,c=On;for(;l--;)f=o[l],u=c.get(f),u===void 0&&c.set(f,u=l?new Map:Rn(t)),c=u;return u};Ft();const Ve={http:Mr,xhr:bn,fetch:{get:Ft}};a.forEach(Ve,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const ht=e=>`- ${e}`,An=e=>a.isFunction(e)||e===null||e===!1;function Cn(e,t){e=a.isArray(e)?e:[e];const{length:r}=e;let n,s;const o={};for(let i=0;i<r;i++){n=e[i];let l;if(s=n,!An(n)&&(s=Ve[(l=String(n)).toLowerCase()],s===void 0))throw new g(`Unknown adapter '${l}'`);if(s&&(a.isFunction(s)||(s=s.get(t))))break;o[l||"#"+i]=s}if(!s){const i=Object.entries(o).map(([f,u])=>`adapter ${f} `+(u===!1?"is not supported by the environment":"is not available in the build"));let l=r?i.length>1?`since :
`+i.map(ht).join(`
`):" "+ht(i[0]):"as no adapter specified";throw new g("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return s}const Ut={getAdapter:Cn,adapters:Ve};function _e(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new me(null,e)}function gt(e){return _e(e),e.headers=L.from(e.headers),e.data=Ne.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ut.getAdapter(e.adapter||pe.adapter,e)(e).then(function(n){return _e(e),n.data=Ne.call(e,e.transformResponse,n),n.headers=L.from(n.headers),n},function(n){return Nt(n)||(_e(e),n&&n.response&&(n.response.data=Ne.call(e,e.transformResponse,n.response),n.response.headers=L.from(n.response.headers))),Promise.reject(n)})}const kt="1.14.0",xe={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{xe[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const bt={};xe.transitional=function(t,r,n){function s(o,i){return"[Axios v"+kt+"] Transitional option '"+o+"'"+i+(n?". "+n:"")}return(o,i,l)=>{if(t===!1)throw new g(s(i," has been removed"+(r?" in "+r:"")),g.ERR_DEPRECATED);return r&&!bt[i]&&(bt[i]=!0,console.warn(s(i," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(o,i,l):!0}};xe.spelling=function(t){return(r,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function Tn(e,t,r){if(typeof e!="object")throw new g("options must be an object",g.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let s=n.length;for(;s-- >0;){const o=n[s],i=t[o];if(i){const l=e[o],f=l===void 0||i(l,o,e);if(f!==!0)throw new g("option "+o+" must be "+f,g.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new g("Unknown option "+o,g.ERR_BAD_OPTION)}}const Ee={assertOptions:Tn,validators:xe},_=Ee.validators;let W=class{constructor(t){this.defaults=t||{},this.interceptors={request:new ot,response:new ot}}async request(t,r){try{return await this._request(t,r)}catch(n){if(n instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const o=s.stack?s.stack.replace(/^.+\n/,""):"";try{n.stack?o&&!String(n.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(n.stack+=`
`+o):n.stack=o}catch{}}throw n}}_request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=K(this.defaults,r);const{transitional:n,paramsSerializer:s,headers:o}=r;n!==void 0&&Ee.assertOptions(n,{silentJSONParsing:_.transitional(_.boolean),forcedJSONParsing:_.transitional(_.boolean),clarifyTimeoutError:_.transitional(_.boolean),legacyInterceptorReqResOrdering:_.transitional(_.boolean)},!1),s!=null&&(a.isFunction(s)?r.paramsSerializer={serialize:s}:Ee.assertOptions(s,{encode:_.function,serialize:_.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),Ee.assertOptions(r,{baseUrl:_.spelling("baseURL"),withXsrfToken:_.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let i=o&&a.merge(o.common,o[r.method]);o&&a.forEach(["delete","get","head","post","put","patch","common"],d=>{delete o[d]}),r.headers=L.concat(i,o);const l=[];let f=!0;this.interceptors.request.forEach(function(h){if(typeof h.runWhen=="function"&&h.runWhen(r)===!1)return;f=f&&h.synchronous;const p=r.transitional||ze;p&&p.legacyInterceptorReqResOrdering?l.unshift(h.fulfilled,h.rejected):l.push(h.fulfilled,h.rejected)});const u=[];this.interceptors.response.forEach(function(h){u.push(h.fulfilled,h.rejected)});let c,m=0,b;if(!f){const d=[gt.bind(this),void 0];for(d.unshift(...l),d.push(...u),b=d.length,c=Promise.resolve(r);m<b;)c=c.then(d[m++],d[m++]);return c}b=l.length;let S=r;for(;m<b;){const d=l[m++],h=l[m++];try{S=d(S)}catch(p){h.call(this,p);break}}try{c=gt.call(this,S)}catch(d){return Promise.reject(d)}for(m=0,b=u.length;m<b;)c=c.then(u[m++],u[m++]);return c}getUri(t){t=K(this.defaults,t);const r=It(t.baseURL,t.url,t.allowAbsoluteUrls);return Pt(r,t.params,t.paramsSerializer)}};a.forEach(["delete","get","head","options"],function(t){W.prototype[t]=function(r,n){return this.request(K(n||{},{method:t,url:r,data:(n||{}).data}))}});a.forEach(["post","put","patch"],function(t){function r(n){return function(o,i,l){return this.request(K(l||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}W.prototype[t]=r(),W.prototype[t+"Form"]=r(!0)});let xn=class Mt{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(o){r=o});const n=this;this.promise.then(s=>{if(!n._listeners)return;let o=n._listeners.length;for(;o-- >0;)n._listeners[o](s);n._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(l=>{n.subscribe(l),o=l}).then(s);return i.cancel=function(){n.unsubscribe(o)},i},t(function(o,i,l){n.reason||(n.reason=new me(o,i,l),r(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const t=new AbortController,r=n=>{t.abort(n)};return this.subscribe(r),t.signal.unsubscribe=()=>this.unsubscribe(r),t.signal}static source(){let t;return{token:new Mt(function(s){t=s}),cancel:t}}};function Ln(e){return function(r){return e.apply(null,r)}}function $n(e){return a.isObject(e)&&e.isAxiosError===!0}const Me={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Me).forEach(([e,t])=>{Me[t]=e});function qt(e){const t=new W(e),r=wt(W.prototype.request,t);return a.extend(r,W.prototype,t,{allOwnKeys:!0}),a.extend(r,t,null,{allOwnKeys:!0}),r.create=function(s){return qt(K(e,s))},r}const y=qt(pe);y.Axios=W;y.CanceledError=me;y.CancelToken=xn;y.isCancel=Nt;y.VERSION=kt;y.toFormData=Te;y.AxiosError=g;y.Cancel=y.CanceledError;y.all=function(t){return Promise.all(t)};y.spread=Ln;y.isAxiosError=$n;y.mergeConfig=K;y.AxiosHeaders=L;y.formToJSON=e=>Bt(a.isHTMLForm(e)?new FormData(e):e);y.getAdapter=Ut.getAdapter;y.HttpStatusCode=Me;y.default=y;const{Axios:Xn,AxiosError:Qn,CanceledError:Zn,isCancel:es,CancelToken:ts,VERSION:rs,all:ns,Cancel:ss,isAxiosError:os,spread:is,toFormData:as,AxiosHeaders:ls,HttpStatusCode:cs,formToJSON:ds,getAdapter:us,mergeConfig:fs}=y,G="https://www.themealdb.com/api/json/v1/1";function Pn(e){const t=e.split("").reduce((r,n)=>r+n.charCodeAt(0),0);return parseFloat((6.99+t%20).toFixed(2))}function Ie(e){return{id:e.idMeal,name:e.strMeal,category:e.strCategory||"Dish",area:e.strArea||"",description:e.strInstructions?e.strInstructions.slice(0,100)+"…":"A delicious meal made with fresh ingredients.",image:e.strMealThumb,price:Pn(e.strMeal),tags:e.strTags?e.strTags.split(",").slice(0,3):[]}}const We={async getCategories(){const{data:e}=await y.get(`${G}/categories.php`);return(e.categories||[]).filter(t=>t.strCategory.toLowerCase()!=="pork")},async getMealsByCategory(e="Seafood"){const{data:t}=await y.get(`${G}/filter.php?c=${e}`),r=t.meals||[];return(await Promise.all(r.slice(0,12).map(s=>this.getMealById(s.idMeal)))).filter(Boolean)},async getMealById(e){var n;const{data:t}=await y.get(`${G}/lookup.php?i=${e}`),r=(n=t.meals)==null?void 0:n[0];return r?Ie(r):null},async searchMeals(e){const{data:t}=await y.get(`${G}/search.php?s=${e}`);return(t.meals||[]).filter(r=>{var n;return((n=r.strCategory)==null?void 0:n.toLowerCase())!=="pork"}).map(Ie)},async getRandomMeal(){var r;const{data:e}=await y.get(`${G}/random.php`),t=(r=e.meals)==null?void 0:r[0];return t?Ie(t):null},async getMealsByArea(e){const{data:t}=await y.get(`${G}/filter.php?a=${e}`),r=t.meals||[];return(await Promise.all(r.slice(0,8).map(s=>this.getMealById(s.idMeal)))).filter(Boolean)}},ne="bb_cart",A={getAll(){return v.get(ne)||[]},add(e){const t=this.getAll(),r=t.find(n=>n.id===e.id);r?r.qty+=1:t.push({...e,qty:1}),v.set(ne,t)},remove(e){const t=this.getAll().filter(r=>r.id!==e);v.set(ne,t)},updateQty(e,t){if(t<=0){this.remove(e);return}const r=this.getAll().map(n=>n.id===e?{...n,qty:t}:n);v.set(ne,r)},clear(){v.remove(ne)},count(){return this.getAll().reduce((e,t)=>e+t.qty,0)},total(){return this.getAll().reduce((e,t)=>e+t.price*t.qty,0)}};function P(e){return`$${parseFloat(e).toFixed(2)}`}function jt(e){return new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Bn(e,t=350){let r;return function(...n){clearTimeout(r),r=setTimeout(()=>e.apply(this,n),t)}}function Ht(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function Nn(e){return e.length>=6}function zt(e){return{Pending:"badge-pending",Preparing:"badge-pending","On the way":"badge-pending",Delivered:"badge-delivered",Cancelled:"badge-cancelled"}[e]||"badge-pending"}function O(e,t){const r=typeof e=="string"?document.querySelector(e):e;r&&(r.innerHTML=t)}function k(e,t="info"){let r=document.querySelector(".toast-container");r||(r=document.createElement("div"),r.className="toast-container",document.body.appendChild(r));const n={success:"✓",error:"✕",info:"●"},s=document.createElement("div");s.className=`toast ${t}`,s.innerHTML=`<span>${n[t]}</span><span>${e}</span>`,r.appendChild(s),setTimeout(()=>s.remove(),3500)}function I(){var o;D.getUser();const e=A.count(),r=`
    <nav class="navbar">
      <a href="#/" class="navbar-brand">🍽 BiteBridge</a>
      <div class="navbar-links">
        ${D.isLoggedIn()?`
          <a href="#/menu" id="nav-menu">Menu</a>
          <a href="#/orders" id="nav-orders">My Orders</a>
          <a href="#/dashboard" id="nav-dashboard">Dashboard</a>
          <a href="#/cart" class="nav-cart-btn btn">
            🛒 Cart
            ${e>0?`<span class="cart-badge">${e}</span>`:""}
          </a>
          <button id="btn-logout">Logout</button>
        `:`
          <a href="#/menu">Menu</a>
          <a href="#/login">Login</a>
          <a href="#/register" class="btn btn-primary btn-sm">Sign Up</a>
        `}
      </div>
    </nav>
  `;let n=document.querySelector(".navbar");if(n)n.outerHTML=r,n=document.querySelector(".navbar");else{const i=document.createElement("div");i.innerHTML=r,n=i.firstChild,document.getElementById("app").prepend(n)}const s=window.location.hash.replace("#","")||"/";document.querySelectorAll(".navbar-links a").forEach(i=>{var f;((f=i.getAttribute("href"))==null?void 0:f.replace("#",""))===s&&i.classList.add("active")}),(o=document.getElementById("btn-logout"))==null||o.addEventListener("click",()=>{D.logout(),A.clear(),k("You have been logged out.","info"),$.navigate("/login")})}async function Jt(){O("#content",`
    <nav class="navbar"></nav>
    <div class="hero">
      <div class="hero-tag">🔥 Fresh & Fast Delivery</div>
      <h1 class="hero-title">Food you love,<br/><em>delivered</em> fast</h1>
      <p class="hero-sub">Explore hundreds of dishes from world cuisines. Order in seconds, delivered in minutes.</p>
      <div class="hero-btns">
        <a href="#/menu" class="btn btn-primary">Browse Menu 🍽</a>
        ${D.isLoggedIn()?"":'<a href="#/register" class="btn btn-ghost">Sign Up Free</a>'}
      </div>
    </div>

    <div class="page" style="padding-top:1rem">
      <div class="page-header">
        <h2 class="page-title" style="font-size:1.8rem">Featured Dishes</h2>
        <p class="page-subtitle">Handpicked meals from our menu — straight from the API</p>
      </div>
      <div id="featured-grid">
        <div class="spinner-wrap"><div class="spinner"></div></div>
      </div>

      <div style="text-align:center;margin-top:2.5rem">
        <a href="#/menu" class="btn btn-secondary">View Full Menu →</a>
      </div>

      <!-- WHY US SECTION -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;margin-top:4rem;margin-bottom:2rem">
        ${[{icon:"⚡",title:"Fast Delivery",desc:"Get your food in 20–40 minutes guaranteed"},{icon:"🌍",title:"World Cuisines",desc:"Over 300 dishes from 20+ countries"},{icon:"🔒",title:"Secure Orders",desc:"Your data is safe and your orders tracked"},{icon:"⭐",title:"Top Quality",desc:"Freshly made meals with premium ingredients"}].map(e=>`
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;text-align:center">
            <div style="font-size:2rem;margin-bottom:0.7rem">${e.icon}</div>
            <div style="font-weight:700;margin-bottom:0.3rem">${e.title}</div>
            <div style="color:var(--text2);font-size:0.85rem">${e.desc}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `),I();try{const r=`<div class="food-grid">${(await We.getMealsByCategory("Chicken")).slice(0,4).map(n=>`
      <div class="card food-card">
        <div class="food-card-img">
          <img src="${n.image}" alt="${n.name}" loading="lazy"
               onerror="this.src='https://via.placeholder.com/300x180/2c2b27/f4a53a?text=Food'" />
          <span class="food-card-tag">${n.area||n.category}</span>
        </div>
        <div class="food-card-body">
          <div class="food-card-name">${n.name}</div>
          <div class="food-card-desc">${n.description}</div>
          <div class="food-card-footer">
            <div class="food-price">${P(n.price)} <span>/ serving</span></div>
            <button class="btn btn-primary btn-sm btn-add-featured" data-id="${n.id}"
                    data-name="${n.name}" data-price="${n.price}" data-image="${n.image}">
              + Add
            </button>
          </div>
        </div>
      </div>
    `).join("")}</div>`;O("#featured-grid",r),document.querySelectorAll(".btn-add-featured").forEach(n=>{n.addEventListener("click",()=>{if(!D.isLoggedIn()){k("Please log in to add items to cart.","info");return}A.add({id:n.dataset.id,name:n.dataset.name,price:parseFloat(n.dataset.price),image:n.dataset.image}),I(),k(`${n.dataset.name} added to cart! 🛒`,"success")})})}catch{O("#featured-grid",'<p class="text-muted" style="padding:1rem">Could not load featured dishes.</p>')}}function _n(){O("#content",`
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-logo">
          <h1>🍽 BiteBridge</h1>
          <p>Order delicious food, delivered fast</p>
        </div>
        <h2 class="auth-title">Welcome back</h2>

        <form id="login-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="login-email">Email address</label>
            <input type="email" id="login-email" class="form-control" placeholder="you@example.com" autocomplete="email" />
            <div class="form-error hidden" id="err-email"></div>
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" autocomplete="current-password" />
            <div class="form-error hidden" id="err-password"></div>
          </div>
          <div class="form-error hidden" id="err-general"></div>
          <button type="submit" class="btn btn-primary btn-full mt-2" id="login-btn">Sign In</button>
        </form>

        <div class="auth-footer">
          Don't have an account? <a href="#/register">Sign up</a>
          <br/><br/>
          <small style="color: var(--text3)">Demo: demo@bitebridge.com / demo1234</small>
        </div>
      </div>
    </div>
  `),document.getElementById("login-form").addEventListener("submit",e=>{e.preventDefault(),In();const t=document.getElementById("login-email").value.trim(),r=document.getElementById("login-password").value;let n=!0;if((!t||!Ht(t))&&(De("err-email","Please enter a valid email."),n=!1),r||(De("err-password","Password is required."),n=!1),!n)return;const s=document.getElementById("login-btn");s.disabled=!0,s.textContent="Signing in…",setTimeout(()=>{const o=D.login({email:t,password:r});o.ok?(k(`Welcome back, ${o.user.name}! 🎉`,"success"),$.navigate("/menu")):(De("err-general",o.error),s.disabled=!1,s.textContent="Sign In")},400)})}function De(e,t){const r=document.getElementById(e);r&&(r.textContent=t,r.classList.remove("hidden"))}function In(){document.querySelectorAll(".form-error").forEach(e=>{e.textContent="",e.classList.add("hidden")})}function Dn(){O("#content",`
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-logo">
          <h1>🍽 BiteBridge</h1>
          <p>Order delicious food, delivered fast</p>
        </div>
        <h2 class="auth-title">Create your account</h2>

        <form id="register-form" novalidate>
          <div class="form-group">
            <label class="form-label">Full name</label>
            <input type="text" id="reg-name" class="form-control" placeholder="John Doe" />
            <div class="form-error hidden" id="err-name"></div>
          </div>
          <div class="form-group">
            <label class="form-label">Email address</label>
            <input type="email" id="reg-email" class="form-control" placeholder="you@example.com" />
            <div class="form-error hidden" id="err-email"></div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="reg-password" class="form-control" placeholder="Min 6 chars" />
              <div class="form-error hidden" id="err-password"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Confirm password</label>
              <input type="password" id="reg-confirm" class="form-control" placeholder="Repeat password" />
              <div class="form-error hidden" id="err-confirm"></div>
            </div>
          </div>
          <div class="form-error hidden" id="err-general"></div>
          <button type="submit" class="btn btn-primary btn-full mt-2" id="reg-btn">Create Account</button>
        </form>

        <div class="auth-footer">
          Already have an account? <a href="#/login">Sign in</a>
        </div>
      </div>
    </div>
  `),document.getElementById("register-form").addEventListener("submit",e=>{e.preventDefault(),Fn();const t=document.getElementById("reg-name").value.trim(),r=document.getElementById("reg-email").value.trim(),n=document.getElementById("reg-password").value,s=document.getElementById("reg-confirm").value;let o=!0;if((!t||t.length<2)&&(se("err-name","Name must be at least 2 characters."),o=!1),Ht(r)||(se("err-email","Please enter a valid email."),o=!1),Nn(n)||(se("err-password","Password must be at least 6 characters."),o=!1),n!==s&&(se("err-confirm","Passwords do not match."),o=!1),!o)return;const i=document.getElementById("reg-btn");i.disabled=!0,i.textContent="Creating account…",setTimeout(()=>{const l=D.register({name:t,email:r,password:n});l.ok?(k(`Welcome to BiteBridge, ${l.user.name}! 🎉`,"success"),$.navigate("/menu")):(se("err-general",l.error),i.disabled=!1,i.textContent="Create Account")},400)})}function se(e,t){const r=document.getElementById(e);r&&(r.textContent=t,r.classList.remove("hidden"))}function Fn(){document.querySelectorAll(".form-error").forEach(e=>{e.textContent="",e.classList.add("hidden")})}let qe=[],yt=[],Se="Seafood",V="",ae="name";async function Un(){O("#content",`
    <nav class="navbar"></nav>
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">Explore Our <em style="font-style:italic;color:var(--accent)">Menu</em></h1>
        <p class="page-subtitle">Fresh meals from around the world, delivered to your door</p>
      </div>

      <!-- SEARCH & FILTER FORM -->
      <div class="search-bar">
        <div class="search-input-wrap">
          <span class="icon">🔍</span>
          <input type="text" class="search-input form-control" id="search-input" placeholder="Search dishes..." />
        </div>
        <select class="filter-select form-control" id="sort-select">
          <option value="name">Sort: A–Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <button class="btn btn-ghost btn-sm" id="clear-search">Clear</button>
      </div>

      <!-- CATEGORY PILLS -->
      <div class="category-pills" id="category-pills">
        <span class="spinner" style="width:20px;height:20px;border-width:2px"></span>
      </div>

      <!-- FOOD GRID -->
      <div id="food-grid">
        <div class="spinner-wrap"><div class="spinner"></div></div>
      </div>
    </div>
  `),I(),await kn(),await Vt(Se),qn()}async function kn(){try{yt=(await We.getCategories()).filter(t=>t.strCategory.toLowerCase()!=="pork");const e=yt.slice(0,10).map(t=>`
      <button class="pill ${t.strCategory===Se?"active":""}" 
              data-cat="${t.strCategory}">${t.strCategory}</button>
    `).join("");O("#category-pills",e),document.querySelectorAll(".pill[data-cat]").forEach(t=>{t.addEventListener("click",async()=>{Se=t.dataset.cat,V="",document.getElementById("search-input").value="",document.querySelectorAll(".pill[data-cat]").forEach(r=>r.classList.remove("active")),t.classList.add("active"),await Vt(Se)})})}catch{O("#category-pills",'<p class="text-muted">Could not load categories.</p>')}}async function Vt(e){O("#food-grid",'<div class="spinner-wrap"><div class="spinner"></div></div>');try{qe=await We.getMealsByCategory(e),le()}catch{O("#food-grid",'<p class="text-muted" style="padding:2rem">Failed to load meals. Please check your connection.</p>')}}function le(){var r;let e=[...qe];if(V){const n=V.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(n)||s.category.toLowerCase().includes(n)||s.area.toLowerCase().includes(n))}if(ae==="name"?e.sort((n,s)=>n.name.localeCompare(s.name)):ae==="price-asc"?e.sort((n,s)=>n.price-s.price):ae==="price-desc"&&e.sort((n,s)=>s.price-n.price),!e.length){O("#food-grid",`
      <div style="text-align:center;padding:4rem 2rem;color:var(--text2)">
        <div style="font-size:3rem;margin-bottom:1rem">🍽</div>
        <p>No dishes found for "<strong>${V}</strong>"</p>
        <button class="btn btn-ghost btn-sm mt-2" id="reset-search">Clear search</button>
      </div>
    `),(r=document.getElementById("reset-search"))==null||r.addEventListener("click",()=>{V="",document.getElementById("search-input").value="",le()});return}const t=`<div class="food-grid">${e.map(n=>Mn(n)).join("")}</div>`;O("#food-grid",t),document.querySelectorAll(".btn-add-cart").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.id,o=qe.find(i=>i.id===s);o&&(A.add(o),I(),k(`${o.name} added to cart! 🛒`,"success"))})})}function Mn(e){return`
    <div class="card food-card">
      <div class="food-card-img">
        <img src="${e.image}" alt="${e.name}" loading="lazy" 
             onerror="this.src='https://via.placeholder.com/300x180/2c2b27/f4a53a?text=Food'" />
        <span class="food-card-tag">${e.area||e.category}</span>
      </div>
      <div class="food-card-body">
        <div class="food-card-name">${e.name}</div>
        <div class="food-card-desc">${e.description}</div>
        <div class="food-card-footer">
          <div class="food-price">${P(e.price)} <span>/ serving</span></div>
          <button class="btn btn-primary btn-sm btn-add-cart" data-id="${e.id}">
            + Add
          </button>
        </div>
      </div>
    </div>
  `}function qn(){var r,n;const e=document.getElementById("search-input"),t=Bn(s=>{V=s,le()},350);e==null||e.addEventListener("input",s=>t(s.target.value.trim())),(r=document.getElementById("sort-select"))==null||r.addEventListener("change",s=>{ae=s.target.value,le()}),(n=document.getElementById("clear-search"))==null||n.addEventListener("click",()=>{V="",ae="name",document.getElementById("search-input").value="",document.getElementById("sort-select").value="name",le()})}const j="bb_orders",ce={getAll(){const e=v.get(j)||[],t=D.getUser();return e.filter(r=>r.userId===(t==null?void 0:t.id))},place(e,t,r){const n=D.getUser();if(!n)return null;const s=v.get(j)||[],o={id:`ORD-${Date.now()}`,userId:n.id,userName:n.name,items:e,total:t,address:r,status:"Pending",createdAt:new Date().toISOString(),estimatedTime:`${20+Math.floor(Math.random()*20)} min`};return s.push(o),v.set(j,s),o},updateStatus(e,t){const r=v.get(j)||[],n=r.findIndex(s=>s.id===e);n!==-1&&(r[n].status=t,v.set(j,r))},cancel(e){const t=v.get(j)||[],r=t.findIndex(n=>n.id===e);r!==-1&&(t[r].status="Cancelled",v.set(j,t))},getAllForAdmin(){return v.get(j)||[]}};function jn(){O("#content",'<nav class="navbar"></nav><div class="page" id="cart-page"></div>'),I(),oe()}function oe(){const e=A.getAll(),t=document.getElementById("cart-page");if(!e.length){t.innerHTML=`
      <div class="page-header">
        <h1 class="page-title">Your Cart</h1>
      </div>
      <div class="cart-empty">
        <div class="icon-big">🛒</div>
        <p style="font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">Your cart is empty</p>
        <p class="text-muted">Browse our menu and add something delicious!</p>
        <a href="#/menu" class="btn btn-primary mt-3">Browse Menu</a>
      </div>
    `;return}const r=A.total(),n=2.99,s=r*.08,o=r+n+s;t.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Your Cart</h1>
      <p class="page-subtitle">${e.length} item${e.length!==1?"s":""} in your cart</p>
    </div>

    <div class="cart-wrapper">
      <div>
        <div class="cart-items" id="cart-items">
          ${e.map(i=>Hn(i)).join("")}
        </div>
        <div class="flex gap-2 mt-3">
          <button class="btn btn-ghost btn-sm" id="btn-clear-cart">🗑 Clear Cart</button>
          <a href="#/menu" class="btn btn-ghost btn-sm">← Continue Shopping</a>
        </div>
      </div>

      <div class="cart-summary">
        <h3 class="cart-summary-title">Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${P(r)}</span></div>
        <div class="summary-row"><span>Delivery fee</span><span>${P(n)}</span></div>
        <div class="summary-row"><span>Tax (8%)</span><span>${P(s)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${P(o)}</span></div>

        <hr class="divider" />

        <div class="form-group">
          <label class="form-label">Delivery address</label>
          <input type="text" id="delivery-address" class="form-control" placeholder="123 Main St, City" />
          <div class="form-error hidden" id="err-address"></div>
        </div>

        <button class="btn btn-primary btn-full" id="btn-checkout">
          Place Order — ${P(o)}
        </button>
      </div>
    </div>
  `,zn()}function Hn(e){return`
    <div class="cart-item" data-id="${e.id}">
      <img class="cart-item-img" src="${e.image}" alt="${e.name}"
           onerror="this.src='https://via.placeholder.com/72x72/2c2b27/f4a53a?text=Food'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${e.name}</div>
        <div class="cart-item-price">${P(e.price)} each</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn btn-qty-dec" data-id="${e.id}">−</button>
        <span class="qty-value">${e.qty}</span>
        <button class="qty-btn btn-qty-inc" data-id="${e.id}">+</button>
      </div>
      <div style="min-width:72px;text-align:right">
        <div style="font-weight:700">${P(e.price*e.qty)}</div>
        <button class="btn btn-danger btn-sm mt-1 btn-remove-item" data-id="${e.id}">Remove</button>
      </div>
    </div>
  `}function zn(){var e,t;document.querySelectorAll(".btn-qty-inc").forEach(r=>{r.addEventListener("click",()=>{const s=A.getAll().find(o=>o.id===r.dataset.id);s&&(A.updateQty(s.id,s.qty+1),oe(),I())})}),document.querySelectorAll(".btn-qty-dec").forEach(r=>{r.addEventListener("click",()=>{const s=A.getAll().find(o=>o.id===r.dataset.id);s&&(A.updateQty(s.id,s.qty-1),oe(),I())})}),document.querySelectorAll(".btn-remove-item").forEach(r=>{r.addEventListener("click",()=>{A.remove(r.dataset.id),oe(),I(),k("Item removed from cart.","info")})}),(e=document.getElementById("btn-clear-cart"))==null||e.addEventListener("click",()=>{confirm("Clear all items from cart?")&&(A.clear(),oe(),I(),k("Cart cleared.","info"))}),(t=document.getElementById("btn-checkout"))==null||t.addEventListener("click",()=>{const r=document.getElementById("delivery-address").value.trim(),n=document.getElementById("err-address");if(!r||r.length<5){n.textContent="Please enter a valid delivery address.",n.classList.remove("hidden");return}n.classList.add("hidden");const s=A.getAll(),o=A.total(),i=o+2.99+o*.08,l=ce.place(s,i,r);l&&(A.clear(),I(),k(`Order ${l.id} placed successfully! 🎉`,"success"),$.navigate("/orders"))})}function Wt(){O("#content",'<nav class="navbar"></nav><div class="page" id="orders-page"></div>'),I();const e=ce.getAll().reverse(),t=document.getElementById("orders-page");if(!e.length){t.innerHTML=`
      <div class="page-header">
        <h1 class="page-title">My Orders</h1>
      </div>
      <div class="cart-empty">
        <div class="icon-big">📋</div>
        <p style="font-size:1.1rem;font-weight:600;margin-bottom:0.5rem">No orders yet</p>
        <p class="text-muted">Place your first order from our menu!</p>
        <a href="#/menu" class="btn btn-primary mt-3">Browse Menu</a>
      </div>
    `;return}t.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">My Orders</h1>
      <p class="page-subtitle">${e.length} order${e.length!==1?"s":""} placed</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:1.2rem">
      ${e.map(r=>Jn(r)).join("")}
    </div>
  `,document.querySelectorAll(".btn-cancel-order").forEach(r=>{r.addEventListener("click",()=>{confirm("Cancel this order?")&&(ce.cancel(r.dataset.id),Wt())})})}function Jn(e){const t=e.status==="Pending";return`
    <div class="card" style="padding:1.5rem">
      <div class="flex justify-between items-center mb-2" style="flex-wrap:wrap;gap:0.5rem">
        <div>
          <strong style="font-size:1rem">${e.id}</strong>
          <span class="text-muted" style="font-size:0.82rem;margin-left:0.7rem">${jt(e.createdAt)}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge ${zt(e.status)}">${e.status}</span>
          ${t?`<button class="btn btn-danger btn-sm btn-cancel-order" data-id="${e.id}">Cancel</button>`:""}
        </div>
      </div>
      <p class="text-muted" style="font-size:0.85rem;margin-bottom:0.8rem">📍 ${e.address}</p>
      <div style="border-top:1px solid var(--border);padding-top:0.8rem">
        ${e.items.map(r=>`
          <div class="flex justify-between" style="font-size:0.88rem;margin-bottom:0.4rem;color:var(--text2)">
            <span>${r.name} × ${r.qty}</span>
            <span>${P(r.price*r.qty)}</span>
          </div>
        `).join("")}
      </div>
      <div class="flex justify-between items-center mt-2" style="border-top:1px solid var(--border);padding-top:0.8rem">
        <span class="text-muted" style="font-size:0.85rem">Est. time: ${e.estimatedTime}</span>
        <strong style="color:var(--accent)">${P(e.total)}</strong>
      </div>
    </div>
  `}function Vn(){O("#content",'<nav class="navbar"></nav><div class="page" id="dashboard-page"></div>'),I(),Kt()}function Kt(){const e=D.getUser(),t=ce.getAll(),r=t.reduce((i,l)=>i+(l.total||0),0),n=t.filter(i=>i.status==="Delivered").length,s=t.filter(i=>["Pending","Preparing","On the way"].includes(i.status)).length;t.filter(i=>i.status==="Cancelled").length;const o=document.getElementById("dashboard-page");o.innerHTML=`
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome back, <strong>${e==null?void 0:e.name}</strong> 👋</p>
    </div>

    <!-- STATS CARDS (entity: Order) -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Orders</div>
        <div class="stat-value">${t.length}</div>
        <div class="stat-sub">All time</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Spent</div>
        <div class="stat-value">${P(r)}</div>
        <div class="stat-sub">Across all orders</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Delivered</div>
        <div class="stat-value" style="color:var(--success)">${n}</div>
        <div class="stat-sub">Successfully received</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending</div>
        <div class="stat-value">${s}</div>
        <div class="stat-sub">In progress</div>
      </div>
    </div>

    <!-- FILTER FORM (Jobs with forms) -->
    <div class="search-bar mb-3">
      <div class="search-input-wrap">
        <span class="icon">🔍</span>
        <input type="text" class="search-input form-control" id="order-search" placeholder="Search by order ID or address..." />
      </div>
      <select class="filter-select form-control" id="status-filter">
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Preparing">Preparing</option>
        <option value="On the way">On the way</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button class="btn btn-ghost btn-sm" id="clear-filters">Reset</button>
    </div>

    <!-- ORDERS TABLE -->
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:1rem">Order History</h2>
    <div id="orders-table-wrap">
      ${Yt(t)}
    </div>
  `,Wn(t)}function Yt(e){return e.length?`
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(t=>`
            <tr>
              <td><strong>${t.id}</strong></td>
              <td style="color:var(--text2);font-size:0.83rem">${jt(t.createdAt)}</td>
              <td>${t.items.reduce((r,n)=>r+n.qty,0)} item(s)</td>
              <td style="color:var(--text2);font-size:0.85rem;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.address}</td>
              <td style="color:var(--accent);font-weight:700">${P(t.total)}</td>
              <td><span class="badge ${zt(t.status)}">${t.status}</span></td>
              <td>
                ${t.status==="Pending"?`
                  <button class="btn btn-sm btn-ghost btn-mark-delivered" data-id="${t.id}" title="Mark as Delivered">✓ Delivered</button>
                `:"—"}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `:`<div style="text-align:center;padding:3rem;color:var(--text2)">
      <p>No orders found.</p>
      <a href="#/menu" class="btn btn-primary btn-sm mt-2">Order something!</a>
    </div>`}function Wn(e){const t=document.getElementById("order-search"),r=document.getElementById("status-filter"),n=document.getElementById("clear-filters");function s(){const o=t.value.trim().toLowerCase(),i=r.value;let l=[...e].reverse();o&&(l=l.filter(f=>f.id.toLowerCase().includes(o)||f.address.toLowerCase().includes(o))),i&&(l=l.filter(f=>f.status===i)),O("#orders-table-wrap",Yt(l)),vt()}t==null||t.addEventListener("input",s),r==null||r.addEventListener("change",s),n==null||n.addEventListener("click",()=>{t.value="",r.value="",s()}),vt()}function vt(){document.querySelectorAll(".btn-mark-delivered").forEach(e=>{e.addEventListener("click",()=>{ce.updateStatus(e.dataset.id,"Delivered"),k("Order marked as delivered! ✓","success"),Kt()})})}document.getElementById("app").innerHTML=`
  <nav class="navbar" style="display:none"></nav>
  <div id="content"></div>
`;$.register("/",Jt);$.register("/home",Jt);$.register("/login",_n);$.register("/register",Dn);$.register("/menu",Un);$.register("/cart",jn);$.register("/orders",Wt);$.register("/dashboard",Vn);$.register("/404",()=>{document.getElementById("content").innerHTML=`
    <div style="text-align:center;padding:6rem 2rem;color:var(--text2)">
      <div style="font-size:4rem;margin-bottom:1rem">🍽</div>
      <h2 style="font-size:2rem;font-weight:900;margin-bottom:0.5rem;color:var(--text)">Page Not Found</h2>
      <p>This page doesn't exist.</p>
      <a href="#/" class="btn btn-primary mt-3">Go Home</a>
    </div>
  `});$.init();
