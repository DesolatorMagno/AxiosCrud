function prepareCrud() {
    let elements = document.getElementsByClassName('delete');
    for (let i = elements.length - 1; i >= 0; --i) {
        elements[i].addEventListener("click", crudInit, false)
    }
    elements = document.getElementsByClassName('store');
    for (let i = elements.length - 1; i >= 0; --i) {
        elements[i].addEventListener("submit", crudInit, false)
    }
    elements = document.getElementsByClassName('update');
    for (let i = elements.length - 1; i >= 0; --i) {
        elements[i].addEventListener("submit", crudInit, false)
    }
}

function showMensage(title, text, type) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        type: type,
        title: title,
        text: text
    })
}

function crudInit(event) {
    const url = this.dataset.url;
    let formData;
    if (this.classList.contains('delete')) {
        console.log('hola')
        formData = new FormData();
        formData.append('_method', 'DELETE');
    } else {
        event.preventDefault();
        formData = new FormData(this);
        console.log('aqui')
        if (this.classList.contains('update')) {
            formData.append('_method', 'put');
        }
    }
    crud(url, formData);
}

function crud(url, formData) {
    axios.post(url, formData)
        .then(function (response) {
            showMensage(response.data.title, response.data.text, response.data.type)
        })
        .catch(function (error) {
            showMensage('Advertencia', 'Servicio no disponible por los momentos', 'error')
        })
        .then(function () {});
}

prepareCrud();
