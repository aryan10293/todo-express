const edit = [...document.querySelectorAll('.edit')]
edit.forEach(x => {
    x.addEventListener('click', function(){
        console.log(this.parentNode.childNodes[1].innerText)
    })
})