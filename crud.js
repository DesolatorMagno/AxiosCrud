class Crud {

    constructor(config) {
        let options = {
            notification: {
                show: true,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            },
            classList: {
                store: 'crud-store',
                update: 'crud-update',
                delete: 'crud-delete'
            }
        };
        config = config || {};
        //Si esta vacio.
        this.config = options;
        if (Object.getOwnPropertyNames(config).length !== 0) {
            if (config.classList != null) {
                this.config.classList.store = config.classList.store || options.classList.store;
                this.config.classList.update = config.classList.update || options.classList.update;
                this.config.classList.delete = config.classList.delete || options.classList.delete;
            }
            if (config.notification != null) {
                this.config.notification.show = config.notification.show || options.notification.show;
                this.config.notification.toast = config.notification.toast || options.notification.toast;
                this.config.notification.position = config.notification.position || options.notification.position;
                this.config.notification.showConfirmButton = config.notification.showConfirmButton || options.notification.showConfirmButton;
                this.config.notification.timer = config.notification.timer || options.notification.timer;
            }
        }
        self = this;
        //Crud.prepareCrud();
    }

    prepareCrud() {
        [this.config.classList.store, this.config.classList.update].forEach(function (className) {
            //console.log(className);
            let elements = document.getElementsByClassName(className);
            for (let i = elements.length - 1; i >= 0; --i) {
                elements[i].addEventListener("submit", self.crudInit, false)
            }
        });
        let elements = document.getElementsByClassName(this.config.classList.delete);
        for (let i = elements.length - 1; i >= 0; --i) {
            elements[i].addEventListener("click", self.crudInit, false)
        }
    }

    crudInit(event) {
        const url = this.dataset.url;
        let formData;
        if (this.classList.contains(self.config.classList.delete)) {
            formData = new FormData();
            formData.append('_method', 'DELETE');
        } else {
            event.preventDefault();
            formData = new FormData(this);
            if (this.classList.contains(self.config.classList.update)) {
                formData.append('_method', 'put');
            }
        }
        self.crud(url, formData);
    }

    crud(url, formData) {
        axios.post(url, formData)
            .then(function (response) {
                if (self.config.notification.show) {
                    self.showMensage(response.data.title, response.data.text, response.data.type)
                }

            })
            .catch(function (error) {
                if (self.config.notification.show) {
                    self.showMensage('Advertencia', 'Servicio no disponible por los momentos', 'error')
                }
            })
            .then(function () {});
    }

    showMensage(title, text, type) {
        const Toast = Swal.mixin({
            toast: self.config.notification.toast,
            position: self.config.notification.position,
            showConfirmButton: self.config.notification.showConfirmButton,
            timer: self.config.notification.timer
        });

        Toast.fire({
            type: type,
            title: title,
            text: text
        })
    }
}