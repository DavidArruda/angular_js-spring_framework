var app = angular.module('loja', ['ngRoute', 'ngResource','ngAnimate']);

app.config(function($routeProvider, $provide, $httpProvider, $locationProvider) {

	$routeProvider.when("/clientelist", {
				controller : "clienteController",
				templateUrl : "cliente/list.html"
			})
			
			.when("/clienteedit/:id", {
				controller : "clienteController",
				templateUrl : "cliente/cadastro.html"
			})
			
			.when("/cliente/cadastro", {
				controller : "clienteController",
				templateUrl : "cliente/cadastro.html"
			})
			
			.otherwise({
				redirectTo : "/"
			});
});





