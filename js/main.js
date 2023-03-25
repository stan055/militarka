/*  ---------------------------------------------------
    Template Name: Ogani
    Description:  Ogani eCommerce  HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

$(document).ready((function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(0).fadeOut("fast");

        /*------------------
            Gallery filter
        --------------------*/

    });

    /*------------------
        Background Set
    --------------------*/
    // Set background img
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*-----------------------
        Categories Slider
    ------------------------*/


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*--------------------------
        Latest Product Slider
    ----------------------------*/

    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
    $(".product__discount__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 2,
            },

            992: {
                items: 3,
            }
        }
    });

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    // $(".product__details__pic__slider").owlCarousel({
    //     loop: true,
    //     margin: 20,
    //     items: 4,
    //     dots: true,
    //     smartSpeed: 1200,
    //     autoHeight: false,
    //     autoplay: true
    // });

    /*-----------------------
		Price Range Slider
	------------------------ */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*--------------------------
        Select
    ----------------------------*/
    // $("select").niceSelect();

    /*------------------
		Single Product
	--------------------*/
    // $('.product__details__pic__slider img').on('click', function () {

    //     var imgurl = $(this).data('imgbigurl');
    //     var bigImg = $('.product__details__pic__item--large').attr('src');
    //     if (imgurl != bigImg) {
    //         $('.product__details__pic__item--large').attr({
    //             src: imgurl
    //         });
    //     }
    // });

    /*-------------------
		Quantity change
	--------------------- */


})(jQuery));

// Get URL Paremmeters
function getURLparameter(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const result = urlParams.get(param)
    return result;
}

// Get gatabase
async function getDatabase(address='./database.json') {
    let result = await fetch(address);
    let data = await result.json();
    return data;
}

// Product details page image gallery slider start
function productDetailsStartImgSlider() {
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });
}

// Product page pic image slider
function productDetailsPicSliderImg() {
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });
}

// Render header info
function renderHeader(info) {
    const headerTopLeft = document.querySelector(".header__top__left > ul");
    const humbergerMenuContact = document.querySelector(".humberger__menu__contact > ul");
    const heroSearchPhoneText = document.querySelector(".hero__search__phone__text");
    const headerLogo = document.querySelector('.header__logo');

    try {
        headerTopLeft.innerHTML = `<li><i class="fa fa-envelope"></i> ${info.email}</li><li>${info.free_shipping}</li>`;
        humbergerMenuContact.innerHTML = `<li><i class="fa fa-envelope"></i> ${info.email}</li><li>${info.free_shipping}</li>`;
        heroSearchPhoneText.innerHTML = `<h5>${info.tel}</h5><span>працюємо 7/7 днів</span>`;
        headerLogo.innerHTML = `<a href="./index.html"><span>${info.header_logo}</span></a>`;
    } catch (error) {
        console.log(error);
    }
}

// Render hero menu categories 
function renderHeroMenu(categories) {
    const heroCategories = document.querySelector(".hero__categories > ul");

    try {
        Object.entries(categories).forEach((category) => {
            heroCategories.innerHTML += `
                <li><a href="./shop-grid.html?category=${category[0]}">${category[1]}</a></li>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}

