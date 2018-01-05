

var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope,$http) {
    

    var reload=function()
    {
    	 $http.get('/getcontact').success(function(response){
    	    $scope.contactList=response;
    	    $scope.ob="";
   		 });

    }

    reload();
   


    $scope.addContact=function(formDetail)
    {

    	console.log(formDetail)
    	$http.post('/addcontact',formDetail).success(function(response) {
    		console.log(response);
    		reload();
    	});
    }


    $scope.removeContact=function(id)
    {
    	console.log(id)
    	$http.delete('/deletecontact/' + id).success(function(response)
    	{
    		reload();
    	});

    }

    $scope.editContact=function(id)
    {
    	  $http.get('/getcontact/' + id  ).success(function(response){
    	    $scope.ob=response;
   		 });

    }


    $scope.updateContact=function(id)
    {
    	var data=$scope.ob;
    	 $http.put('/updatecontact/' + id , data ).success(function(response)
    	 {
    	 	reload();

    	 });

    }

    $scope.clear=function()
    {
    	$scope.ob="";
    }


});