"use strict";angular.module("anyfetchFrontApp",["ngCookies","ngResource","ngRoute","anyfetchFrontApp.filters","anyfetchFrontApp.gravatarDirective","anyfetchFrontApp.snippetDirective","anyfetchFrontApp.authenticationService","anyfetchFrontApp.documentService","anyfetchFrontApp.providerService"]).config(["$routeProvider","$sceProvider","$httpProvider",function(a,b,c){b.enabled(!1),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"});var d=["$location","$q",function(a,b){function c(a){return a}function d(c){return 401===c.status?(a.path("/login"),b.reject(c)):b.reject(c)}return function(a){return a.then(c,d)}}];c.responseInterceptors.push(d)}]).run(["AuthService","$route","$q","$location","$rootScope",function(a,b,c,d,e){var f=function(){var b=c.defer();return a.isLoggedin().then(function(a){b.resolve(a)},function(){d.path("/login"),b.resolve()}),b.promise};angular.forEach(b.routes,function(a,c){("/login"!==c||"/login/"!==c)&&(b.routes[c].resolve={},b.routes[c].resolve.currentUser=f)}),e.$on("$viewContentLoaded",function(){$(document).foundation()})}]);