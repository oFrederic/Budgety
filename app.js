/**********************************************
 *** DATA MODULE: budget controller
 **********************************************/
const budgetController = (function () {
  const Income = function (id, description, amount) {
    this.id = id;
    this.description = description;
    this.amount = amount;
  };

  const Expense = function (id, description, amount) {
    this.id = id;
    this.description = description;
    this.amount = amount;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },

    total: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, description, amount) {
      let item, id;

      // create unique id
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // init object with correct data
      if (type === "inc") {
        item = new Income(id, description, amount);
      } else {
        item = new Expense(id, description, amount);
      }

      // save data
      data.allItems[type].push(item);

      // return object itself
      return item;
    },

    test: function () {
      console.log(data); // ONLY FOR TESTING PURPOSE, DELETE LATER ON!!!!!
    },
  };
})();

/**********************************************
 *** UI MODULE: UI controller
 **********************************************/
const UIController = (function () {
  return {
    DOMstring: {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputAmount: ".add__amount",
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
    //2. add new item to data
    if (input.description !== "" && input.amount !== 0) {
      const item = budgetController.addItem(
        input.type,
        input.description,
        input.amount
      );
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
