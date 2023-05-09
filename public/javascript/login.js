const form = document.getElementById("form_login")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const frm_data = new FormData(form)
    const data = Object.fromEntries(frm_data)
    fetch('/loginauthetication', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                document.location = "/"
                return
            }
            alert(result.msg)
        })
})