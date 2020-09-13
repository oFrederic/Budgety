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
  };
})();

/**********************************************
 *** UI MODULE: UI controller
 **********************************************/
const UIController = (function () {
  const DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputAmount: ".add__amount",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
  };

  return {
    getDOMstrings: function () {
      return DOMstrings;
    },

    getNewBudgetEntry: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // inc or exp (+ or -)
        description: document.querySelector(DOMstrings.inputDescription).value,
        amount: document.querySelector(DOMstrings.inputAmount).value,
      };
    },

    addBudgetUI: function (obj, type) {
      let el, html;

      // create HTML with correct value
      if (type === "inc") {
        el = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="income-0"><div class="item__description">${obj.description}</div>
          <div class="right clearfix"><div class="item__value">${obj.amount}</div><div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>`;
      } else {
        el = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-0"><div class="item__description">${obj.description}</div>
          <div class="right clearfix"><div class="item__value">${obj.amount}</div><div class="item__percentage">21%</div>
          <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>
          </div></div>`;
      }

      // insert HTML
      document.querySelector(el).insertAdjacentHTML("beforeend", html);
    },
  };
})();

/**********************************************
 *** CONTROLLER MODULE: global app controller
 **********************************************/
const controller = (function (budgetCtrl, UICtrl) {
  const setupEventListener = function () {
    const DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") ctrlAddItem();
    });
  };

  const ctrlAddItem = function () {
    //1. get input value
    const input = UICtrl.getNewBudgetEntry();

    //2. add input to data
    const item = budgetCtrl.addItem(
      input.type,
      input.description,
      input.amount
    );

    //3. add input to UI
    UICtrl.addBudgetUI(item, input.type);

    //4. calculate budget data
    //5. update ui budget
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
