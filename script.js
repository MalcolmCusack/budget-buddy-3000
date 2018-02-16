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
        <div>
          <button class="remove-button">-</button>
        </div>
        <div class="category-name">${this.name}</div>
        <div class="category-budget">$${this.budget}</div>
      </div>`;

    return string;
  }

  createButton() {

    $(".home-category-list").append(`
      <div class = category-item>
        <button class="category-button">${this.name}</button>
        <div class = "spent-label">$${this.spent}</div>
        <div class = "budget-label">$${this.budget}</div>
      </div>`);
  }

  renderBarGraph() {
    $(".bar-graph").append(`
      <div class= "bar-label" id="label-${this.name}">
        <div class = "bar-name" id="name-${this.name}">
          ${this.name}: $${this.spent} / $${this.budget}
        </div>
      </div>
      <div class= "bar" id="bar-${this.name}">
        <div class="spent-bar" id="spent-bar-${this.name}">
        </div>
      </div>
      `);
    $(`#bar-${this.name}`).css("width", "300px");
    $(`#spent-bar-${this.name}`).css("width", percent(this.spent, this.budget));
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
  $(".total-budget").text(`Your remaining budget: $${totalSpent} out of $${totalBudget}`);
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
}

function removeCategory(index) {
  $(`.item:nth-child(${index + 1})`).remove();
  totalBudget = totalBudget - categories[index].budget;
  categories.splice(index, 1);
  updateAll();
}

function checkDuplicateName(name) {
  var duplicate = categories.filter(category => (category.name === name));
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
  $(".home-content").show();
  $(".setup-content").hide();
  $(".data-content").hide();
  $("#to-home").hide();
  $("#to-setup").show();
  $("#to-data").show();

  // ADD BUTTON
  var setupText = $(".setup-message");

  $(".make-category").click(function() {
    name = $("#category-name").val();
    budget = parseFloat($("#category-budget").val());
    if (checkDuplicateName(name) === false && budget !== NaN && budget > 0) {
      setupText.text("");
      categories.push(new Category(name, budget, index));
      updateAll();
      $("#category-name").val("");
      $("#category-budget").val("");
      $(".categories-list").append(categories[categories.length - 1].getCategory());
      $("#category-name").focus();
    } else {
      setupText.text("Check your input fields!");
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

  // SPEND BUTTON
  $(document).on("click", ".category-button", function() {
    $(".message-box").text("");
    index = $(".category-button").index(this);
    var spentInput = $("#spent").val();
    if (spentInput === "") {
      $(".message-box").text("Please enter a valid number.");
    } else if (!$.isNumeric(spentInput)) {
      $(".message-box").text("You Must Enter a Number");
    } else if (categories[index].spent + parseFloat(spentInput) > categories[index].budget) {
      $(".message-box").text("This is over your budget!");
    }  else {
      spent = parseFloat($("#spent").val());

      categories[index].spend(spent);
      updateAll();
    }
  });

  // HOME BUTTON
  $(document).on("click", "#to-home", function() {
    $(".home-content").show();
    $(".setup-content").hide();
    $(".data-content").hide();
    $("#to-home").hide();
    $("#to-setup").show();
    $("#to-data").show();
  });

  // SETUP BUTTON
  $(document).on("click", "#to-setup", function() {
    $(".home-content").hide();
    $(".setup-content").show();
    $(".data-content").hide();
    $("#to-home").show();
    $("#to-setup").hide();
    $("#to-data").show();
  });

  // DATA BUTTON
  $(document).on("click", "#to-data", function() {
    $(".home-content").hide();
    $(".setup-content").hide();
    $(".data-content").show();
    $("#to-home").show();
    $("#to-setup").show();
    $("#to-data").hide();
  });
});
