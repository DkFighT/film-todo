import * as th from './themes.js';
import * as reqest from './request.js';
import * as dialog from './dialog.js';
import * as load from './load.js';

document.getElementById('lists').onclick = () => { th.rem(); }
// выбор темы
document.querySelectorAll('.e').forEach(element => {
    element.onclick = () => {
        th.openeditwindow();
        let themes = document.querySelectorAll('.num-theme');
        themes.forEach(element => {
            element.onclick = () => { th.change_theme(parseInt(element.id, 10)); }
        })
    }
});
// Меню

export let user_id = '1';

load.loadlists();

export function checkMenu() {
    let menus = document.querySelectorAll('.none-active-point');
    let names = document.querySelectorAll('#list-name');

    for (let i = 0; i < menus.length; i++) {

        menus[i].onclick = () => {
            if (menus[i].childNodes[3].checked) {
                menus.forEach(element => { element.classList.remove('active-point'); });
                menus[i].classList.add('active-point');
                names.forEach(name => {
                    name.textContent = menus[i].innerText;
                })

                load.loadpoints();

                let menu = document.getElementById('left-bar');
                menu.style.top = '100%';
            }
        }
    }
}

// кнопки добавления списка
let btnAddList = document.querySelector('#btn-add-list');
btnAddList.onclick = () => {
    dialog.dialogWindow('Имя списка', dialog.addNewList, dialog.cancel);
}

// кнопки добавления поинта
document.querySelectorAll('#AddPoint').forEach(element => {
    element.onclick = () => {
        dialog.dialogWindow('Название поинта', dialog.addNewPoint, dialog.cancel);
    }
})

let menu = document.getElementById('left-bar');
// Прказать нижний список
document.querySelector('.mobile-list-name').onclick = () => {
    menu.style.top = '0';
}
// Скрыть нижнее меню по свайпу

menu.addEventListener('touchstart', handleTouchStart, false);
menu.addEventListener('touchmove', handleTouchMove, false);

let x = null;
let y = null;

function handleTouchStart(event) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
}
function handleTouchMove(event) {
    if (!x || !y) {
        return false;
    }
    let new_x = event.touches[0].clientX;
    let new_y = event.touches[0].clientY;
    let xDiff = new_x - x;
    let yDiff = new_y - y;
    if (Math.abs(xDiff) < Math.abs(yDiff)) {
        if (yDiff >= 15) {
            menu.style.top = '100%';
        }
    }
    x = null;
    y = null;
}

window.onload = function () {
    // document.documentElement.style.height = window.outerHeight + 'px';
    document.documentElement.style.cssText = `--allscreen: ${window.innerHeight}px`;
    setTimeout(window.scrollTo(0, 1), 10);
    let loc = localStorage.getItem('Theme');
    th.change_theme(parseInt(loc, 10));
}

window.addEventListener('resize', () => {
    document.documentElement.style.cssText = `--allscreen: ${window.innerHeight}px`;
    setTimeout(window.scrollTo(0, 1), 10);
})

// мобильный фокус поиск
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

// desktop поиск
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

// mobile поиск
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