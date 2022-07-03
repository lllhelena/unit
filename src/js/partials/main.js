$(document).ready(function () {
   // $("input[name='phone']").mask(" +7 (999) 999-99-99");

   $('.js-sort-control').click(function(){
      $(this).toggleClass('catalog-filter__control--opened')
   });

   $('.js-sort-item').click(function(){
      var thisItem=$(this);
      var itemsParent=thisItem.closest('.catalog-filter__content');
      itemsParent.find()
   });

});

