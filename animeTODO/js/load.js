import * as reqest from './request.js';
import { checkMenu, user_id } from './script.js';

export function loadlists() {
    reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
        let menu_lists = document.getElementById('menu');
        menu_lists.innerHTML = '';
        for (let i = 0; i < resp['lists'].length; i++) {
            menu_lists.insertAdjacentHTML('beforeend', `<div class="display-row-cent-center none-active-point">
            <span class="font-bold-16">${resp['lists'][i]['name']}</span>
            <input type="radio" name="point" form="menu">
        </div>`)

            if (i == 0) {
                let first_list = document.querySelector('.none-active-point');
                first_list.classList.add('active-point');
                first_list.childNodes[3].checked = true;
            }
        }

        let names = document.querySelectorAll('#list-name');
        let menus = document.querySelectorAll('.none-active-point');

        names.forEach(name => {
            name.textContent = menus[0].innerText;
        });
        checkMenu();
        loadpoints();
    });

}

export function loadpoints() {
    let listName = document.getElementById('list-name').innerText;
    listName = listName.replace(/\n/g, '');
    let pointField = document.getElementById('lists');
    pointField.innerHTML = '';
    reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
        for (let i = 0; i < resp['lists'].length; i++) {
            if (resp['lists'][i]['name'] == listName) {
                for (let j = 0; j < resp['lists'][i]['data'].length; j++) {

                    pointField.insertAdjacentHTML('beforeend', `<div class="display-row-cent-spbetw point-row">
                <div class="white-btn row-name"><input type="text" name="point-name" value="${resp['lists'][i]['data'][j]['name']}" id="point-name" readonly></div>
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
            document.querySelectorAll("#score")[j].selectedIndex = 9 - parseInt(resp['lists'][i]['data'][j]['score'] - 1, 10);
            document.querySelectorAll("#status")[j].selectedIndex = parseInt(resp['lists'][i]['data'][j]['status'], 10);
                }
                break;
            }
        }
    });
}