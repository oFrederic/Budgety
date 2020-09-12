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
      inputAmount: ".add__value",
      inputBtn: ".add__btn",
    },

    getNewBudgetEntry: function () {
      return {
        type: document.querySelector(this.DOMstring.inputType).value, // inc or exp (+ or -)
        description: document.querySelector(this.DOMstring.inputDescription)
          .value,
        amount: document.querySelector(this.DOMstring.inputAmount).value,
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
    const input = UICtrl.getNewBudgetEntry();
    if (input.description !== "" && input.amount !== 0) {
      //2. add new item to data
    }
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
