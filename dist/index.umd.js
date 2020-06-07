!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("auth0-js")):"function"==typeof define&&define.amd?define(["exports","react","auth0-js"],t):t((e=e||self).reactUseAuth={},e.react,e.Auth0)}(this,(function(e,t,r){var n="default"in t?t.default:t;function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}r=r&&r.hasOwnProperty("default")?r.default:r;var a=function(e,t){switch(t.type){case"login":var r=t.authResult,n=t.user,a=1e3*r.expiresIn+(new Date).getTime();return"undefined"!=typeof localStorage&&(localStorage.setItem("useAuth:expires_at",JSON.stringify(a)),localStorage.setItem("useAuth:user",JSON.stringify(n))),o({},e,{user:n,expiresAt:a,authResult:r});case"logout":return"undefined"!=typeof localStorage&&(localStorage.removeItem("useAuth:expires_at"),localStorage.removeItem("useAuth:user")),o({},e,{user:{},expiresAt:null,authResult:null});case"stopAuthenticating":return o({},e,{isAuthenticating:!1});case"startAuthenticating":return o({},e,{isAuthenticating:!0});case"error":return o({},e,{user:{},expiresAt:null,authResult:null,errorType:t.errorType,error:t.error});default:return e}};"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var u=function(e){var t=e.err,r=e.dispatch,n=e.auth0,o=e.authResult;try{return r({type:"stopAuthenticating"}),o&&o.accessToken&&o.idToken?Promise.resolve(function(e,t){try{var a=Promise.resolve(function(e){var t=e.dispatch,r=e.auth0,n=e.authResult;try{return Promise.resolve(new Promise((function(e,o){r.client.userInfo(n.accessToken||"",(function(r,a){r?(t({type:"error",errorType:"userInfo",error:r}),o(r)):(t({type:"login",authResult:n,user:a}),e(a))}))})))}catch(e){return Promise.reject(e)}}({dispatch:r,auth0:n,authResult:o})).then((function(){return!0}))}catch(e){return!1}return a&&a.then?a.then(void 0,(function(){return!1})):a}()):t?(console.error(t),r({type:"error",error:t,errorType:"authResult"}),Promise.resolve(!1)):Promise.resolve(!1)}catch(e){return Promise.reject(e)}};function i(){var e={};if("undefined"!=typeof localStorage){var t=new Date(JSON.parse(localStorage.getItem("useAuth:expires_at")||"0"));t>new Date&&(e={user:JSON.parse(localStorage.getItem("useAuth:user")||"{}"),expiresAt:t})}return o({},{user:{},expiresAt:null,isAuthenticating:!1},{},e)}var s=t.createContext({state:i(),dispatch:function(){},auth0:null,callback_domain:"http://localhost:8000",customPropertyNamespace:"http://localhost:8000",navigate:function(e){}});e.AuthProvider=function(e){var c=e.children,l=e.navigate,h=e.auth0_domain,p=e.customPropertyNamespace,f="undefined"!=typeof window?window.location.protocol+"//"+window.location.host:"http://localhost:8000",d=new r.WebAuth(o({},{domain:h,clientID:e.auth0_client_id,redirectUri:f+"/auth0_callback",audience:"https://"+(e.auth0_audience_domain||h)+"/api/v2/",responseType:"token id_token",scope:"openid profile email"},{},e.auth0_params)),y=t.useReducer(a,i()),m=y[0],g=y[1],v=t.useState({state:m,dispatch:g,auth0:d,callback_domain:f,customPropertyNamespace:p,navigate:l}),A=v[0],S=v[1];return t.useEffect((function(){S((function(e){return o({},e,{state:m})}))}),[m]),t.useEffect((function(){g({type:"startAuthenticating"}),d.checkSession({},(function(e,t){g({type:"stopAuthenticating"}),console.log(e),e?g({type:"error",errorType:"checkSession",error:e}):u({dispatch:g,auth0:d,authResult:t})}))}),[]),n.createElement(s.Provider,{value:A},c)},e.useAuth=function(){var e=t.useContext(s),r=e.state,n=e.dispatch,o=e.auth0,a=e.callback_domain,i=e.navigate,c=e.customPropertyNamespace,l=function(){return!!(r.expiresAt&&(new Date).getTime()<r.expiresAt)};return{isAuthenticating:r.isAuthenticating,isAuthenticated:l,isAuthorized:function(e){var t=Array.isArray(e)?e:[e],n=r.user[(c+"/user_metadata").replace(/\/+user_metadata/,"/user_metadata")];return!(!l()||!n)&&t.some((function(e){return n.roles.includes(e)}))},user:r.user,userId:r.user?r.user.sub:null,authResult:r.authResult,login:function(){o&&o.authorize()},logout:function(){o&&o.logout({returnTo:a}),n({type:"logout"}),i("/")},handleAuthentication:function(e){var t=(void 0===e?{}:e).postLoginRoute,r=void 0===t?"/":t;"undefined"!=typeof window&&(n({type:"startAuthenticating"}),o&&o.parseHash((function(e,t){try{return Promise.resolve(u({err:e,authResult:t,dispatch:n,auth0:o})).then((function(){i(r)}))}catch(e){return Promise.reject(e)}})))}}}}));
//# sourceMappingURL=index.umd.js.map
