(this["webpackJsonpreact-web-app"]=this["webpackJsonpreact-web-app"]||[]).push([[0],[,,,,,,,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var r=t(0),u=t(1),i=t.n(u),a=t(4),c=t.n(a),l=(t(10),t(11),t(2));t(12),t(13);function o(e,n){for(var t=[],r=e;r<=n;r++)t.push(r);return t}t(14);function f(e){return Object(u.useEffect)((function(){}),[e.value]),Object(r.jsx)("button",{className:"square",onClick:function(){e.actionClick()},children:e.value})}function s(e){return Object(r.jsx)("div",{children:function(){var n=o(0,e.side-1);return n.map((function(t){return Object(r.jsx)("div",{className:"grid-row",children:n.map((function(n){return u=t*e.side+n,Object(r.jsx)(f,{index:u,value:e.array[u],actionClick:function(){return e.handleClick(u)}},"GRID_NUM_"+u);var u}))},"ROW_NUM_"+t)}))}()})}t(15);function b(e){var n=Object(u.useState)((e.minSide+e.maxSide)/2),t=Object(l.a)(n,2),i=t[0],a=t[1],c=Object(u.useState)(["X","O"]),f=Object(l.a)(c,2),s=f[0],b=(f[1],Object(u.useState)(s[0])),j=Object(l.a)(b,2),d=j[0],v=j[1];return Object(r.jsxs)("form",{onSubmit:function(n){n.preventDefault(),e.handleSubmit(i,d)},className:"vertical-form",children:[Object(r.jsxs)("label",{children:["Select the width of the grid:",(e.minSide,e.maxSide,Object(r.jsx)("select",{value:i,onChange:function(e){return a(e.target.value)},children:o(e.minSide,e.maxSide).map((function(e){return Object(r.jsx)("option",{value:e,children:e},"SIDE_NUM_"+e)}))}))]}),Object(r.jsxs)("label",{children:["Select the first player:",Object(r.jsx)("select",{value:d,onChange:function(e){return v(e.target.value)},children:s.map((function(e){return Object(r.jsx)("option",{value:e,children:e},"PLAYER_"+e)}))})]}),Object(r.jsx)("input",{type:"submit",value:"Start"})]})}function j(e,n,t){return 0<=n&&n<e&&0<=t&&t<e}function d(e,n,t,r){return j(n,t,r)||alert("index out of bound"),e[Number(t*n)+Number(r)]}function v(e,n,t,r,u){return O(e,n,t,r,u)===u?d(e,n,t,r):null}function O(e,n,t,r,u){var i=0;if(t<=n-u&&r<=n-u&&t>=0&&r>=0){var a=d(e,n,t,r);if(null!=a){i=1;for(var c=1;c<u;c++){d(e,n,t+c,r+c)===a&&i++}}}return i}function m(e,n,t,r,u){return h(e,n,t,r,u)===u?d(e,n,t,r):null}function h(e,n,t,r,u){var i=0;if(t<=n-u&&r<n&&t>=0&&r>=u-1){var a=d(e,n,t,r);if(null!=a){i=1;for(var c=1;c<u;c++){d(e,n,t+c,r-c)===a&&i++}}}return i}function x(e,n,t,r,u){return p(e,n,t,r,u)===u?d(e,n,t,r):null}function p(e,n,t,r,u){var i=0;if(t<n&&r<=n-u&&t>=0&&r>=0){var a=d(e,n,t,r);if(null!=a){i=1;for(var c=1;c<u;c++){d(e,n,t,r+c)===a&&i++}}}return i}function S(e,n,t,r,u){return N(e,n,t,r,u)===u?d(e,n,t,r):null}function N(e,n,t,r,u){var i=0;if(t<=n-u&&r<n&&t>=0&&r>=0){var a=d(e,n,t,r);if(null!=a){i=1;for(var c=1;c<u;c++){d(e,n,t+c,r)===a&&i++}}}return i}var g=!0,y=!1;function k(e){false}function C(e,n,t){var r=[E,M],u=w(r,4,4,e,n,t,g);return-1!==u||-1!==(u=w(r,4,4,e,n,t,y))||-1!==(u=w([E],3,3,e,n,t,g))||-1!==(u=w([E],4,3,e,n,t,y))||-1!==(u=w(r,3,2,e,n,t,y))||-1!==(u=w(r,3,1,e,n,t,g))?(k(),u):function(e,n){var t=0,r=0,u=0;do{t=Math.floor(Math.random()*(n-1)),r=Math.floor(Math.random()*(n-1)),u=Number(t*n)+Number(r)}while(null!=e[u]);return u}(e,n)}function w(e,n,t,r,u,i,a){for(var c=0,l=n;l>=t;--l)for(var o=0;o<e.length;++o)for(var f=0;f<u;++f)for(var s=0;s<u;++s)if(-1!==(c=e[o](r,u,f,s,i,l,a)))return c;return-1}function M(e,n,t,r,u,i,a){return A(e,n,t,r,u,i,a,1)}var _=[O,h,N,p];function E(e,n,t,r,u,i,a){return A(e,n,t,r,u,i,a,2)}function A(e,n,t,r,u,i,a,c){for(var l=0;l<_.length;++l){var o=_[l](e,n,t,r,5),f=null;if(o===i&&(f=d(e,n,t,r)),null!=f&&(f!==u&&!a||f===u&&a)){var s=B(e,n,t,r,l),b=D(e,n,t,r,l),j=b>0,v=-b;3===o&&k();var O=F(t,r,j?b:v),m=O[l][0][0],h=O[l][0][1];switch(c){case 2:if(!s&&!j){if(v>0){var x=O[l][1][0],p=O[l][1][1];return k(),Number(x*n)+Number(p)}return k(),Number(m*n)+Number(h)}break;case 1:if(!j&&v>0){var S=O[l][1][0],N=O[l][1][1];return k(),Number(S*n)+Number(N)}if(!s)return k(),Number(m*n)+Number(h);break;default:return new Error("Bad parameter: numberOfUnboundedSide "+c+" should be 1 or 2")}}}return-1}function B(e,n,t,r,u){var i=F(t,r,0),a=i[u][0][0],c=i[u][0][1];return!j(n,a,c)||null!=d(e,n,a,c)}function D(e,n,t,r,u){for(var i=0,a=1;a<5;a++){var c=F(t,r,a),l=c[u][1][0],o=c[u][1][1];if(!j(n,l,o))return a;var f=d(e,n,l,o);if(null!==f&&f!==d(e,n,t,r))return a;null===f&&0===i&&(i=a)}return-i}function F(e,n,t){return[[[[e-1],[n-1]],[[e+t],[n+t]]],[[[e-1],[n+1]],[[e+t],[n-t]]],[[[e-1],[n]],[[e+t],[n]]],[[[e],[n-1]],[[e],[n+t]]]]}function I(){var e=Object(u.useState)(15),n=Object(l.a)(e,2),t=n[0],i=n[1],a=Object(u.useState)(Array((t-1)*(t-1)).fill(null)),c=Object(l.a)(a,2),o=c[0],f=c[1],j=Object(u.useState)(!1),d=Object(l.a)(j,2),O=d[0],h=d[1],p=Object(u.useState)("Press start to play !"),N=Object(l.a)(p,2),g=N[0],y=N[1],k=Object(u.useState)(!0),w=Object(l.a)(k,2),M=w[0],_=w[1],E=Object(u.useState)(0),A=Object(l.a)(E,2),B=A[0],D=A[1],F=function(e){M||null!=o[e]||I(e)},I=function(e){var n=o.slice();n[e]=O?"X":"O",f(n),h(!O),D(B+1)},P=function(){var e=function(e,n,t){for(var r=[v,m,S,x],u=0;u<n;++u)for(var i=0;i<n;++i)for(var a=0;a<r.length;++a){var c=r[a](e,n,u,i,t);if(null!=c)return c}return null}(o,t,5);return null!=e?(y("Winner is "+e+" !"),_(!0),e):e},R=function(){if(y("Next player is "+(O?"X":"O")),!O){var e=function(e,n,t){return C(e,n,t)}(o,t,"O");F(e)}};return Object(u.useEffect)((function(){M||null==P()&&R()})),Object(r.jsxs)("div",{className:"game-container",children:[Object(r.jsx)("div",{className:"settings-container",children:Object(r.jsx)(b,{handleSubmit:function(e,n){h("X"===n);var t=Array((e-1)*(e-1)).fill(null);f(t),_(!1),i(e),D(0)},minSide:5,maxSide:25})}),Object(r.jsxs)("div",{className:"grid-container",children:[g,Object(r.jsx)(s,{array:o,side:t,handleClick:F})]}),Object(r.jsxs)("div",{className:"text-container",children:["Rules:",Object(r.jsx)("br",{}),"Be the first one to align 5 symbols",Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),"Context:",Object(r.jsx)("br",{}),"This was my favorite game to keep me busy during boring class in high school. Hey kids, don't be like me, be focused at school, it's important. "]})]})}var P=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)("header",{className:"App-header",children:Object(r.jsx)(I,{})})})},R=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,17)).then((function(n){var t=n.getCLS,r=n.getFID,u=n.getFCP,i=n.getLCP,a=n.getTTFB;t(e),r(e),u(e),i(e),a(e)}))};c.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(P,{})}),document.getElementById("root")),R()}],[[16,1,2]]]);
//# sourceMappingURL=main.42b811a6.chunk.js.map