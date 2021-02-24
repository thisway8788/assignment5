/************************************************************************************
* WEB322 – Assignment 1 (Winter 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Jeunghak Ham
* Student ID: 110214194
* Course: WEB322 NDD
*
************************************************************************************/

const menuBtn = document.querySelector('.menu-btn');

const navMenu = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', function(e){
    navMenu.classList.toggle('hidden');
});


const headerLogoBlock = document.querySelector('.header-logo-block');

headerLogoBlock.addEventListener('click', function(e){
    
    window.location.href = '/';
});