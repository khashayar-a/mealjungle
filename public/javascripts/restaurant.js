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