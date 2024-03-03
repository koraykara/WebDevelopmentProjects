$(document).ready(function () {
   $('.accordion-item').each(function () {
   console.log($(this));
  //  var accordionItem = $(document).find(".tab-pane").find(".accordion").find(".accordion-item");
   var accordionItemId = $(this).attr("id");
   var navName = accordionItemId.split("-")[2];
   console.log(navName);
   var idx = accordionItemId[accordionItemId.length-1];
   
   console.log(idx);
   var fullName = "-" + navName + "-" + idx;
   
   var tableId = "example" + fullName;
 
   $.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
          if ( settings.nTable.id === "example" + fullName ) {
            var intVal = function (i) {
              return typeof i === 'string' ?
                i.replace(/[\$,]/g, '')*1 :
                typeof i === 'number' ?
                  i : 0;
            };
       
            var minAge = parseInt($('#minAge' + fullName).val(), 10);
            var maxAge = parseInt($('#maxAge' + fullName).val(), 10);
            var age = parseFloat(data[3]) || 0; // use data for the age column
            var ageFound = false;  // Is the age within the range
       
            if ((isNaN(minAge) && isNaN(maxAge)) ||
              (isNaN(minAge) && age <= maxAge) ||
              (minAge <= age && isNaN(maxAge)) ||
              (minAge <= age && age <= maxAge)) {
              ageFound = true;
            }
       
            // Show row if all are within range (all are true) otherwise hide row
            return ageFound;
          }
          else{
            return true;
          }
      }
   );

   let minDate, maxDate;
 
   // Custom filtering function which will search data in column four between two values
   DataTable.ext.search.push(function (settings, data, dataIndex) {
       let min = minDate.val();
       let max = maxDate.val();
       let date = new Date(data[4]);
    
       if (
           (min === null && max === null) ||
           (min === null && date <= max) || 
           (min <= date && max === null) ||
           (min <= date && date <= max)
       ) {
           return true;
       }
       return false;
   });
   // Create date inputs
   minDate = new DateTime('#min' + fullName, {
    format: 'MMMM Do YYYY'
   });
   maxDate = new DateTime('#max' + fullName, {
       format: 'MMMM Do YYYY'
   });
  
   var table = $("#" + tableId).DataTable();
  
   // Refilter the table
   document.querySelectorAll('#min' + fullName + ', #max' + fullName).forEach((el) => {
       el.addEventListener('change', () => table.draw());
   });

    // Add event listener for position checkboxes
    $('.position-checkbox').on('change', function () {
      updatePositionFilter();
      table.draw();
  });

  // Function to update the position filter
  function updatePositionFilter() {
      var selectedPositions = [];

      // Loop through checkboxes and add selected positions to the array
      $('.position-checkbox:checked').each(function () {
          var position = $(this).data('position');
          selectedPositions.push(position);
      });

      // Add or update the DataTable search based on selected positions
      $.fn.dataTable.ext.search.pop(); // Remove previous position filter

      $.fn.dataTable.ext.search.push(
          function (settings, data, dataIndex) {
              if (settings.nTable.id === tableId) {
                  var position = data[1]; // Assuming position is in the second column
                  return (selectedPositions.length === 0 || selectedPositions.includes(position));
              } else {
                  return true;
              }
          }
      );
  }

  // Trigger initial position filter update and table draw
  updatePositionFilter();
  table.draw();

 
   // Ion Range Slider
   var $inputFromAge = $(".inputFromAge"+ fullName),
       $inputToAge = $(".inputToAge"+ fullName);
 
   $(".rangeAge"+ fullName).ionRangeSlider({
     type: "double", min: 10, max: 70,
     skin: "big",
     grid: true,
     grid_num: 10,
     onStart: updateInputs,
     onChange: updateInputs,
     onFinish: updateInputs
   });
   $(".rangeAge"+ fullName).data("ionRangeSlider");
   
   $inputFromAge.on("input", function () {
     var val = $(this).prop("value");
     var slider = $(".rangeAge"+ fullName).data("ionRangeSlider");
     if (val < slider.options.min) { val = slider.options.min; }
     else if (val > slider.options.to) { val = slider.options.to; }
     slider.update({ from: val });
   });
 
   $inputToAge.on("input", function () {
     var val = $(this).prop("value");
     var slider = $(".rangeAge"+ fullName).data("ionRangeSlider");
     if (val < slider.options.from) { val = slider.options.from; }
     else if (val > slider.options.max) { val = slider.options.max; }
     slider.update({ to: val });
   });
 
 
 
 
 
   function updateInputs(data) {
     from = data.from;
     to = data.to;
     rangeInput = $(data.input);
     
     if(rangeInput.hasClass('rangeAge'+ fullName)){
       $inputFromAge.prop("value", from);
       $inputToAge.prop("value", to);
     }
     table.draw();
   }
 
   // Event listener to the two range filtering inputs to redraw on input
   $('#minAge' + fullName + ', #maxAge' + fullName).keyup( function() {
     table.draw();
   });
   

  });

  
});