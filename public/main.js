const edit = [...document.querySelectorAll('.edit')]
edit.forEach(x => {
    x.addEventListener('click', function(){
        let id = this.parentNode.childNodes[1].innerText.split(' ')[0]
        let input = document.getElementById(id)
        console.log(input.classList.toggle('hidden'))
        console.log(this.parentNode.childNodes[9].classList.toggle('hidden'))
    })
})