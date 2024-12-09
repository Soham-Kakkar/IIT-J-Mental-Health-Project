document.querySelector('.floater').addEventListener('click', () => {
	document.querySelector('.emergency-numbers').classList.toggle('hidden');
	document.querySelector('.emnum').classList.toggle('hidden');
});
import { initSlider, vidplayer } from './utils.js' ;
initSlider();
vidplayer('SmRhPEWA5PU');

document.querySelector('.floater').addEventListener('click', () => {
    const allElements = document.querySelectorAll('body *:not(.bg-circle)');
    const floater = document.querySelector('.floater');
    allElements.forEach((element) => {
        if (!floater.contains(element)) {
            element.style.filter = (element.style.filter == 'none' || element.style.filter == '') ? 'blur(2px)' : ''; // Apply blur to elements outside show-helpline
            element.style.pointerEvents = (element.style.pointerEvents === 'none') ? 'auto' : 'none';
        }
        else {
            element.style.filter = 'none';
			element.style.zIndex = 3;
        }
    });
});