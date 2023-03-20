import * as th from './themes.js';
import * as reqest from './request.js';
import * as dialog from './dialog.js';

let bd_url = 'https://64022bef302b5d671c34bef5.mockapi.io/api/v1/film';

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
export function checkMenu() {
    let menus = document.querySelectorAll('.none-active-point');
    for (let i = 0; i < menus.length; i++) {
        menus[i].onclick = () => {
            if (menus[i].childNodes[3].checked) {
                menus.forEach(element => { element.classList.remove('active-point'); });
                menus[i].classList.add('active-point');
                let menu = document.getElementById('left-bar');
                menu.style.top = '100%';
            }
        }
    }
}
checkMenu();

// кнопки добавления списка
let btnAddList = document.querySelectorAll('.btn-add-list');
btnAddList.forEach(element => {
    element.onclick = () => {
        dialog.dialogWindow('Имя списка', dialog.addNewList, dialog.cancel);
    }
});

let menu = document.getElementById('left-bar');
// Прказать нижний список
document.getElementById('mobile-name-list').onclick = () => {
    menu.style.top = '0';
}
// Скрыть нижнее меню по свайпу

menu.addEventListener('touchstart', handleTouchStart, false);
menu.addEventListener('touchmove', handleTouchMove, false);

let x = null;
let y = null;

function handleTouchStart(event){
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
}
function handleTouchMove(event){
    if (!x || !y){
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

// Изменение высоты
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--allscreen', `${vh}px`);
  });
