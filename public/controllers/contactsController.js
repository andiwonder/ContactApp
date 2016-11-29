app.controller('contactsController',
  ['$scope', '$http' , '$location', '$routeParams' , function($scope, $http , $location, $routeParams){
  $scope.pageSize = 4;
  $scope.currentPage = 1;
  $scope.del_modal_id;
  $scope.add_contact_groups = [];
  $scope.edit_contact_groups = [];
  var new_groups = [];
  var new_edit_groups = [];
  $scope.selected_groups = [];
  $scope.selected_edit_groups = [];
  $scope.ph_numbr = /^(\+?(\d{1}|\d{2}|\d{3})[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/;
  $scope.groups = ["family","friends","work","school","church"];
  var removeValue = function(array, id) {
    return _.reject(array, function(item) {
      return item === id; // or some complex logic
    });
  };

  $scope.emptyGroups = function(){
    new_groups = [];
  }

  $scope.removeGroup = function(group){
    new_groups = removeValue(new_groups,group);
    $scope.selected_groups = new_groups;
  }

  $scope.editremoveGroup = function(contact, group){
    contact.groups = removeValue(contact.groups,group);
  }

  $scope.addGroup = function (){
    new_groups.push($( "#addcontact_form_select option:selected" ).text());
    $scope.selected_groups = new_groups
    console.log($scope.selected_groups);
  }


  $scope.editContactGroupAdd = function(contact){
    new_edit_groups = contact.groups;
    var new_val = $( "#editcontact_form_select option:selected" ).text();
    if (new_edit_groups.indexOf(new_val) == -1) {
      new_edit_groups.push(new_val);
      contact.groups = new_edit_groups;  
    }
  }

  $scope.del_id = function(contact_id){
    $scope.del_modal_id = contact_id;
  };

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
    new_groups = [];
    contact.groups = $scope.selected_groups;
    console.log($.param(contact));
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
    // console.log(index);
    // console.log($scope.contacts);
    // console.log($scope.contact);
    // var new_info = $scope.contact
    $http({
      url: '/api/contacts/' + id, method: "PUT", data: $.param($scope.contact),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    $scope.contacts[index] = $scope.contact;
    window.location.href='#/';
    // console.log($scope.contacts);
  }


  $scope.removeContact = function(){
    $http.delete('/api/contacts/'+$scope.del_modal_id).success(function(response){})
    .success(function (response) {
      var index = _.findIndex($scope.contacts, function(contact) { return contact._id == $scope.del_modal_id })
      $scope.contacts.splice(index, 1);
      $('#del_Modal').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      window.location.href='#/';
    });
  }

  $scope.emptyContact = function(){
    $scope.contact = {};
  }

  $scope.getContacts();
}]);
