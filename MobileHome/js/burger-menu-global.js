// Burger menu's items onclick event for not listing pages (without filters):

/*Start of HOME PAGE events on "Search" and "Advanced Search" menu items */
$(".home .item-search").on("click", function () {    
    var awayFromHome = "1";
    localStorage.setItem("awayFromHome", awayFromHome); 
    setTimeout(function () {  
        if($(".header-row").hasClass("rtl-version")) {
            window.location.href = "listing-rtl.html"; 
        } else {   
            window.location.href = "listing3.html"; 
        } 
    }, 500);    
});
$(".home .item-advanced-search").on("click", function () {
    var awayFromHome = "2";
    localStorage.setItem("awayFromHome", awayFromHome); 
    setTimeout(function () {  
        if($(".header-row").hasClass("rtl-version")) {
            window.location.href = "listing-rtl.html"; 
        } else {   
            window.location.href = "listing3.html"; 
        } 
    }, 500);  
});
/*End of HOME PAGE events on "Search" and "Advanced Search" menu items */

