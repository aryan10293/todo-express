const edit = [...document.querySelectorAll('.edit')]
const save = [...document.querySelectorAll('.save')]
const deleteItem = [...document.querySelectorAll('.delete')]
edit.forEach(x => {
    x.addEventListener('click', function(){
        console.log(this.parentNode.childNodes[5].classList.toggle('hidden'))
        console.log(this.parentNode.childNodes[9].classList.toggle('hidden'))
    })
})

save.forEach(x => {
    x.addEventListener('click', saveEdit)
})

deleteItem.forEach(x => {
    x.addEventListener('click', deleteEdit)
})

async function saveEdit(){
    const task = this.parentNode.childNodes[1].innerText
    const date = this.parentNode.childNodes[3].innerText
    const input = this.parentNode.childNodes[5].value
    console.log(input)
    try{
        const response = await fetch('editSave', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'taskLists': task,
              'dueDateS': date,
              'update': input,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteEdit(){
    const task = this.parentNode.childNodes[1].innerText
    const date = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteEdit', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskLists': task,
                'dueDateS': date,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}