var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });
      $urlRouterProvider.otherwise('home');
  }]);

app.directive('hola', function() {
  return {
    restrict: "E",
    template: "<h1>You look splendid!</h1>"
  }
});

app.factory('posts', [function(){
  var o = {
    posts: []
  }
  return o;
}])

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.posts = posts.posts;
    console.log($scope.posts);
    $scope.addPost = function() {
      if(!$scope.title || $scope.title === '') {return;}
      console.log('running');
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Ryan', body: 'Great comment!', upvotes: 100},
          {author: 'Greg', body: 'Crappy comment!', upvotes: 2},
        ]}
      );
      $scope.title = '';
      $scope.link = '';
      console.log($scope.posts)
    }
    $scope.incrementUpvotes = function(post) {
      post.upvotes++;
    };
  }]);



app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = post.posts[$stateParams.id];
    $scope.addComment = function() {
    if($scope.body === '') {return;}
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    })
    $scope.body = '';
  };
  }]);



