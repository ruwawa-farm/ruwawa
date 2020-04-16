(function(t){function e(e){for(var a,o,i=e[0],u=e[1],c=e[2],d=0,p=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&p.push(s[o][0]),s[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);l&&l(e);while(p.length)p.shift()();return n.push.apply(n,c||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],a=!0,i=1;i<r.length;i++){var u=r[i];0!==s[u]&&(a=!1)}a&&(n.splice(e--,1),t=o(o.s=r[0]))}return t}var a={},s={app:0},n=[];function o(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=a,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(r,a,function(e){return t[e]}.bind(null,a));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/vue-ruwawa/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var l=u;n.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},1:function(t,e){},"47e0":function(t,e,r){"use strict";var a=r("f08a"),s=r.n(a);s.a},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"uk-height-1-1",attrs:{id:"app"}},[r("vue-page-transition",{attrs:{name:"fade"}},[r("router-view")],1)],1)},n=[],o=r("8323"),i=r.n(o),u=r("263c"),c=r.n(u);i.a.use(c.a);var l={},d=l,p=(r("5d46"),r("2877")),m=Object(p["a"])(d,s,n,!1,null,null,null),v=m.exports,f=r("8c4f"),h=r("f0eb"),g=r("f62e"),w=r("28dd"),_=r("a65d"),b=r.n(_),k=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"index"}},[r("div",{staticClass:"uk-child-width-expand@s uk-text-center",attrs:{"uk-grid":""}},[t._m(0),r("div",[r("div",{staticClass:"uk-card uk-card-default uk-card-hover uk-width-1-2@m"},[t._m(1),r("div",{staticClass:"uk-card-body"},[r("p",[t._v("Enter the correct details to login")]),r("form",{on:{submit:function(e){return e.preventDefault(),t.getAuth(e)}}},[r("div",{staticClass:"uk-margin"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"uk-input",attrs:{type:"email",placeholder:"Enter your email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),r("div",{staticClass:"uk-margin"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"uk-input",attrs:{type:"password",placeholder:"Enter your password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),r("div",{staticClass:"uk-alert-danger",class:{err:!t.error},attrs:{"uk-alert":""}},[r("p",{attrs:{id:"err_msg"}},[t._v(t._s(t.error_message)+" "),r("span",{attrs:{"uk-icon":"close"},on:{click:t.close}})])]),r("div",{staticClass:"uk-flex uk-flex-around"},[r("div",[r("button",{staticClass:"uk-button",attrs:{type:"submit"}},[t._v(t._s(t.btn))])]),r("div",[r("router-link",{attrs:{to:"/signup"}},[r("button",{staticClass:"uk-button"},[t._v("Sign up")])])],1)])])])])])])])},y=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("img",{attrs:{src:r("7af8"),alt:"logo",width:"50%",height:"50%"}}),a("h3",[t._v("Welcome to Ruwawa. "),a("br"),t._v(" First log into your account or create a new one.")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"uk-card-header"},[r("h3",{staticClass:"uk-card-title"},[t._v("Login")])])}],C=(r("99af"),{data:function(){return{email:"",password:"",error_message:"",btn:"Login",error:!1}},methods:{getAuth:function(){var t=this;this.btn="Loading...",this.password.length<8?(this.btn="Login",this.error_message="password is too short! At least 8 characters.",this.error=!0):this.$http.get("https://ruwawa-db.herokuapp.com/auth/".concat(this.email,"/").concat(this.password)).then((function(e){t.btn="Login",200===e.status?t.$toasted.show("Credentials are correct :)",{theme:"outline",position:"top-center",duration:2e3}):(t.error_message="something went wrong! Try again later :(",t.error=!0)})).catch((function(e){switch(t.btn="Login",e.status){case 403:t.error_message=e.body.reason,t.error=!0;break;case 404:t.error_message=e.body.reason,t.error=!0;break;default:t.error_message="something went wrong! Try again later :(",t.error=!0;break}}))},close:function(){this.error=!1}}}),x=C,O=(r("f870"),Object(p["a"])(x,k,y,!1,null,"515ca61c",null)),E=O.exports,j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"signup"}},[a("div",{staticClass:"uk-child-width-expand@s uk-text-center",attrs:{"uk-grid":""}},[a("div",[a("img",{attrs:{src:r("7af8"),alt:"logo",width:"50%",height:"50%"}}),a("h3",[t._v("Create an account to start using our services. "),a("br"),t._v("Are you a farmer? Join us through "),a("router-link",{attrs:{to:"/farmer"}},[t._v("here")]),t._v(" instead")],1)]),a("div",[a("div",{staticClass:"uk-card uk-card-default uk-card-hover uk-width-1-2@m"},[t._m(0),a("div",{staticClass:"uk-card-body"},[a("p",[t._v("Fill in the details below.")]),a("form",{on:{submit:function(e){return e.preventDefault(),t.registerUser(e)}}},[a("div",{staticClass:"uk-margin"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"uk-input",attrs:{type:"text",placeholder:"Enter your full names",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),a("div",{staticClass:"uk-margin"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"uk-input",attrs:{type:"email",placeholder:"Enter your email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),a("div",{staticClass:"uk-margin"},[a("vue-tel-input",{model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),a("div",{staticClass:"uk-margin"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"uk-input",attrs:{type:"password",placeholder:"Enter your password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),a("div",{staticClass:"uk-margin"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password_rpt,expression:"password_rpt"}],staticClass:"uk-input",attrs:{type:"password",placeholder:"Confirm your password",disabled:t.confirm,required:""},domProps:{value:t.password_rpt},on:{input:function(e){e.target.composing||(t.password_rpt=e.target.value)}}})]),a("div",{staticClass:"uk-alert-danger",class:{err:!t.error},attrs:{"uk-alert":""}},[a("p",{attrs:{id:"err_msg"}},[t._v(t._s(t.error_message)+" "),a("span",{attrs:{"uk-icon":"close"},on:{click:t.close}})])]),a("div",[a("button",{staticClass:"uk-button",attrs:{type:"submit"}},[t._v(t._s(t.btn))])])])])])])])])},P=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"uk-card-header"},[r("h3",{staticClass:"uk-card-title"},[t._v("Signup")])])}],$={data:function(){return{name:"",email:"",phone:"",password:"",password_rpt:"",btn:"Signup",error_message:"",error:!1,confirm:!0}},methods:{close:function(){this.error=!1},registerUser:function(){this.$toasted.show("All fields are filled! Thanks :)",{theme:"outline",position:"top-center",duration:2e3})}},watch:{password:function(){this.password.length<8?(this.error=!0,this.error_message="password is too short! At least 8 characters."):(this.confirm=!1,this.error=!1)},password_rpt:function(){this.password!==this.password_rpt?(this.error=!0,this.error_message="passwords do not match"):this.error=!1}}},S=$,q=(r("47e0"),Object(p["a"])(S,j,P,!1,null,"5df35ccc",null)),A=q.exports,L=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},N=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"signup"}},[r("h1",[t._v("Farmer's register")])])}],T={},M=T,F=Object(p["a"])(M,L,N,!1,null,"0af6a028",null),J=F.exports;a["a"].use(f["a"]),a["a"].use(h["default"]),a["a"].use(g["a"],{required:!0}),a["a"].use(w["a"]),a["a"].use(b.a);var D=[{path:"/",name:"index",component:E},{path:"/signup",name:"signup",component:A},{path:"/farmer",name:"farmer",component:J}],U=new f["a"]({mode:"history",base:"/vue-ruwawa/",routes:D}),R=U;a["a"].config.productionTip=!1,new a["a"]({router:R,render:function(t){return t(v)}}).$mount("#app")},"5d46":function(t,e,r){"use strict";var a=r("67b6"),s=r.n(a);s.a},"67b6":function(t,e,r){},"6ea3":function(t,e,r){},"7af8":function(t,e,r){t.exports=r.p+"img/ruwawa-logo.e8e38dc5.png"},f08a:function(t,e,r){},f870:function(t,e,r){"use strict";var a=r("6ea3"),s=r.n(a);s.a}});
//# sourceMappingURL=app.373dbac4.js.map