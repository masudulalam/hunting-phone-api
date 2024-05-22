const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    // step 1: display the data there is the place 
    const phoneContainer  = document.getElementById('phone-container');
    // clear the phone container cards before adding new cards.
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones 
    const showAllButtonContainer = document.getElementById('show-all-btn-container');
    if (phones.length > 12 && !isShowAll) {
        showAllButtonContainer.classList.remove('hidden');
    }
    else {
        showAllButtonContainer.classList.add('hidden');
    }

    console.log('is Show All: ', isShowAll);

    // display first 12 phones if not show all
    if(!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        console.log(phone);
        // step 2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl pt-7`;
        // step 3: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Phone" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>   
        `;
        // step 4: append child
        phoneContainer.appendChild(phoneCard);
    })

    toggleLoadingSpinner(false);
}


// handle search
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner (true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText); 
    loadPhone(searchText, isShowAll);
}

// handle search2 recap
// const handleSearch2 = () => {
//     toggleLoadingSpinner (true);
//     const searchField2 = document.getElementById('search-field2');
//     const searchText2 = searchField2.value;
//     // console.log(searchText2); 
//     loadPhone(searchText2);   
// }


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}


// handle show all
const handleShowAll = () => {
    handleSearch(true);
}



// loadPhone();