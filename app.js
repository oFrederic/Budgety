/**********************************************
 *** DATA MODULE: budget controller
 **********************************************/
var budgetController = (function () {
  // some code
})();

/**********************************************
 *** UI MODULE: UI controller
 **********************************************/
var UIController = (function () {
  return {
    DOMstring: {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn",
    },
    getInput: function () {
      return {
        input: document.querySelector(this.DOMstring.inputType).value, // inc or exp (+ or -)
        description: document.querySelector(this.DOMstring.inputDescription)
          .value,
        value: document.querySelector(this.DOMstring.inputValue).value,
      };
    },
  };
})();

/**********************************************
 *** CONTROLLER MODULE: global app controller
 **********************************************/
var controller = (function (budgetCtrl, UICtrl) {
  var ctrlAddItem = function () {
    //1. get input value
    var input = UICtrl.getInput();
    //2. add new item to data
    //3. calculate budget data
    //4. add new item to UI
  };

  document
    .querySelector(UICtrl.DOMstring.inputBtn)
    .addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") ctrlAddItem();
  });
})(budgetController, UIController);
