var categories = [];
var totalBudget = 0;
var totalSpent = 0;

class Category {
  constructor(name, budget, index) {
    this.name = name;
    this.budget = budget;
    this.index = index;
    this.spent = 0;
  }

  spend(spent) {
    this.spent = this.spent + spent;
    $(".total-spent").text(`$${this.spent} / $${this.budget}`);
  }

  getCategory() {
    var string =
      `<div class="item">
            <button class="remove-button">-</button>
            <span class="category-name">${this.name}</span>
            <span class="category-budget">$${this.budget}</span>
          </div>`;

    return string;
  }

  createButton() {

    $(".home-category-list").append(`
      <div>
        <button class="category-button">${this.name}</button>
        <span class = "spent-label">
          ${this.spent} / ${this.budget}
        </span>
      </div>`);
  }

  renderBarGraph() {
    $(".bar-graph").append(`
      <div class= "bar" id="bar-${this.name}">
        <div class = "stat" id="stat-${this.name}">
          ${this.spent} / ${this.budget}
        </div>
        <div class="spent-bar" id="spent-bar-${this.name}">
        </div>
      </div>
      `);
    $(`#bar-${this.name}`).css("height", "500px");
    $(`#spent-bar-${this.name}`).css("height", percent(this.spent, this.budget));
  }
}

// <span class = "total-spent">$${this.budget} / ${this.budget}</span>

var name;
var budget;
var index = 0;
var spent;

function updateAll() {
  updateTotalBudget();
  updateBudgetBar();
  updateCategories();
  updateGraph();
}

function updateTotalBudget() {
  totalSpent = categories.reduce((prevVal, elem) => prevVal + elem.spent, 0);
  totalBudget = categories.reduce((prevVal, elem) => prevVal + elem.budget, 0);
  $(".total-budget").text(`Your budget remaining is $${totalSpent} out of $${totalBudget}`);
}

function updateCategories() {
  $(".home-category-list").empty();
  categories.map(category => category.createButton());
}

function percent(spent, total) {
  var percent = (100 * spent / total);
  return percent.toString() + "%";
}

function updateBudgetBar() {
  $(".budget-text").text = totalSpent + " / " + totalBudget;
  $(".remaining-budget-bar").css("width", percent(totalSpent, totalBudget));
  // $(".remaining-budget-bar").css("background-color", setBarColor());
}

function removeCategory(index) {
  $(`.item:nth-child(${index + 1})`).remove();
  totalBudget = totalBudget - categories[index].budget;
  categories.splice(index, 1);
  updateAll();
}

function checkDuplicateName(name) {
  var duplicate = categories.filter(category => (category.name === name));
  console.log(duplicate);
  if (duplicate.length > 0) {
    return true;
  }
  else {
    return false
  }
}

//GRAPH
function updateGraph() {
  $(".bar-graph").empty();
  categories.map(category => category.renderBarGraph());
}

$(document).ready(function() {
  updateAll();

  // ADD BUTTON
  $(".make-category").click(function() {
    name = $("#category-name").val();
    budget = parseFloat($("#category-budget").val());
    if (checkDuplicateName(name) === false && budget !== NaN && budget > 0) {
      categories.push(new Category(name, budget, index));
      updateAll();
      $("#category-name").val("");
      $("#category-budget").val("");
      $(".categories-list").append(categories[categories.length - 1].getCategory());
      $("#category-name").focus();
    } else {
      console.log("Please enter a unique category name and a positive number for the budget.");
    }
  });

  // 'ENTER' KEY CLICKS THE 'ADD' BUTTON.
  $("#category-name").keyup(function(e) {
    if (e.keyCode === 13) {
      $(".make-category").click();
    }
  });

  $("#category-budget").keyup(function(e) {
    if (e.keyCode === 13) {
      $(".make-category").click();
    }
  });

  // REMOVE BUTTON
  $(document).on("click", ".remove-button", function() {
    index = $(".remove-button").index(this);
    removeCategory(index);
  });

  // spent button
  $(document).on("click", ".category-button", function() {
    $(".message-box").text("");
    var spentInput = $("#spent").val();
    if (spentInput === "") {
      $(".message-box").text("Enter Amount, Then Click! Stupid Idiot");
    } else if (!$.isNumeric(spentInput)) {
      console.log(spentInput);
      $(".message-box").text("You Must Enter a Number");
    } else if (parseFloat(spentInput) + totalSpent > totalBudget) {
      $(".message-box").text("This is over your budget!");
    } else {
      spent = parseFloat($("#spent").val());
      index = $(".category-button").index(this);
      categories[index].spend(spent);
      updateAll();
    }
  });

  // HOME BUTTON
  $(document).on("click", "#to-home", function() {});

  // DATA BUTTON
  $(document).on("click", "#to-data", function() {
    $(".bar-graph").empty();
    updateGraph();
  });
});
