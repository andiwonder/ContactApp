app.controller('contactsController',
  ['$scope', '$http' , '$location', '$routeParams' , function($scope, $http , $location, $routeParams){
 
  $scope.go = function ( ) {
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    window.location.href='#/';
  };

  $scope.getContacts = function(){
    $http.get('/api/contacts').success(function(response){
      $scope.contacts = response;
    });
  };

  $scope.getContact = function(id){
    $http.get('/api/contacts/'+id).success(function(response){
      $scope.contact = response;
    });
    window.location.href='#/contacts/' + id + '/edit';
  }


  $scope.addContact = function( contact){
    $http({
      url: '/api/contacts/', method: "POST", data: $.param(contact),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (response) {
      contact._id = response;
    });
    $scope.contacts.push(contact);
    window.location.href='#/';
  };

  $scope.updateContact = function(){
    var id = $routeParams.id;
    var index = _.findIndex($scope.contacts, function(contact) { return contact._id == id });
    console.log(index);
    console.log($scope.contacts);
    console.log($scope.contact);
    var new_info = $scope.contact
    $http({
      url: '/api/contacts/' + id, method: "PUT", data: $.param($scope.contact),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    $scope.contacts[index] = $scope.contact;
    window.location.href='#/';
    console.log($scope.contacts);
  }

  $scope.removeContact = function(id){
    $http.delete('/api/contacts/'+id).success(function(response){})
    .success(function (response) {
      var index = _.findIndex($scope.contacts, function(contact) { return contact._id == id })
      $scope.contacts.splice(index, 1);
      window.location.href='#/';
    });
  }

  $scope.getContacts();
}]);
