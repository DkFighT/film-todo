// выбор темы
export function change_theme(num) {
    let theme = document.getElementById('html');
    switch (num) {
        case 1:
            theme.setAttribute('class', '');
            theme.classList.add('theme-1');
            break;
        case 2:
            theme.setAttribute('class', '');
            theme.classList.add('theme-2');
            break;
        case 3:
            theme.setAttribute('class', '');
            theme.classList.add('theme-3');
            break;
        case 4:
            theme.setAttribute('class', '');
            theme.classList.add('theme-4');
            break;
        case 5:
            theme.setAttribute('class', '');
            theme.classList.add('theme-5');
            break;
        case 6:
            theme.setAttribute('class', '');
            theme.classList.add('theme-6');
            break;
        case 7:
            theme.setAttribute('class', '');
            theme.classList.add('theme-7');
            break;
        case 8:
            theme.setAttribute('class', '');
            theme.classList.add('theme-8');
            break;
        case 9:
            theme.setAttribute('class', '');
            theme.classList.add('theme-9');
            break;
    }
}
// откртиые настроек списка
export function openeditwindow() {
    document.getElementById('edit-menu').style.display = 'flex';
}
// скрытие настроек списка
export function rem() {
    if (document.getElementById('edit-menu').style.display != 'none') {
        document.getElementById('edit-menu').style.display = 'none';
    }
}