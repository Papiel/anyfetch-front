'use strict';

angular.module('anyfetchFrontApp.modalDirective', [])
.directive('modal', function(DocumentTypesService, ProvidersService, $location) {

  return {
    restrict: 'E',
    scope: {
      show: '=',
      documentfull: '=',
      query: '='
    },
    templateUrl: 'views/template modal.html',
    replace: true,
    link: function(scope) {
      scope.relDefaultLabel = 'undefined';
      scope.zoom = 100;
      scope.zoomClass = null;

      scope.resetScope = function () {
        scope.relatedShow = false;
        scope.relatedDatas = null;
        scope.fullText = null;
      };

      scope.displayFull = function(id) {
        var actualSearch = $location.search();
        actualSearch.id = id;
        console.log(actualSearch);
        $location.search(actualSearch);
      };

      scope.zoomIn = function() {
        if (scope.zoom < 200) {
          scope.zoom += 10;

          if (scope.zoom === 100) {
            scope.zoomClass = null;
          } else {
            scope.zoomClass = 'zoom-' + scope.zoom;
          }
        }
      };

      scope.zoomOut = function() {
        if (scope.zoom > 50) {
          scope.zoom -= 10;

          if (scope.zoom === 100) {
            scope.zoomClass = null;
          } else {
            scope.zoomClass = 'zoom-' + scope.zoom;
          }
        }
      };

      scope.getDocumentTypeIcon = function(document) {
        var docType = document.document_type;
        if (docType === '5252ce4ce4cfcd16f55cfa3c') {

          var path = document.datas.path;

          // Prez icon
          if (/\.(<[^\>]+>)?(ppt|pptx|odp)(<[^\>]+>)?/.exec(path)) {
            return docType + '-prez';
          }

          // Pdf icon
          if (/\.(<[^\>]+>)?pdf(<[^\>]+>)?/.exec(path)) {
            return docType + '-pdf';
          }

          // Tab icon
          if (/\.(<[^\>]+>)?(xls|xlsx|ods)(<[^\>]+>)?/.exec(path)) {
            return docType + '-tab';
          }

        }

        return docType;
      };

      scope.unbindEchap = function() {
        $(document).keyup(null);
      };

      scope.bindEchap = function() {
        $(document).keyup(function(e){
          if (e.keyCode === 27) {
            scope.$apply(scope.hideModal);
          }
        });
      };

      scope.hideModal = function() {
        scope.unbindEchap();
        scope.show = false;
        scope.zoom = 0;
        $('body').removeClass('lock');
      };

      scope.show_similar = function() {
        if ($location.search().id) {
          var actualSearch = $location.search();
          actualSearch.similar_to = actualSearch.id;
          delete actualSearch.id;
          $location.search(actualSearch);
        }
        scope.hideModal();
      };

      scope.getTitleProjection = function(rel) {
        var htmlTemplate = DocumentTypesService.get().list[rel.document_type].template_title;
        return Mustache.render(htmlTemplate, rel.datas);
      };

      scope.relatedToggle = function() {
        scope.relatedShow = !scope.relatedShow;
      };

      scope.$watch('documentfull', function(newVal) {
        scope.resetScope();
        console.log(scope.documentfull);

        $(document).foundation();
        scope.query = scope.query || $location.search().q;
        if (newVal) {
          var htmlTemplate = DocumentTypesService.get().list[scope.documentfull.document_type].template_full;
          scope.fullText = Mustache.render(htmlTemplate, scope.documentfull.datas);
          scope.provider = ProvidersService.providers.list[scope.documentfull.token];

          scope.bindEchap();
        }
      });
    }
  };
});