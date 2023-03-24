import { checkMenu, findScores, findStatus, user_id } from './script.js';
import * as reqest from './request.js';
// import { json } from 'stream/consumers';

// Создание окна
export function dialogWindow(text, btnfunc, exit) {
    let dialog = document.getElementById('dialog');
    dialog.style.display = 'flex';
    let dialogFrame = document.getElementById('dialog-frame');

    dialogFrame.insertAdjacentHTML('afterbegin', `<span class="text-message" id="text-message">${text}</span>
    <input type="text" id="info-field" value="" autofocus>
    <div class="display-row-cent-spbetw btns">
        <div class="share text-center green-btn" id="ok">Ok</div>
        <div class="share text-center green-btn" id="cancel"}">Cancel</div>
    </div>`);
    document.getElementById('cancel').onclick = () => { exit(); }
    document.getElementById('ok').onclick = () => { btnfunc(); }
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

        let body = {
            lists: [{
                name: listName,
                data: []
            }]
        }
        reqest.sendRequest(reqest.bd_url + `/${user_id}`, 'PUT', body)

        reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
            let ncards = resp['lists'];

            let body = {
                lists: [{
                    name: listName,
                    data: []
                }]
            }

            let some = {
                lists: body['lists'].concat(ncards)
            }
            reqest.sendRequest(reqest.bd_url + `/${user_id}`, 'PUT', some);
        })
        cancel();
    }
    else {
        cancel();
    }
}
// создать поинт
export function addNewPoint() {
    let point_lists = document.getElementById('lists');
    let PointName = document.getElementById('info-field').value;
    let listName = document.getElementById('list-name').innerText;

    listName = listName.replace(/\n/g, '');

    if (PointName != '') {
        point_lists.insertAdjacentHTML('beforeend', `<div class="display-row-cent-spbetw point-row">
                                                        <div class="white-btn row-name"><input type="text" name="point-name" value="${PointName}" id="point-name" readonly></div>
                                                        <div class="white-btn row-comment"></div>
                                                        <div class="white-btn row-score"><select name="score" id="score" class="score">
                                                                <option value="10">10</option>
                                                                <option value="9">9</option>
                                                                <option value="8">8</option>
                                                                <option value="7">7</option>
                                                                <option value="6">6</option>
                                                                <option value="5">5</option>
                                                                <option value="4">4</option>
                                                                <option value="3">3</option>
                                                                <option value="2">2</option>
                                                                <option value="1">1</option>
                                                            </select></div>
                                                        <div class="white-btn row-status">
                                                            <select name="status" id="status" class="score">
                                                                <option value="буду">В планах</option>
                                                                <option value="смотрю">Смотрю</option>
                                                                <option value="оконченно">Закончил</option>
                                                                <option value="хз">Хз</option>
                                                                <option value="удалить">Удалить</option>
                                                            </select>
                                                        </div>
                                                    </div>`);
        checkMenu();
        findScores();
        findStatus();
        // обращение к бд и запись нового поинта в бд  (я рот ее ебал)
        reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
            let all_data;
            let all_lists = resp['lists'];
            for (let i = 0; i < all_lists.length; i++) {
                if (resp['lists'][i]['name'] == listName) {
                    all_data = resp['lists'][i]['data'];
                    break;
                }
            }

            let body = {
                data: [{
                    name: PointName,
                    score: 10,
                    comment: '',
                    status: '0'
                }]
            }

            let some = {
                data: body['data'].concat(all_data)
            }

            let list = [{
                name: listName,
                data: some['data']
            }]

            for (let i = 0; i < all_lists.length; i++) {
                if (all_lists[i]['name'] == listName) {
                    all_lists.splice(i, 1);
                    break;
                }
            }

            let new_list_array = {
                lists: all_lists.concat(list)

            }
            reqest.sendRequest(reqest.bd_url + `/${user_id}`, 'PUT', new_list_array);
        })

        cancel();
    }
    else {
        cancel();
    }
}

export function setBgImage() {
    let imageUrl = document.getElementById('info-field').value;
    if (imageUrl != '') {
        localStorage.setItem('bg', JSON.stringify(imageUrl));
        // подгрузка фона
        let bg = document.getElementById('main-field');
        bg.style.background = `url(${localStorage.getItem('bg')})`;
        bg.style.backgroundPosition = 'center';
        bg.style.backgroundSize = 'cover';
        cancel();
    }
    else {
        cancel();
    }
}

export function editListName() {
    let listName = document.getElementById('list-name').innerText;
    listName = listName.replace(/\n/g, '');
    let newListName = document.getElementById('info-field').value;
    let all_lists;
    if (listName != '') {
        reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
            let data;
            all_lists = resp['lists'];
            for (let i = 0; i < resp['lists'].length; i++) {
                if (resp['lists'][i]['name'] == listName) {
                    data = resp['lists'][i]['data'];
                    all_lists[i]['name'] = newListName;
                    break;
                }
            }

            let new_list_name = {
                lists: all_lists
            }
            reqest.sendRequest(reqest.bd_url + `/${user_id}`, 'PUT', new_list_name);

            let names = document.querySelectorAll('#list-name');
            let menus = document.querySelectorAll('.none-active-point');
            names.forEach(name => {
                name.textContent = newListName;
            })
            menus.forEach(menu => {
                if (menu.innerText == listName) {
                    menu.childNodes[1].innerText = newListName;
                }
            });
        });
        cancel();
    }
    else {
        cancel();
    }
}

export function deleteList() {
    reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
        let listName = document.getElementById('list-name').innerText;
        listName = listName.replace(/\n/g, '');
        let new_lists = resp['lists'];
        for (let i = 0; i < resp['lists'].length; i++) {
            if (resp['lists'][i]['name'] == listName) {
                new_lists.splice(i, 1);
                break;
            }
        }

        let new_list_array = {
            lists: new_lists
        }
        reqest.sendRequest(reqest.bd_url + `/${user_id}`, 'PUT', new_list_array);
        
        setTimeout(()=> {window.location.reload();}, 1000);
    })
}