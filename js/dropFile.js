var DUApp = angular.module("DUApp",[]);

DUApp.controller('DUCtrl', function ($scope, $http, $rootScope){
  const myUrl = 'https://g0jcmxpk5b.execute-api.us-east-1.amazonaws.com/default/dk-s3-upload'
  const du = DropUpload({
    targetElement: '#du', 
    hoverClass: 'hover',
    headers: {
      "Access-Control-Allow-Origin": "http://dk-web-public.s3-website.us-east-2.amazonaws.com"
    }
  });
  
  $scope.upload = () => {
    /*************************************************
     * Change the value of my_url to set it in action
     *************************************************/
    
  }
  
  du.addEventListener('files-dropped', (e) => {
    /************************************************
     * e.detail contains an array of the files that were dropped.
     *************************************************/
    du.upload(myUrl, (e) => {
      // Fade out
    });
    $scope.files = e.detail;
    $scope.$apply();
  });
  
  du.addEventListener('progress', (e) => {
    /*************************************************
     * Each file has a progress property that is updated,
     * which is being used in the Angular template to set 
     * the width of the progress bar.
     * Since the list of files is in $scope.files,
     * all that needs to be done is to call $scope.$apply.
     **************************************************/
    $scope.$apply();
  });
  
  du.addEventListener('error', (e) => {
    console.log('Some bad stuff happened', e);
  });
  
  $scope.getEntity = (item) => {
		$http({
			method: 'GET',
      'url': myUrl+'?path='+item.name,
      dataType: 'jsonp',
      headers: {
        'crossorigin': 'anonymous',
        'X-Requested-With': 'XmlHttpRequest'
      }
    }).then(
        	(reply, status, headers, config) => {
	  			if(reply.data.entities){
		  			if(reply.data.entities[0].relations.sources['$grainger.parentrelationtype']){
		  				var n = reply.data.entities[0].relations.sources['$grainger.parentrelationtype'];
			  			//nodes = [];
			  			
		  				n.forEach((i)=>{
		  					i.nodes = [];
		  					i.open = false;
		  					i.path = node.path + '/'+i.name;
		  					node.nodes.push(i);
		  				});
		  			}else{
			  			var n = reply.data.entities;
			  			clearTree();
			  			n.forEach((i)=>{
		  					i.nodes = [];
		  					i.open = false;
		  					node.nodes.push(i);
		  				});
		  				
		  			}
		  		}
	  		},
	  		(data, status, headers, config) => {
	  			var i = 1;
	  		}
	  	);
	};
});