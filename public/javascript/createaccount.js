const form = document.getElementById('form_cadastro');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const frm_data = new FormData(form)
    const data = Object.fromEntries(frm_data)
    fetch('/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.msg)
                document.location = '/login'
                return
            }
            alert(result.msg)
        })
})