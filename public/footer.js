class Footer {
    patternName = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/gi;
    patternEmail = /^[a-zA-Z\d]+[\.\-]?[a-zA-Z\d]*\@[a-zA-Z]+\.[a-zA-Z]+/gi;
    patternTel = /\+7\(9\d{2}\)\d{3}\-\d{4}/gi;

    form = '';
    constructor() {
        this.addForm();
        this.addInput('name');
        this.addInput('email');
        this.addInput('tel');
        this.addSubmit();
        this.addReset();

    }

    addForm() {
        let footer = document.querySelector('.footer');
        let form = document.createElement('form');
        form.classList.add('footer-form');
        this.form = form;
        footer.appendChild(form);
    }

    addInput(type) {
        try {
            if (type === 'name') {
                throw 'поменяем-ка на text'
            }
            let input = document.createElement('input');
            input.classList.add(`footer-form-${type}`);
            input.setAttribute('type', `${type}`);
            if(type === 'tel'){
                input.setAttribute('placeholder', '+7(***)***-****');
                let title = document.createElement('span');
                title.classList.add('input-title');
                title.innerText = 'Ваш телефон:';
                this.form.appendChild(title);
            } else {
                input.setAttribute('placeholder', 'qwe@wqe.ru');
                let title = document.createElement('span');
                title.classList.add('input-title');
                title.innerText = 'Ваш email:';
                this.form.appendChild(title);
            }
            this.form.appendChild(input);
        } catch (error) {
            console.log(error);
            let input = document.createElement('input');
            input.classList.add(`footer-form-${type}`);
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Имя');
                let title = document.createElement('span');
                title.classList.add('input-title');
                title.innerText = 'Ваше имя:';
                this.form.appendChild(title);
            this.form.appendChild(input);

        }
    }

    addSubmit() {
        let btn = document.createElement('button');
        btn.classList.add('submit-btn');
        btn.innerText = 'Отправить';
        btn.addEventListener('click', () => {
            this.checkValid()
        });
        this.form.appendChild(btn);
    }

    addReset() {
        let btn = document.createElement('button');
        btn.classList.add('reset-btn');
        btn.setAttribute('type', 'reset');
        btn.innerText = 'Сбросить';
        this.form.appendChild(btn);
    }

    checkValid() {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(el => {
            switch (el.className) {
                case 'footer-form-email':
                    if (this.patternEmail.test(el.value)) {
                        console.log('Отлично. Подходит! Отправляем вам письмо о наследстве в Африке!');
                        alert('Отлично. Подходит! Отправляем вам письмо о наследстве в Африке!');
                    } else {
                        console.log('Ошибка. Повторите снова!');
                    }
                    break;
                case 'footer-form-tel':
                    if (this.patternTel.test(el.value)) {
                        console.log('Отлично. Подходит! Ждите звонка службы безопасности Сбербанка!');
                        alert('Отлично. Подходит! Ждите звонка службы безопасности Сбербанка!');
                    } else {
                        console.log('Ошибка. Повторите снова!');
                    }
                    break;
                case 'footer-form-name':
                    if (this.patternName.test(el.value)) {
                        console.log('Отлично. Подходит! Теперь спам будет именным!');
                        alert('Отлично. Подходит! Теперь спам будет именным!');
                    } else {
                        console.log('Ошибка. Повторите снова!');
                    }
                    break;
            }
        });
    }
}