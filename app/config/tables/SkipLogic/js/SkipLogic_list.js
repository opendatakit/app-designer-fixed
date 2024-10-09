/* global odkTables, odkData */

'use strict';

(function () {
  var openDetailViewOnClick = function (rowId) {
    return function () {
      odkTables.openDetailView(null, 'SkipLogic', rowId);
    };
  };

  var listViewCallbackSuccess = function (result) {
    var resultCount = result.getCount();

    var template = document.getElementById('skipLogicListTemplate');
    var listContainer = document.getElementById('skipLogicList');

    for (var i = 0; i < resultCount; i++) {
      var listItem = document.importNode(template.content, true);

      listItem
        .querySelector('.skip-logic-list-name')
        .textContent = result.getData(i, 'name');

      listItem
        .querySelector('.skip-logic-list-order')
        .textContent = result.getData(i, 'menu');

      listItem
        .querySelector('.skip-logic-detail-view-link')
        .addEventListener('click', openDetailViewOnClick(result.getRowId(i)));

      listContainer.appendChild(listItem);
    }
  };

  var listViewCallbackFailure = function (error) {
    console.error(error);
  };

  document.addEventListener('DOMContentLoaded', function () {
    odkData.getViewData(listViewCallbackSuccess, listViewCallbackFailure);

    document.getElementById('wrapper').classList.remove('d-none');
  });
})();
