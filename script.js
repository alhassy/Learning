angular.module("Learning", [])
 .controller("start",
             ($scope, $http) => {

                 $scope.refresh = limit => {
                     $http.get(`https://mc-dev-5.herokuapp.com/jsonapi/v1/courses?email=alhassy@gmail.com&page[limit]=${limit}&page[offset]=2`)
                         .then(response => { $scope.courses = response.data }, _ => { $scope.courses = [] });
                 }

                 $scope.refresh(10)

                 $scope.toggleFavorite = course => {
                     course.favorite = !course.favorite
                     let request = {
                         method: course.favorite ? 'POST' : 'DELETE',
                         url: `https://mc-dev-5.herokuapp.com/jsonapi/v1/favorite`,
                         headers: {
                             "Content-Type" : "application/json"
                         },
                         data: { email: "alhassy@gmail.com",
                                 "course_id": course.id
                               }
                     }
                     $http(request)
                 }
             })
