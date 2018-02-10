var budget = 0;

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
    if ($(".category-name").val() !== ("") && ($(".category-amount").val() !== NaN)) {
      name = $(".category-name").val();
      amount = parseFloat($(".category-amount").val());
      categories.push(new Category(name, amount));
      var string = `<div class="item">${ 'Budgeted Item: ' + name + '<br> Target Budget: $' + amount}</div>`;
      $(".category-name").val("");
      $(".category-amount").val("");
      $(".categories").append(string);
    }
  });

      $(".set-budget").click(() => {
        budget = parseFloat($(".budget-amount").val());
      });
    });

function removeCategory() {
  categories.splice($(".category").index(), 1);
  $(`.item:nth-child(${$(".category").index()})`).remove();
}

function addCategory() {

}












// categories[i].render();
