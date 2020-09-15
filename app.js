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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.amount / totalInc) * 100);
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
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
    budget: 0,
    percentage: -1,
  };

  const calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (element) {
      sum += element.amount;
    });
    data.total[type] = sum;
  };

  return {
    addItem: function (type, description, amount) {
      let item, id;
      //create unique id
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }
      //init object with correct data
      if (type === "inc") {
        item = new Income(id, description, amount);
      } else {
        item = new Expense(id, description, amount);
      }
      //save data
      data.allItems[type].push(item);
      //return object itself
      return item;
    },

    deleteItem: function (obj) {
      const DataID = data.allItems[obj.type].map(function (element) {
        return element.id;
      });
      const index = DataID.indexOf(obj.id);
      data.allItems[obj.type].splice(index, 1);
    },

    calculateBudget: function () {
      //total inc and exp
      calculateTotal("inc");
      calculateTotal("exp");
      //current amount: inc - exp
      data.budget = data.total.inc - data.total.exp;
      //percentenge of inc spend
      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      }
    },

    calculatePercentages: function () {
      data.allItems.exp.forEach(function (element) {
        element.calcPercentage(data.total.inc);
      });
    },

    getPercentages: function () {
      const arrPercentage = data.allItems.exp.map(function (element) {
        return element.getPercentage();
      });
      return arrPercentage;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage,
      };
    },

    //ONLY FOR DEBUGGING PURPOSE
    test: function () {
      console.log(data);
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
    budgetTag: ".budget__value",
    incomeTag: ".budget__income--value",
    expenseTag: ".budget__expenses--value",
    percentage: ".budget__expenses--percentage",
    container: ".container",
    deleteIcon: "ion-ios-close-outline",
    expItemPerc: ".item__percentage",
  };

  const formatNumber = function (num, type) {
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split(".");
    int = numSplit[0];
    dec = numSplit[1];
    if (int.length > 3) {
      for (var i = int.length - 3; i > 0; i = i - 3) {
        int = int.slice(0, i) + "," + int.slice(i, int.length);
      }
    }
    return `${type === "exp" ? "-" : "+"} ${int}.${dec}`;
  };

  return {
    getDOMstrings: function () {
      return DOMstrings;
    },

    getNewBudgetEntry: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // inc or exp (+ or -)
        description: document.querySelector(DOMstrings.inputDescription).value,
        amount: parseFloat(
          document.querySelector(DOMstrings.inputAmount).value
        ),
      };
    },

    clearField: function () {
      const field = document.querySelectorAll(
        `${DOMstrings.inputDescription}, ${DOMstrings.inputAmount}`
      );
      field.forEach(function (element) {
        element.value = "";
      });
      field.item(0).focus();
    },

    addBudgetList: function (obj, type) {
      let el, html;
      //create HTML with correct value
      if (type === "inc") {
        el = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix"><div class="item__value">${formatNumber(
          obj.amount,
          type
        )}
        </div><div class="item__delete"><button class="item__delete--btn">
        <i class="ion-ios-close-outline"></i></button></div></div>`;
      } else {
        el = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="exp-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix"><div class="item__value">${formatNumber(
          obj.amount,
          type
        )}
        </div><div class="item__percentage">--%</div>
        <div class="item__delete"><button class="item__delete--btn">
        <i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }

      //formatNumber(num, type)
      //insert HTML
      document.querySelector(el).insertAdjacentHTML("beforeend", html);
    },

    deleteBudgetListUI: function (obj) {
      const selectorID = `${obj.type}-${obj.id}`;
      document.getElementById(selectorID).remove();
    },

    displayBudget: function (obj) {
      let type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");
      document.querySelector(DOMstrings.budgetTag).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeTag).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseTag).textContent = formatNumber(
        obj.totalExp,
        "exp"
      );
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentage).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentage).textContent = "--%";
      }
    },

    displayPercentage: function (arr) {
      const fields = document.querySelectorAll(DOMstrings.expItemPerc);
      fields.forEach(function (element, index) {
        if (arr[index] > 0) element.textContent = `${arr[index]}%`;
      });
    },

    getItemToDelete(event) {
      if (event.target.className === DOMstrings.deleteIcon) {
        const itemID = event.target.closest(".item").id;
        const split = itemID.split("-");
        const type = split[0];
        const id = split[1];

        return {
          type: type,
          id: parseInt(id),
        };
      }
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
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  const ctrlAddItem = function () {
    //1.get input value and then clear the fields
    const input = UICtrl.getNewBudgetEntry();
    UICtrl.clearField();
    if (input.description !== "" && input.amount > 0 && !isNaN(input.amount)) {
      //2.add input to data
      const item = budgetCtrl.addItem(
        input.type,
        input.description,
        input.amount
      );
      //3.add input to UI
      UICtrl.addBudgetList(item, input.type);
      //4.calculate and update budget
      updateBudget();
      //5.calculate and update percentages
      updatePercentages();
    }
  };

  const ctrlDeleteItem = function (event) {
    //1. get element to delete
    const item = UICtrl.getItemToDelete(event);
    if (item !== undefined) {
      //2. delete element from data structure
      budgetCtrl.deleteItem(item);
      //3. delete element from UI
      UICtrl.deleteBudgetListUI(item);
      //4. re-calculate and update UI budget with correct data
      updateBudget();
      //5. calculate and update percentages
      updatePercentages();
    }
  };

  const updateBudget = function () {
    //1. calculate budget data
    budgetCtrl.calculateBudget();
    //2. return budget
    const budget = budgetCtrl.getBudget();
    //3. update ui budget
    UICtrl.displayBudget(budget);
  };

  const updatePercentages = function () {
    //1. calculate percentages
    budgetCtrl.calculatePercentages();
    //2. read percentages from budget controller
    const percentagesList = budgetCtrl.getPercentages();
    //3. update the UI with the new percentages
    UICtrl.displayPercentage(percentagesList);
  };

  return {
    init: function () {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListener();
    },
  };
})(budgetController, UIController);

/**********************************************
 *** INITIALIZATION
 **********************************************/
controller.init();
