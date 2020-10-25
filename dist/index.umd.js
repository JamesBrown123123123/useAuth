!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("auth0-js"),require("xstate"),require("@xstate/react")):"function"==typeof define&&define.amd?define(["exports","react","auth0-js","xstate","@xstate/react"],t):t((e=e||self).reactUseAuth={},e.react,e.Auth0,e.xstate,e.react)}(this,(function(e,t,r,n,o){var a="default"in t?t.default:t;function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}r=r&&r.hasOwnProperty("default")?r.default:r;var i=t.createContext({auth0:null,callback_domain:"http://localhost:8000",customPropertyNamespace:"http://localhost:8000",navigate:function(e){}});"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var s=n.Machine({id:"useAuth",initial:"unauthenticated",context:{user:{},expiresAt:null,authResult:null,isAuthenticating:!1,error:void 0,errorType:void 0},states:{unauthenticated:{on:{LOGIN:"authenticating"}},authenticating:{on:{ERROR:"error",AUTHENTICATED:"authenticated"},entry:["startAuthenticating"],exit:["stopAuthenticating"]},authenticated:{on:{LOGOUT:"unauthenticated"},entry:["saveUserToContext","saveToLocalStorage"],exit:["clearUserFromContext","clearLocalStorage"]},error:{entry:["saveErrorToContext","clearUserFromContext","clearLocalStorage"]}}},{actions:{startAuthenticating:n.assign((function(e){return{isAuthenticating:!0}})),stopAuthenticating:n.assign((function(e){return{isAuthenticating:!1}})),saveUserToContext:n.assign((function(e,t){var r=t.authResult;return{user:t.user,authResult:r,expiresAt:1e3*r.expiresIn+(new Date).getTime()}})),clearUserFromContext:n.assign((function(e){return{user:{},expiresAt:null,authResult:null}})),saveToLocalStorage:function(e,t){var r=e.user;"undefined"!=typeof localStorage&&(localStorage.setItem("useAuth:expires_at",JSON.stringify(e.expiresAt)),localStorage.setItem("useAuth:user",JSON.stringify(r)))},clearLocalStorage:function(){"undefined"!=typeof localStorage&&(localStorage.removeItem("useAuth:expires_at"),localStorage.removeItem("useAuth:user"))},saveErrorToContext:n.assign((function(e,t){return{errorType:t.errorType,error:t.error}}))}}),c=(n.interpret(s),function(e){var t=e.err,r=e.send,n=e.auth0,o=e.authResult;try{return o&&o.accessToken&&o.idToken?Promise.resolve(function(e,t){try{var a=Promise.resolve(function(e){var t=e.send,r=e.auth0,n=e.authResult;try{return Promise.resolve(new Promise((function(e,o){r.client.userInfo(n.accessToken||"",(function(r,a){r?(t("ERROR",{errorType:"userInfo",error:r}),o(r)):(t("AUTHENTICATED",{authResult:n,user:a}),e(a))}))})))}catch(e){return Promise.reject(e)}}({send:r,auth0:n,authResult:o})).then((function(){return!0}))}catch(e){return!1}return a&&a.then?a.then(void 0,(function(){return!1})):a}()):t?(console.error(t),r("ERROR",{error:t,errorType:"authResult"}),Promise.resolve(!1)):Promise.resolve(!1)}catch(e){return Promise.reject(e)}}),l=n.interpret(s);l.start(),e.AuthProvider=function(e){var n=e.children,o=e.navigate,s=e.auth0_domain,c=e.customPropertyNamespace,l="undefined"!=typeof window?window.location.protocol+"//"+window.location.host:"http://localhost:8000",h=new r.WebAuth(u({},{domain:s,clientID:e.auth0_client_id,redirectUri:l+"/auth0_callback",audience:"https://"+(e.auth0_audience_domain||s)+"/api/v2/",responseType:"token id_token",scope:"openid profile email"},{},e.auth0_params)),d=t.useState({auth0:h,callback_domain:l,customPropertyNamespace:c,navigate:o}),f=d[0],p=d[1];return t.useEffect((function(){p((function(e){return u({},e)}))}),[]),a.createElement(i.Provider,{value:f},n)},e.useAuth=function(){var e=t.useContext(i),r=e.auth0,n=e.callback_domain,a=e.navigate,s=e.customPropertyNamespace,h=o.useService(l),d=h[0],f=h[1],p=function(e,t){f(u({type:e},t||{}))},m=function(){return!!(d.context.expiresAt&&(new Date).getTime()<d.context.expiresAt)};return{isAuthenticating:d.context.isAuthenticating,isAuthenticated:m,isAuthorized:function(e){var t=Array.isArray(e)?e:[e],r=d.context.user[(s+"/user_metadata").replace(/\/+user_metadata/,"/user_metadata")];return!(!m()||!r)&&t.some((function(e){return r.roles.includes(e)}))},user:d.context.user,userId:d.context.user?d.context.user.sub:null,authResult:d.context.authResult,login:function(){r&&r.authorize()},signup:function(){r&&r.authorize({mode:"signUp",screen_hint:"signup"})},logout:function(){r&&r.logout({returnTo:n}),p("LOGOUT"),a("/")},handleAuthentication:function(e){var t=(void 0===e?{}:e).postLoginRoute,n=void 0===t?"/":t;"undefined"!=typeof window&&(p("LOGIN"),r&&r.parseHash((function(e,t){try{return Promise.resolve(c({err:e,authResult:t,send:p,auth0:r})).then((function(){a(n)}))}catch(e){return Promise.reject(e)}})))}}}}));
//# sourceMappingURL=index.umd.js.map
