var t,e=require("react"),n=(t=e)&&"object"==typeof t&&"default"in t?t.default:t,r=require("@xstate/react"),o=require("date-fns"),i=require("xstate"),a=require("xstate/lib/actions");function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var s=i.Machine({id:"useAuth",initial:"unauthenticated",context:{user:{},expiresAt:null,authResult:null,isAuthenticating:!1,error:void 0,errorType:void 0,config:{navigate:function(){return console.error("Please specify a navigation method that works with your router")},callbackDomain:"http://localhost:8000"}},states:{unauthenticated:{on:{LOGIN:"authenticating",CHECK_SESSION:"verifying",SET_CONFIG:{actions:["setConfig"]}}},authenticating:{on:{ERROR:"error",AUTHENTICATED:"authenticated",SET_CONFIG:{actions:["setConfig"]}},entry:["startAuthenticating"],exit:["stopAuthenticating"]},verifying:{invoke:{id:"checkSession",src:function(t,e){return t.config.authProvider.checkSession()},onDone:{target:"authenticated"},onError:{target:"unauthenticated",actions:["clearUserFromContext","clearLocalStorage"]}},entry:["startAuthenticating"],exit:["stopAuthenticating"]},authenticated:{on:{LOGOUT:"unauthenticated",SET_CONFIG:{actions:["setConfig"]},CHECK_SESSION:"verifying"},entry:["saveUserToContext","saveToLocalStorage"],exit:a.choose([{cond:function(t,e){return"CHECK_SESSION"!==e.type},actions:["clearUserFromContext","clearLocalStorage"]}])},error:{entry:["saveErrorToContext","clearUserFromContext","clearLocalStorage"]}}},{actions:{startAuthenticating:i.assign(function(t){return{isAuthenticating:!0}}),stopAuthenticating:i.assign(function(t){return{isAuthenticating:!1}}),saveUserToContext:i.assign(function(t,e){var n=e.data?e.data:e,r=n.authResult;return{user:n.user,authResult:r,expiresAt:o.addSeconds(new Date,r.expiresIn)}}),clearUserFromContext:i.assign(function(t){return{user:{},expiresAt:null,authResult:null}}),saveToLocalStorage:function(t,e){var n=t.expiresAt,r=t.user;"undefined"!=typeof localStorage&&(localStorage.setItem("useAuth:expires_at",n?n.toISOString():"0"),localStorage.setItem("useAuth:user",JSON.stringify(r)))},clearLocalStorage:function(){"undefined"!=typeof localStorage&&(localStorage.removeItem("useAuth:expires_at"),localStorage.removeItem("useAuth:user"))},saveErrorToContext:i.assign(function(t,e){return{errorType:e.errorType,error:e.error}}),setConfig:i.assign(function(t,e){return{config:u({},t.config,e)}})}}),c=i.interpret(s);c.start(),function(t){if("undefined"!=typeof localStorage){var e=new Date(localStorage.getItem("useAuth:expires_at")||"0"),n=new Date;if(o.isAfter(e,n)){var r=JSON.parse(localStorage.getItem("useAuth:user")||"{}");t("LOGIN"),t("AUTHENTICATED",{user:r,authResult:{expiresIn:o.differenceInSeconds(e,n)}})}}}(c.send);var l=function(){var t=r.useService(c),n=t[0],i=t[1],a=n.context.config,u=a.authProvider,s=a.navigate,l=a.callbackDomain,f=e.useCallback(function(t){var e=(void 0===t?{}:t).postLoginRoute,n=void 0===e?"/":e;try{if(!u||!s)return console.warn("authProvider not configured yet"),Promise.resolve();var r=function(){if("undefined"!=typeof window)return i("LOGIN"),Promise.resolve(u.handleLoginCallback(i)).then(function(t){t&&s(n)})}();return Promise.resolve(r&&r.then?r.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},[u,s]),g=function(){return!(!n.context.expiresAt||!o.isAfter(n.context.expiresAt,new Date))};return{isAuthenticating:n.context.isAuthenticating,isAuthenticated:g,isAuthorized:function(t){var e=Array.isArray(t)?t:[t],r=null==u?void 0:u.userRoles(n.context.user);return!(!g()||!r)&&e.some(function(t){return r.includes(t)})},user:n.context.user,userId:null==u?void 0:u.userId(n.context.user),authResult:n.context.authResult,login:function(){null==u||u.authorize()},signup:function(){null==u||u.signup()},logout:function(t){"string"==typeof t?null==u||u.logout(""+l+t):null==u||u.logout(),i("LOGOUT"),s("string"==typeof t?t:"/")},handleAuthentication:f,dispatch:i}};exports.AuthConfig=function(t){var n=t.authProvider,r=t.params,o=t.navigate,i=t.children,a=l().dispatch,s="undefined"!=typeof window?window.location.protocol+"//"+window.location.host:"http://localhost:8000";return e.useEffect(function(){var t=new n(u({dispatch:a},n.addDefaultParams(r,s)));a("SET_CONFIG",{authProvider:t,navigate:o,callbackDomain:s}),a("CHECK_SESSION")},[a,n,r,o]),e.createElement(e.Fragment,null,i)},exports.AuthProvider=function(t){var r=t.children;return l(),e.useEffect(function(){console.warn("Using the AuthProvider root component is deprecated. Migrate to AuthConfig or manual dispatching. Takes  5min.")},[]),n.createElement(n.Fragment,null,r)},exports.useAuth=l;
//# sourceMappingURL=react-use-auth.js.map
