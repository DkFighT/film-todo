import * as reqest from './request.js';
import { user_id } from './script.js';

export function editScore(th) {
    let pointName = th.parentNode.parentNode.childNodes[1].firstChild.value;
    let newScore = th.value;
    let listName = document.getElementById('list-name').innerText;
    listName = listName.replace(/\n/g, '');

    reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
        for (let i = 0; resp['lists'].length; i++) {
            if (resp['lists'][i]['name'] == listName) {
                let data = resp['lists'][i]['data'];
                for (let j = 0; j < data.length; j++) {
                    if (data[j]['name'] == pointName) {
                        let new_point = [{
                            name: pointName,
                            score: newScore,
                            comment: data[j]['comment'],
                            status: data[j]['status']
                        }];
                        data.splice(j, 1);
                        resp['lists'][i]['data'] = data.concat(new_point);
                        reqest.sendRequest(reqest.bd_url + `/${user_id}`, "PUT", { lists: resp['lists'] });
                        break;
                    }
                }
                break;
            }
        }
    });
}

export function editStatus(th) {
    let pointName = th.parentNode.parentNode.childNodes[1].firstChild.value;
    let newStatus = th.selectedIndex;
    let listName = document.getElementById('list-name').innerText;
    listName = listName.replace(/\n/g, '');
    reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
        for (let i = 0; resp['lists'].length; i++) {
            if (resp['lists'][i]['name'] == listName) {
                let data = resp['lists'][i]['data'];
                for (let j = 0; j < data.length; j++) {
                    if (data[j]['name'] == pointName) {
                        let new_point = [{
                            name: pointName,
                            score: data[j]['score'],
                            comment: data[j]['comment'],
                            status: newStatus
                        }];
                        data.splice(j, 1);
                        if (newStatus == 4) {
                            resp['lists'][i]['data'] = data;
                            reqest.sendRequest(reqest.bd_url + `/${user_id}`, "PUT", { lists: resp['lists'] });
                            th.parentNode.parentNode.remove();
                        }
                        else {
                            resp['lists'][i]['data'] = data.concat(new_point);
                            reqest.sendRequest(reqest.bd_url + `/${user_id}`, "PUT", { lists: resp['lists'] });
                        }
                        break;
                    }
                }
                break;
            }
        }
    });
}

export function openComment(th){
    let commentField = document.getElementById('comment-field');
    commentField.style.display = 'flex';
    reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
        let comm = document.getElementById('comment-field-comment');
        let name = document.getElementById('point-name-point');
        let listName = document.getElementById('list-name').innerText;
        listName = listName.replace(/\n/g, '');
        name.value = th.parentNode.firstChild.value;
        for (let i = 0; i < resp['lists'].length; i++){
            if (resp['lists'][i]['name'] == listName){
                for (let j = 0; j < resp['lists'][i]['data'].length; j++){
                    if (resp['lists'][i]['data'][j]['name'] == name.value){
                        comm.value = resp['lists'][i]['data'][j]['comment'];
                        break;
                    }
                }
                break;
            }
        }
    });
}

export function closeComment() {
    let commentField = document.getElementById('comment-field');
    commentField.style.display = 'none';

    reqest.getRequest(reqest.bd_url + `/${user_id}`).then(resp => {
        let comm = document.getElementById('comment-field-comment');
        let name = document.getElementById('point-name-point');
        let listName = document.getElementById('list-name').innerText;
        listName = listName.replace(/\n/g, '');
        for (let i = 0; i < resp['lists'].length; i++){
            if (resp['lists'][i]['name'] == listName){
                for (let j = 0; j < resp['lists'][i]['data'].length; j++){
                    if (resp['lists'][i]['data'][j]['name'] == name.value){
                        resp['lists'][i]['data'][j]['comment'] = comm.value;
                        reqest.sendRequest(reqest.bd_url + `/${user_id}`, 'PUT', resp);
                        break;
                    }
                }
                break;
            }
        }
    });
}