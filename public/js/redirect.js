
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('select[data-select-name]').onchange = changeEventHandler;
}, false);

function changeEventHandler(event) {
    window.location.href = this.options[this.selectedIndex].value;
}