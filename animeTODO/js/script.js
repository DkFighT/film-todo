import * as th from './themes.js';
import * as reqest from './request.js';
import * as dialog from './dialog.js';
import * as load from './load.js';
import * as search from './search.js';
import * as sort from './sort.js';
import * as edit from './edit.js';

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

export let user_id = parseInt(localStorage.getItem('ID'), 10);

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
        if (document.querySelectorAll('.none-active-point').length == 0) {
            dialog.dialogWindow('Сначала создайте список', dialog.addNewList, dialog.cancel);
        }
        else {
            dialog.dialogWindow('Название поинта', dialog.addNewPoint, dialog.cancel);
        }
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
    // Смена темы при загрузке
    let loc = localStorage.getItem('Theme');
    th.change_theme(parseInt(loc, 10));
    // подгрузка фона
    let bg = document.getElementById('main-field');
    bg.style.background = `url(${localStorage.getItem('bg')})`;
    bg.style.backgroundPosition = 'center';
    bg.style.backgroundSize = 'cover';

    if (localStorage.getItem('ID') == null) {
        window.location.replace('../html/loginpage.html');
    }
}

window.addEventListener('resize', () => {
    document.documentElement.style.cssText = `--allscreen: ${window.innerHeight}px`;
    setTimeout(window.scrollTo(0, 1), 10);
})

search.mobileAnim();
search.deskSearch();
search.mobileSearch();
// Сортировка
document.getElementById('sort').onclick = () => {
    sort.reverseSort();
}
// переименовать лист
document.getElementById('rename').onclick = () => {
    dialog.dialogWindow('Измените название листа', dialog.editListName, dialog.cancel);
}
// удалить лист
document.getElementById('del').onclick = () => {
    dialog.deleteList();
}
// изменить статус
export function findComment() {
    document.querySelectorAll('.row-comment').forEach(element => {
        element.addEventListener('click', () => {
            edit.openComment(element);
        })
    })
}
document.getElementById('save-comm').onclick = () => {
    edit.closeComment();
}

// изменить оценку
export function findScores() {
    document.querySelectorAll('#score').forEach(element => {
        element.addEventListener('change', () => {
            edit.editScore(element);
        })
    });
}
// Изменить статус
export function findStatus() {
    document.querySelectorAll('#status').forEach(element => {
        element.addEventListener('change', () => {
            edit.editStatus(element);
        })
    });
}

document.querySelector('.close').onclick = function () {
    document.querySelector('.profile').style.display = 'none';
}
document.querySelector('.name-ava-left').onclick = function () {
    document.querySelector('.profile').style.display = 'flex';
}
document.querySelector('.user').onclick = function () {
    document.querySelector('.profile').style.display = 'flex';
}
document.querySelector('.out').onclick = function () {
    localStorage.removeItem('ID');
    window.location.reload();
}