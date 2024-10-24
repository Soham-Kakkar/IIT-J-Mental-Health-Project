document.querySelector('.hamburger').addEventListener('click', () => {
  
    const allElements = document.querySelectorAll('body *:not(.bg-circle)'); // Select all elements in the body
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
    navbar.style.backgroundColor = (navbar.style.backgroundColor == 'transparent' || navbar.style.backgroundColor == '') ? '#ffffff' : 'transparent';
    allElements.forEach((element) => {
        // Check if the element is inside the navbar or is the navbar itself
        if (!navbar.contains(element)) {
            element.style.filter = (element.style.filter == 'none' || element.style.filter == '') ? 'blur(10px)' : ''; // Apply blur to elements outside navbar
            element.style.pointerEvents = (element.style.pointerEvents === 'none') ? 'auto' : 'none';
        } else {
            element.style.filter = 'none';
			element.style.zIndex = 4; // Remove blur from navbar and its children
        }
    });
});