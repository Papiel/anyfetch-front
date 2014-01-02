'use strict';

angular.module('anyfetchFrontApp.documentService', [])
.factory( 'DocumentTypesService', function() {

  var datas = {
    documentTypes: null
  };

  datas.set = function(documentTypes) {
    angular.forEach(documentTypes, function(value){
      value.search_count = 0;
      value.visible = true;
    });
    datas.documentTypes = documentTypes;
  };

  datas.updateSearchCounts = function(resultsCounts) {
    angular.forEach(datas.documentTypes, function(value, key){
      var nbResults = resultsCounts[key];
      value.search_count = nbResults ? nbResults : 0;
    });
  };

  datas.get = function() {
    return datas.documentTypes;
  };

  // Return of the service
  return datas;

});