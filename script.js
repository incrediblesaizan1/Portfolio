setTimeout(() => {
  var typed = new Typed(".text", {
    strings: ["Frontend Developer"],
    typeSpeed: 80,
    backSpeed: 100,
    backDelay: 1000,
    // loop: true
  });
}, 2000);
const menu = document.querySelector('.bx-menu')
const body = document.querySelector('body')
menu.addEventListener('click',()=>{
  let nav = document.querySelector('nav')
  nav.classList.remove('navUlHide')
  menu.style.display = 'none'
})
const cross = document.querySelector('.bxs-x-square')
cross.addEventListener('click',()=>{
  let nav = document.querySelector('nav')
  nav.classList.add('navUlHide')
  menu.style.display = 'block'

})
const liElements = document.getElementsByClassName('liNav');
for (const li of liElements) {
    li.addEventListener('click', () => {
        let nav = document.querySelector('nav');
        nav.classList.add('navUlHide');
        menu.style.display = 'block';
    });
}

window.addEventListener('scroll', function() {
  if (window.scrollY >= 2000) {
    document.querySelectorAll('.container1').forEach(function(element) {
      element.classList.remove('container1D');
    });
  }
});


