"use strict";window.cookie={set:function(a,b,c){var d=new Date;d.setDate(d.getDate()+c);var e=escape(b)+(null===c?"":"; expires="+d.toUTCString());document.cookie=a+"="+e},get:function(a){var b=document.cookie,c=b.indexOf(" "+a+"=");if(-1===c&&(c=b.indexOf(a+"=")),-1===c)b=null;else{c=b.indexOf("=",c)+1;var d=b.indexOf(";",c);-1===d&&(d=b.length),b=unescape(b.substring(c,d))}return b}},$(document).ready(function(){null!==window.cookie.get("credentials")&&(document.location.href="/app.html")});var cookie_life=365;$(document).ready(function(){$("#login_form").submit(function(){var a=$("#remember").is(":checked")?cookie_life:null;return window.cookie.set("credentials",btoa($("#email").val()+":"+$("#password").val()),a),document.location.href="/app.html",!1})});