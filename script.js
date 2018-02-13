var categories = [];
var totalBudget = 0;
var spentBudget = 0;

class Category {
  constructor(name, amount, index) {
    this.name = name;
    this.amount = amount;
    this.index = index;
  }

  getAmount(spent) {
    this.amount = this.amount + spent;
    spentBudget = spentBudget + spent;
    updateTotalBudget();
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
    console.log("inside");
    $(".home-category-list").append(`<div><button class="category-button">${this.name}</button></div>`);
  }
}

var name;
var amount;
var index = 0;
var spent;

function updateTotalBudget() {
  $(".totalBudget").text(`Your budget remaining is $${spentBudget} out of $${totalBudget}`);
}

function displayCategory() {
  categories.map(category => category.createButton());
}


function removeCategory(index) {
  $(`.item:nth-child(${index + 1})`).remove();
  totalBudget = totalBudget - categories[index].amount;
  updateTotalBudget();
  categories.splice(index, 1);
}

$(document).ready(function() {
  updateTotalBudget();

  // ADD BUTTON
  $(".make-category").click(function() {
    name = $("#category-name").val();
    amount = parseFloat($("#category-amount").val());
    totalBudget = totalBudget + amount;
    updateTotalBudget();
    categories.push(new Category(name, amount, index));
    $("#category-name").val("");
    $("#category-amount").val("");
    $(".categories-list").append(categories[categories.length - 1].getCategory());
    $("#category-name").focus(); // Cursor auto-moves to 'name' input.
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
    spent = parseFloat($("#spent").val());
    index = $(".category-button").index(this);
    categories[index].getAmount(spent);
  });

  // HOME BUTTON
  $(document).on("click", "#to-home", function() {
    displayCategory();
    updateTotalBudget();
  });
});



// percentHealth() {
//   return (100 * spentBudget / totalBudget);
// }
//
// percentHealthStr() { // Needed for health-bar width
//   return this.percentHealth().toString() + "%";
// }

// function checkHealth() {
//   document.getElementById("player-health-text").innerText = player.health.toString() + " / " + player.maxHealth.toString();
//   document.getElementsByClassName("remaining-health-bar")[1].style.width = player.percentHealthStr();
//   document.getElementsByClassName("remaining-health-bar")[1].style.background = player.setHealthColor();
// }
