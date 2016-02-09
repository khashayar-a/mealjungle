
$(document).on('click', '.item-box' , function (event) {
    $('.restaurant-box').fadeTo(15,1);
});
$(document).on('click', '.restaurant-close' , function (event) {
    $('.restaurant-box').hide();

});

// Navigate between tabs
jQuery(document).ready(function() {
    jQuery('.tabs .tab-links div').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('link');

        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
});

// Accordion
$(document).ready(function() {

    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
        var currentClass = $(currentAttrValue).attr("class");
        if(currentClass.indexOf('open') > -1){
            $(currentAttrValue).slideUp(300).removeClass('open');
        } else {
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');

        }
        e.preventDefault();
    });
});
