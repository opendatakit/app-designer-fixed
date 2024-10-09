/* global odkData */

'use strict';

(function () {
  var detailViewFields = {
    name: 'Name',
    state: 'State',
    menu: 'Order',
    size: 'Size',
    flavor: 'Flavor',
    box: 'Quantity',
  };

  var detailViewCallbackSuccess = function (result) {
    var template = document.getElementById('skipLogicDetailTemplate');
    var fieldsContainer = document.getElementById('skipLogicDetailContainer');

    Object.entries(detailViewFields).forEach(function (entry) {
      var fieldValue = result.get(entry[0]);

      if (fieldValue !== undefined && fieldValue !== null) {
        var detailField = document.importNode(template.content, true);

        detailField.querySelector('.skip-logic-detail-label').textContent = entry[1];
        detailField.querySelector('.skip-logic-detail-value').textContent = fieldValue;

        fieldsContainer.appendChild(detailField);
      }
    });
  };

  var detailViewCallbackFailure = function (error) {
    console.error(error);
  };

  document.addEventListener('DOMContentLoaded', function () {
    odkData.getViewData(detailViewCallbackSuccess, detailViewCallbackFailure);

    document.getElementById('wrapper').classList.remove('d-none');
  });
})();
