import t,{useCallback as e,useEffect as n,createElement as i,Fragment as r}from"react";import{useService as o}from"@xstate/react";import{addSeconds as a,isAfter as s,differenceInSeconds as c}from"date-fns";import{Machine as u,assign as l,interpret as h}from"xstate";import{choose as d}from"xstate/lib/actions";import p from"auth0-js";import g from"netlify-identity-widget";function y(){return(y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}const f=h(u({id:"useAuth",initial:"unauthenticated",context:{user:{},expiresAt:null,authResult:null,isAuthenticating:!1,error:void 0,errorType:void 0,config:{navigate:()=>console.error("Please specify a navigation method that works with your router"),callbackDomain:"http://localhost:8000"}},states:{unauthenticated:{on:{LOGIN:"authenticating",CHECK_SESSION:"verifying",SET_CONFIG:{actions:["setConfig"]}}},authenticating:{on:{ERROR:"error",AUTHENTICATED:"authenticated",SET_CONFIG:{actions:["setConfig"]}},entry:["startAuthenticating"],exit:["stopAuthenticating"]},verifying:{invoke:{id:"checkSession",src:(t,e)=>t.config.authProvider.checkSession(),onDone:{target:"authenticated"},onError:{target:"unauthenticated",actions:["clearUserFromContext","clearLocalStorage"]}},entry:["startAuthenticating"],exit:["stopAuthenticating"]},authenticated:{on:{LOGOUT:"unauthenticated",SET_CONFIG:{actions:["setConfig"]},CHECK_SESSION:"verifying"},entry:["saveUserToContext","saveToLocalStorage"],exit:d([{cond:(t,e)=>"CHECK_SESSION"!==e.type,actions:["clearUserFromContext","clearLocalStorage"]}])},error:{entry:["saveErrorToContext","clearUserFromContext","clearLocalStorage"]}}},{actions:{startAuthenticating:l(t=>({isAuthenticating:!0})),stopAuthenticating:l(t=>({isAuthenticating:!1})),saveUserToContext:l((t,e)=>{const{authResult:n,user:i}=e.data?e.data:e;return{user:i,authResult:n,expiresAt:a(new Date,n.expiresIn)}}),clearUserFromContext:l(t=>({user:{},expiresAt:null,authResult:null})),saveToLocalStorage:(t,e)=>{const{expiresAt:n,user:i}=t;"undefined"!=typeof localStorage&&(localStorage.setItem("useAuth:expires_at",n?n.toISOString():"0"),localStorage.setItem("useAuth:user",JSON.stringify(i)))},clearLocalStorage:()=>{"undefined"!=typeof localStorage&&(localStorage.removeItem("useAuth:expires_at"),localStorage.removeItem("useAuth:user"))},saveErrorToContext:l((t,e)=>({errorType:e.errorType,error:e.error})),setConfig:l((t,e)=>({config:y({},t.config,e)}))}}));f.start(),function(t){if("undefined"!=typeof localStorage){const e=new Date(localStorage.getItem("useAuth:expires_at")||"0"),n=new Date;if(s(e,n)){const i=JSON.parse(localStorage.getItem("useAuth:user")||"{}");t("LOGIN"),t("AUTHENTICATED",{user:i,authResult:{expiresIn:c(e,n)}})}}}(f.send);const m=()=>{const[t,n]=o(f),{authProvider:i,navigate:r,callbackDomain:a}=t.context.config,c=e(async({postLoginRoute:t="/"}={})=>{i&&r?"undefined"!=typeof window&&(n("LOGIN"),await i.handleLoginCallback(n)&&r(t)):console.warn("authProvider not configured yet")},[i,r]),u=()=>!(!t.context.expiresAt||!s(t.context.expiresAt,new Date));return{isAuthenticating:t.context.isAuthenticating,isAuthenticated:u,isAuthorized:e=>{const n=Array.isArray(e)?e:[e],r=null==i?void 0:i.userRoles(t.context.user);return!(!u()||!r)&&n.some(t=>r.includes(t))},user:t.context.user,userId:null==i?void 0:i.userId(t.context.user),authResult:t.context.authResult,login:()=>{null==i||i.authorize()},signup:()=>{null==i||i.signup()},logout:t=>{"string"==typeof t?null==i||i.logout(`${a}${t}`):null==i||i.logout(),n("LOGOUT"),r("string"==typeof t?t:"/")},handleAuthentication:c,dispatch:n}};class I{constructor(t){this.dispatch=t.dispatch,this.customPropertyNamespace=t.customPropertyNamespace,this.auth0=new p.WebAuth(y({},t))}static addDefaultParams(t,e){return y({redirectUri:e+"/auth0_callback",audience:`https://${t.domain}/api/v2/`,responseType:"token id_token",scope:"openid profile email"},t)}authorize(){this.auth0.authorize()}signup(){this.auth0.authorize({mode:"signUp",screen_hint:"signup"})}logout(t){this.auth0.logout({returnTo:t})}userId(t){return t.sub}userRoles(t){const e=t[(this.customPropertyNamespace+"/user_metadata").replace(/\/+user_metadata/,"/user_metadata")];return(null==e?void 0:e.roles)||null}async handleLoginCallback(){var t=this;return new Promise((e,n)=>{this.auth0.parseHash(async function(n,i){n&&(t.dispatch("ERROR",{error:n,errorType:"authResult"}),e(!1));try{const n=await t.handleAuthResult(i);e(n)}catch(n){t.dispatch("ERROR",{error:n,errorType:"handleAuth"}),e(!1)}})})}async checkSession(){var t=this;return new Promise((e,n)=>{this.auth0.checkSession({},async function(i,r){if(!i&&r&&r.accessToken&&r.idToken)try{const n=await t.fetchUser(r);e({user:n,authResult:r})}catch(t){n(t)}else n(i||new Error("Session invalid"))})})}async handleAuthResult(t){if(t&&t.accessToken&&t.idToken){const e=await this.fetchUser(t);return this.dispatch("AUTHENTICATED",{authResult:t,user:e}),!0}return!1}async fetchUser(t){return new Promise((e,n)=>{this.auth0.client.userInfo((null==t?void 0:t.accessToken)||"",(t,i)=>{t?n(t):e(i)})})}}var v={__proto__:null,Auth0:I,NetlifyIdentity:class{constructor(t){this.netlifyIdentity=g,this.netlifyIdentity.init(t),this.dispatch=t.dispatch,this.netlifyIdentity.on("error",t=>{this.dispatch("ERROR",{error:t,errorType:"netlifyError"})}),this.netlifyIdentity.on("login",t=>{var e;this.dispatch("AUTHENTICATED",{user:t,authResult:{expiresIn:null==(e=t.token)?void 0:e.expires_in}})}),this.netlifyIdentity.on("init",t=>{var e;console.log("INIT",t),t&&(this.dispatch("LOGIN"),this.dispatch("AUTHENTICATED",{user:t,authResult:{expiresIn:null==(e=t.token)?void 0:e.expires_in}}))})}static addDefaultParams(t={},e){return t}authorize(){this.dispatch("LOGIN"),this.netlifyIdentity.open("login")}signup(){this.dispatch("LOGIN"),this.netlifyIdentity.open("signup")}logout(t){this.netlifyIdentity.logout()}async handleLoginCallback(t){return console.warn("handleLoginCallback is unnecessary with Netlify Identity Widget"),!0}async checkSession(){try{await this.netlifyIdentity.refresh()}catch(t){throw new Error("Session invalid")}const t=this.netlifyIdentity.currentUser();var e;if(t)return{user:t,authResult:{expiresIn:null==(e=t.token)?void 0:e.expires_in}};throw new Error("Session invalid")}userId(t){return t.id}userRoles(t){return[t.role]||null}}};const S=({children:e,navigate:i,auth0_audience_domain:r,auth0_domain:o,auth0_client_id:a,auth0_params:s={},customPropertyNamespace:c})=>{const u={domain:o,clientID:a,redirectUri:("undefined"!=typeof window?`${window.location.protocol}//${window.location.host}`:"http://localhost:8000")+"/auth0_callback",audience:`https://${r||o}/api/v2/`,responseType:"token id_token",scope:"openid profile email"},{dispatch:l}=m();return n(()=>{const t=new I(y({dispatch:l,customPropertyNamespace:c},u,s));l("SET_CONFIG",{authProvider:t,navigate:i}),l("CHECK_SESSION")},[i,c]),n(()=>{console.warn("Using the AuthProvider root component is deprecated. Migrate to AuthConfig or manual dispatching. Takes  5min.")},[]),t.createElement(t.Fragment,null,e)},A=({authProvider:t,params:e,navigate:o,children:a})=>{const{dispatch:s}=m(),c="undefined"!=typeof window?`${window.location.protocol}//${window.location.host}`:"http://localhost:8000";return n(()=>{const n=new t(y({dispatch:s},t.addDefaultParams(e,c)));s("SET_CONFIG",{authProvider:n,navigate:o,callbackDomain:c}),s("CHECK_SESSION")},[s,t,e,o]),i(r,null,a)};export{A as AuthConfig,S as AuthProvider,v as Providers,m as useAuth};
//# sourceMappingURL=index.modern.js.map
