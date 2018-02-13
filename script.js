var budget = 0;


//
//
// const homePage = $("home-page");
// homePage.empty();
// homePage.append(home.render());
//
// const dataPage = $("data-page");
// dataPage.empty();
// dataPage.append(data.render());



var categories = [];
var totalBudget = 0;

class Category {
  constructor(name, amount, index) {
    this.name = name;
    this.amount = amount;
    this.index = index;
  }

  getCategory() {
    var string =
      `<div class="item">
            <button class="remove-button">Remove</button>
            <span class="category-name">${this.name}</span>
            <span class="category-amount">$${this.amount}</span>
          </div>`;

    return string;
  }


  // render() {
  //   categoryString =
  //     `<div class="item">
  //         <button class="remove-button">REMOVE</button>
  //         <div class="category-name">
  //           ${this.name}
  //         </div>
  //         <div class="category-amount">
  //           ${this.amount}
  //         </div>
  //       </div>`;
  //   ($(".categories-list").append(categoryString));
  // }
}






var name;
var amount;
var index = 0;

function updateTotalBudget() {
  $(".totalBudget").text(`Your total budget is $${totalBudget}`);
}

function removeCategory(index) {
  $(`.item:nth-child(${index + 1})`).remove();
  totalBudget = totalBudget - categories[index].amount;
  updateTotalBudget();
  categories.splice(index, 1);
}

$(document).ready(function() {
  updateTotalBudget();
  $(".make-category").click(function() {
    name = $("#category-name").val();
    amount = parseFloat($("#category-amount").val());
    totalBudget = totalBudget + amount;
    updateTotalBudget();
    categories.push(new Category(name, amount, index));
    $("#category-name").val("");
    $("#category-amount").val("");
    $(".categories-list").append(categories[categories.length - 1].getCategory());
  });

  $(document).on("click", ".remove-button", function() {
    index = $(".remove-button").index(this);
    removeCategory(index);
  });
});
