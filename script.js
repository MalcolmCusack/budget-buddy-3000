var budget;

class Category {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }

  updateBudget() {

  }

  updateGraph() {

  }
}



const categories = [];
var name;
var amount;

$(document).ready(function() {
  $(".make-category").click(() => {
    name = $(".category-name").val();
    amount = $(".category-amount").val();
    categories.push(new Category(name, amount));
    console.log(categories);
  });
});
categories.push(new Category("oou", 4));

// categories[i].render();
