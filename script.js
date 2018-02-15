var categories = [];
var totalBudget = 0;
var spentBudget = 0;

class Category {
  constructor(name, amount, index) {
    this.name = name;
    this.amount = amount;
    this.index = index;
    this.spent = 0;
  }

  getAmount(spent) {
    this.spent = this.spent + spent;
    spentBudget = spentBudget + spent;
    updateTotalBudget();
    $(".total-spent").text(`$${this.spent} / $${this.amount}`);
  }

  getCategory() {
    var string =
      `<div class="item">
            <button class="remove-button">-</button>
            <span class="category-name">${this.name}</span>
            <span class="category-amount">$${this.amount}</span>
          </div>`;

    return string;
  }

  createButton() {
    $(".home-category-list").append(`
      <div>
        <button class="category-button">${this.name}</button>

      </div>`);
  }

  renderBarGraph() {
    $(".bar-graph").append(`
      <div class= "bar" id="bar-${this.name}">
        <div class = "percent" id="percent-${this.name}">
          ${this.spent} / ${this.amount}
        </div>
        <div class="spent-bar" id="spent-bar-${this.name}">
        </div>
      </div>
      `);
    $(`#bar-${this.name}`).css("height", "500px");
    $(`#spent-bar-${this.name}`).css("height", percent(this.spent, this.amount));
  }
}

// <span class = "total-spent">$${this.amount} / ${this.amount}</span>

var name;
var amount;
var index = 0;
var spent;

function updateTotalBudget() {
  $(".total-budget").text(`Your budget remaining is $${spentBudget} out of $${totalBudget}`);
}

function displayCategory() {
  categories.map(category => category.createButton());
}

function percent(spent, total) {
  var percent = (100 * spent / total);
  return percent.toString() + "%";
}

function updateBudgetBar() {
  $(".budget-text").text = spentBudget + " / " + totalBudget;
  $(".remaining-budget-bar").css("width", percent(spentBudget, totalBudget));
  // $(".remaining-budget-bar").css("background-color", setBarColor());
}

function removeCategory(index) {
  $(`.item:nth-child(${index + 1})`).remove();
  totalBudget = totalBudget - categories[index].amount;
  updateTotalBudget();
  categories.splice(index, 1);
}

//GRAPH
function updateGraph() {
  categories.map(category => category.renderBarGraph());
}

$(document).ready(function() {
  updateTotalBudget();

  // ADD BUTTON
  $(".make-category").click(function() {
    // if ($("#category-name").val() === category.name)  {
    //
    // } else {

    name = $("#category-name").val();
    amount = parseFloat($("#category-amount").val());
    totalBudget = totalBudget + amount;
    updateTotalBudget();
    categories.push(new Category(name, amount, index));
    $("#category-name").val("");
    $("#category-amount").val("");
    $(".categories-list").append(categories[categories.length - 1].getCategory());
    $("#category-name").focus(); // Cursor auto-moves to 'name' input.
// }

  });

  // 'ENTER' KEY CLICKS THE 'ADD' BUTTON.
  $("#category-amount").keyup(function(e) {
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
    } else if (parseFloat(spentInput) + spentBudget > totalBudget) {
      $(".message-box").text("This is over your budget!");
    } else {
      spent = parseFloat($("#spent").val());
      index = $(".category-button").index(this);
      categories[index].getAmount(spent);
      updateBudgetBar();

    }
  });

  // HOME BUTTON
  $(document).on("click", "#to-home", function() {
    displayCategory();
    updateTotalBudget();
  });

  // DATA BUTTON
  $(document).on("click", "#to-data", function() {
    $(".bar-graph").empty();
    updateGraph();
  });
});
