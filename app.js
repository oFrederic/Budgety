// DATA MODULE: budget controller.
var budgetController = (function () {
  // some code
})();

// UI MODULE: UI controller.
var UIController = (function () {
  // some code
})();

// CONTROLLER MODULE: global app controller.
var controller = (function (budgetCtrl, UICtrl) {
  var ctrlAddItem = function () {
    //1. get input value
    //2. add new item to data
    //3. calculate budget data
    //4. add new item to UI
    console.log("button pushed");
  };

  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
