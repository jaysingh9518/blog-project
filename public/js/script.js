// document.addEventListener('DOMContentLoaded', function() {

//     const allButtons = document.querySelectorAll('.searchBtn');
//     const searchBar = document.querySelector('.searchBar');
//     const searchInput = document.getElementById('searchInput');
//     const searchClose = document.getElementById('searchClose');
//     const searchOverlay = document.querySelector('.searchOverlay');

//     for (var i = 0; i < allButtons.length; i++) {
//         allButtons[i].addEventListener('click', function() {
//                 // searchBar.style.visibility = 'visible';
//                 searchBar.classList.add('open');
//                 searchOverlay.classList.add('.open');
//                 this.setAttribute('aria-expanded', 'true');
//                 searchInput.focus();
//         });

//     }

//     searchClose.addEventListener('click', function() {
//         searchBar.style.visibility = 'hidden';
//         searchBar.classList.remove('open');
//         this.setAttribute('aria-expanded', 'false');
//     });

// });


// Event listener for the search button
document.querySelector('.searchBtn').addEventListener('click', function() {
    // Open the search bar and overlay
    document.querySelector('.searchBar').classList.add('open');
    document.querySelector('.searchOverlay').classList.add('open');
    
    // Focus on the search input field
    document.getElementById('searchInput').focus();
});

// Event listener for the close button
document.querySelector('#searchClose').addEventListener('click', function() {
    // Close the search bar and overlay
    document.querySelector('.searchBar').classList.remove('open');
    document.querySelector('.searchOverlay').classList.remove('open');
});

// Event listener for clicking on the overlay
document.querySelector('.searchOverlay').addEventListener('click', function() {
    // Close the search bar and overlay
    document.querySelector('.searchBar').classList.remove('open');
    document.querySelector('.searchOverlay').classList.remove('open');
});
