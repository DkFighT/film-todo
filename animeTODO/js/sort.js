import * as loader from './load.js';
let flag = false;

export function reverseSort(){
    let point_values = [];
    let values = document.querySelectorAll("#point-name");
    values.forEach(val => {
        point_values.push(val.value);
    });
    if (!flag){
        document.getElementById("sort").textContent = 'Sort by time';
        let arr = point_values.sort();
        for (let i = 0; i < values.length; i++){
            values[i].value = arr[i];
        }
        point_values = [];
        flag = true;
    }
    else{
        document.getElementById("sort").textContent = 'Sort by A-Z';
        let cont = document.getElementById("lists");
        cont.innerHTML = '';
        loader.loadpoints();
        point_values = [];
        flag = false;
    }
}
