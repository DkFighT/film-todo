// мобильный фокус поиск
export function mobileAnim() {
    let mobile_search = document.querySelector('.search-bottom');

    mobile_search.onclick = () => {
        let mobile_input = document.getElementById('mobile-search-form');
        mobile_search.classList.add('active-search');
        mobile_input.style.width = '35vmin';
        setTimeout(() => { mobile_input.focus(); }, 500);

        mobile_input.addEventListener('focusout', () => {
            mobile_input.style.width = '0';
            mobile_input.removeAttribute('autofocus');
            mobile_search.classList.remove('active-search');
        })
    }
}

// desktop поиск
export function deskSearch() {
    let search = document.getElementById("search-field");
    search.oninput = function () {
        let lists = document.querySelectorAll("#point-name");
        let search_val = document.getElementById("search-field");
        if (search_val.value != '') {
            lists.forEach(list => {
                if (list.value.toLowerCase().search(search_val.value.toLowerCase()) != -1) {
                    list.parentElement.parentElement.style.display = "flex";
                }
                else {
                    list.parentElement.parentElement.style.display = "none";
                }
            });
        }
        else {
            lists.forEach(list => {
                list.parentElement.parentElement.style.display = "flex";
            })
        }
    }
}
// mobile поиск
export function mobileSearch() {
    let search_mobile = document.getElementById("mobile-search-form");
    search_mobile.oninput = function () {
        let lists_mobile = document.querySelectorAll("#point-name");
        let search_val = document.getElementById("mobile-search-form");

        if (search_val.value != '') {
            lists_mobile.forEach(list => {
                if (list.value.toLowerCase().search(search_val.value.toLowerCase()) != -1) {
                    list.parentElement.parentElement.style.display = "flex";
                }
                else {
                    list.parentElement.parentElement.style.display = "none";
                }
            });
        }
        else {
            lists_mobile.forEach(list => {
                list.parentElement.parentElement.style.display = "flex";
            })
        }
    }
}