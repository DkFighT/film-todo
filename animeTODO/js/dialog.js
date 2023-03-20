import {checkMenu} from './script.js';

// Создание окна
export function dialogWindow(text, btnfunc, exit) {
    let dialog = document.getElementById('dialog');
    dialog.style.display = 'flex';
    let dialogFrame = document.getElementById('dialog-frame');

    dialogFrame.insertAdjacentHTML('afterbegin', `<span class="text-message" id="text-message">${text}</span>
    <input type="text" id="info-field" value="">
    <div class="display-row-cent-spbetw btns">
        <div class="share text-center green-btn" id="ok">Ok</div>
        <div class="share text-center green-btn" id="cancel"}">Cancel</div>
    </div>`);
    document.getElementById('cancel').onclick = () => {exit();}
    document.getElementById('ok').onclick = () => {btnfunc();}
}
// назад
export function cancel() {
    let dialogFrame = document.getElementById('dialog-frame');
    let dialog = document.getElementById('dialog');
    dialogFrame.innerHTML = '';
    dialog.style.display = 'none';
}
// создать список
export function addNewList() {
    let menu_lists = document.getElementById('menu');
    let listName = document.getElementById('info-field').value;
    if (listName != '') {
        menu_lists.insertAdjacentHTML('beforeend', `<div class="display-row-cent-center none-active-point">
                                                        <span class="font-bold-16">${listName}</span>
                                                        <input type="radio" name="point" form="menu">
                                                    </div>`);
        checkMenu();
        // обращение к бд и запись нового списка в бд
        cancel();
    }
    else {
        cancel();
    }
}