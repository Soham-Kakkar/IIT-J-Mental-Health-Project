import { resources } from './utils.js';
resources();

// Function to filter the conditions based on search input
const searchInput = document.getElementById('search-bar');

searchInput.addEventListener('keyup', () => {
    const searchValue = searchInput.value.toLowerCase();
    const conditions = document.querySelectorAll('.condition.widget');

    conditions.forEach(condition => {
        const conditionName = condition.dataset.condition.toLowerCase();
        if (conditionName.includes(searchValue)) {
            condition.style.display = 'flex'; // Or block, depending on your design
        } else {
            condition.style.display = 'none';
        }
    });
});


