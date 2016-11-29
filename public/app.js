// http://stackoverflow.com/questions/30848389/in-angularjs-how-to-update-table-data-after-deleting-a-row-from-it
// http://stackoverflow.com/questions/10816073/how-to-do-paging-in-angularjs


var app = angular.module('contactApp',['ui.bootstrap','ngRoute']);

app.config(function ($routeProvider, $locationProvider){
  $routeProvider
    .when('/' ,                 { templateUrl : 'views/contacts.html'})
    .when('/contacts/:id/edit' ,{ templateUrl : 'views/contacts_edit.html'})
    .when('/contacts/add' ,     { templateUrl : 'views/contacts_add.html'});
  // .otherwise({ redirectTo : '/'});

  // $locationProvider.html5Mode(true);
})
.filter('startFrom', function(){
  return function(data, start){
    return data.slice(start)
  }
});

