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



const categories = [];
var totalBudget = 0;

class Category {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
    this.categoryNumber = null;
  }

  setCategoryNumber(categoryNumber) {
    this.categoryNumber = categoryNumber
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
var index;

function updateTotalBudget() {
  $(".totalBudget").text(`Your total budget is $${totalBudget}`);
}

function removeCategory() {
  console.log("Hey");
  console.log(categories);
  var index = $("button").index() + 1;
  console.log(index);
  $(`.item:nth-child(${index})`).remove();
  categories.splice($(".category").index(), 1);
}

$(document).ready(function() {
  $(".make-category").click(() => {
    name = $("#category-name").val();
    amount = parseFloat($("#category-amount").val());
    totalBudget = totalBudget + amount;
    updateTotalBudget();
    categories.push(new Category(name, amount));
    categories[categories.length - 1].setCategoryNumber(categories.length);
    console.log(categories);
    $("#category-name").val("");
    $("#category-amount").val("");
    $(".categories-list").append(categories[categories.length - 1].getCategory());


    $(".remove-button").click(() => {
      //   index = $(".remove-button").index();
      //   console.log($(`.item:nth-child`);
      //   $(`.item:nth-child(${$(".category").index()})`).remove();
      removeCategory();
    });
  });
});









// categories[i].render();
