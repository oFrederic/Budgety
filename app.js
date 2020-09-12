/**********************************************
 *** DATA MODULE: budget controller
 **********************************************/
const budgetController = (function () {
  // some code
})();

/**********************************************
 *** UI MODULE: UI controller
 **********************************************/
const UIController = (function () {
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
const controller = (function (budgetCtrl, UICtrl) {
  const setupEventListener = function () {
    const DOM = UICtrl.DOMstring;

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") ctrlAddItem();
    });
  };

  const ctrlAddItem = function () {
    //1. get input value
    const input = UICtrl.getInput();
    //2. add new item to data
    //3. calculate budget data
    //4. add new item to UI
  };

  return {
    init: function () {
      setupEventListener();
    },
  };
})(budgetController, UIController);

/**********************************************
 *** INITIALIZATION
 **********************************************/
controller.init();
