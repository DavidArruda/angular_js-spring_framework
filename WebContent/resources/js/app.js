var app = angular.module('loja', ['ngRoute', 'ngResource','ngAnimate']);

app.config(function($routeProvider) {

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
			
			
			
			
			$routeProvider.when("/fornecedorlist", {
				controller : "fornecedorController",
				templateUrl : "fornecedor/list.html"
			})
			
			.when("/fornecedoredit/:id", {
				controller : "fornecedorController",
				templateUrl : "fornecedor/cadastro.html"
			})
			
			.when("/fornecedor/cadastro", {
				controller : "fornecedorController",
				templateUrl : "fornecedor/cadastro.html"
			})
			
			
			
			$routeProvider.when("/livrolist", {
				controller : "livroController",
				templateUrl : "livro/list.html"
			})
			
			.when("/livroedit/:id", {
				controller : "livroController",
				templateUrl : "livro/cadastro.html"
			})
			
			.when("/livro/cadastro", {
				controller : "livroController",
				templateUrl : "livro/cadastro.html"
			})
			
			
			
			.otherwise({
				redirectTo : "/"
			});
});



app.controller('fornecedorController', function($scope, $http, $location, $routeParams) {

if($routeParams.id != null && $routeParams.id != undefined
			&& $routeParams.id != ''){
		
	$http.get("fornecedor/buscarFornecedor/" + $routeParams.id).success(function(response) {
			$scope.fornecedor = response;
			
			document.getElementById("imagemFornecedor").src = $scope.fornecedor.foto;
			
			setTimeout(function () {
				$("#selectEstados").prop('selectedIndex', (new Number($scope.fornecedor.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.fornecedor.estados.id).success(function(response) {
					$scope.cidades = response;
					setTimeout(function () {
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.fornecedor.cidades.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
			}, 1000);
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	}else {
		$scope.fornecedor = {};
	}

	$scope.editarFornecedor = function(id){
		$location.path('fornecedoredit/' + id);
	};
	
	$scope.salvarFornecedor = function () {
		$scope.fornecedor.foto = document.getElementById("imagemFornecedor").getAttribute("src");
	
		$http.post("fornecedor/salvar", $scope.fornecedor).success(function(response) {
			$scope.fornecedor = {};
			document.getElementById("imagemFornecedor").src = '';
			sucesso("Gravado com sucesso!");
			
		}).error(function(response) {
			erro("Error: " + response);
		});
	};

	$scope.listarFornecedor = function(numeroPagina){
		$scope.numeroPagina = numeroPagina;
		$http.get("fornecedor/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			
			$http.get("fornecedor/totalPagina").success(function(response) {
				$scope.totalPagina = response;
			}).error(function(response) {
				erro("Error: " + response);
			});

		}).error(function(response) {
			erro("Error: " + response);
		});
	};

	$scope.proximo = function(){
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
			$scope.listarFornecedor(new Number($scope.numeroPagina + 1));
		}
		
	};
	
	$scope.anterior = function(){
		if(new Number($scope.numeroPagina) > 1) {
			$scope.listarFonecedores(new Number($scope.numeroPagina - 1));
		}
	};

	$scope.removerFornecedor = function(codCliente) {
		$http.delete("fornecedor/deletar/" + codFornecedor).success(function(response) {
			$scope.listarFornecedor($scope.numeroPagina);
			sucesso("Removido com sucesso!");
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	};
	
    $scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome') {// executa se for diferente do chrome
			$http.get("cidades/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(data, status, headers, config) {
				erro("Error: " + status);
			});
	  }
	};
	
   $scope.carregarEstados = function() {
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response) {
			$scope.dataEstados = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
});






app.controller('clienteController', function($scope, $http, $location, $routeParams) {

	if($routeParams.id != null && $routeParams.id != undefined
			&& $routeParams.id != ''){
		
	$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response) {
			$scope.cliente = response;
			
			document.getElementById("imagemCliente").src = $scope.cliente.foto;
			
			setTimeout(function () {
				$("#selectEstados").prop('selectedIndex', (new Number($scope.cliente.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.cliente.estados.id).success(function(response) {
					$scope.cidades = response;
					setTimeout(function () {
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.cliente.cidades.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
			}, 1000);
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	}else {
		$scope.cliente = {};
	}

	$scope.editarCliente = function(id){
		$location.path('clienteedit/' + id);
	};
	
	$scope.salvarCliente = function () {
		$scope.cliente.foto = document.getElementById("imagemCliente").getAttribute("src");
	
		$http.post("cliente/salvar", $scope.cliente).success(function(response) {
			$scope.cliente = {};
			document.getElementById("imagemCliente").src = '';
			sucesso("Gravado com sucesso!");
			
		}).error(function(response) {
			erro("Error: " + response);
		});
	};

	$scope.listarClientes = function(numeroPagina){
		$scope.numeroPagina = numeroPagina;
		$http.get("cliente/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			
			$http.get("cliente/totalPagina").success(function(response) {
				$scope.totalPagina = response;
			}).error(function(response) {
				erro("Error: " + response);
			});

		}).error(function(response) {
			erro("Error: " + response);
		});
	};

	$scope.proximo = function(){
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
			$scope.listarClientes(new Number($scope.numeroPagina + 1));
		}
		
	};
	
	$scope.anterior = function(){
		if(new Number($scope.numeroPagina) > 1) {
			$scope.listarClientes(new Number($scope.numeroPagina - 1));
		}
	};

	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).success(function(response) {
			$scope.listarClientes($scope.numeroPagina);
			sucesso("Removido com sucesso!");
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	};
	
    $scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome') {// executa se for diferente do chrome
			$http.get("cidades/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(data, status, headers, config) {
				erro("Error: " + status);
			});
	  }
	};
	
   $scope.carregarEstados = function() {
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response) {
			$scope.dataEstados = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
});





app.controller('livroController', function($scope, $http, $location, $routeParams) {

	if($routeParams.id != null && $routeParams.id != undefined
			&& $routeParams.id != ''){
		
	$http.get("livro/buscarlivro/" + $routeParams.id).success(function(response) {
			$scope.livro = response;
			
			document.getElementById("imagemLivro").src = $scope.livro.foto;
			
				$http.get("fornecedor/listartodos/").success(function(response) {
					$scope.fornecedoresList = response;
					setTimeout(function () {
						$("#selectFornecedores").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.livro.fornecedor.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	}else {
		$scope.livro = {};
	}

	$scope.editarLivro = function(id){
		$location.path('livroedit/' + id);
	};
	
	$scope.salvarLivro = function () {
		$scope.livro.foto = document.getElementById("imagemLivro").getAttribute("src");
	
		$http.post("livro/salvar", $scope.livro).success(function(response) {
			$scope.livro = {};
			document.getElementById("imagemLivro").src = '';
			sucesso("Gravado com sucesso!");
			
		}).error(function(response) {
			erro("Error: " + response);
		});
	};

	$scope.listarLivros = function(numeroPagina){
		$scope.numeroPagina = numeroPagina;
		$http.get("livro/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			
			$http.get("livro/totalPagina").success(function(response) {
				$scope.totalPagina = response;
			}).error(function(response) {
				erro("Error: " + response);
			});

		}).error(function(response) {
			erro("Error: " + response);
		});
	};

	$scope.proximo = function(){
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
			$scope.listarLivros(new Number($scope.numeroPagina + 1));
		}
		
	};
	
	$scope.anterior = function(){
		if(new Number($scope.numeroPagina) > 1) {
			$scope.listarLivros(new Number($scope.numeroPagina - 1));
		}
	};

	$scope.removerLivro = function(codLivro) {
		$http.delete("livro/deletar/" + codLivro).success(function(response) {
			$scope.listarLivros($scope.numeroPagina);
			sucesso("Removido com sucesso!");
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	};
	
	$scope.listarFornecedores = function() {
		$http.get("fornecedor/listartodos/").success(function(response) {
			$scope.fornecedoresList = response;
					
		}).error(function(data, status, headers, config) {
					erro("Error: " + status);
		});
	}
	
});









function visualizarImg(){
	var preview = document.querySelectorAll('img').item(1);
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	
	reader.onloadend = function () {
		preview.src = reader.result;
	};
	
	if(file) {
		reader.readAsDataURL(file);
	}else {
		preview.src = "";
	}
}

function buscarKeyJson(obj, key, value)
{
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] == value) {
            return i + 2;
        }
    }
    return null;
}

function sucesso(msg) {
	$.notify({
    	message: msg

    },{
    	type: 'success',
        timer: 1000
    });
}

function erro(msg) {
	$.notify({
    	message: msg

    },{
    	type: 'danger',
        timer: 1000
    });
}
    
function carregarCidadesChrome(estado) {
	if (identific_nav() === 'chrome') {// executa se for chrome
		$.get("cidades/listarchrome", { idEstado : estado.value}, function(data) {
			 var json = JSON.parse(data);
			 html = '<option value="">--Selecione--</option>';
			 for (var i = 0; i < json.length; i++) {
				  html += '<option value='+json[i].id+'>'+json[i].nome+'</option>';
			 }
			 $('#selectCidades').html(html);
		});
  }
}
    
// identificar navegador
function identific_nav(){
    var nav = navigator.userAgent.toLowerCase();
    if(nav.indexOf("msie") != -1){
       return browser = "msie";
    }else if(nav.indexOf("opera") != -1){
    	return browser = "opera";
    }else if(nav.indexOf("mozilla") != -1){
        if(nav.indexOf("firefox") != -1){
        	return  browser = "firefox";
        }else if(nav.indexOf("firefox") != -1){
        	return browser = "mozilla";
        }else if(nav.indexOf("chrome") != -1){
        	return browser = "chrome";
        }
    }else{
    	alert("Navegador desconhecido!");
    }
}

