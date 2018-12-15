class UserForm {
    constructor(user) {
        this.user = user;
    }

    getElem() {
        if (!this.elem) {
            this.render();
        }
        return this.elem;
    }

    render() {
        let html = _.template(`<div class='user-form'>
        <form>
        <p>Full Name: <input type='text' name="fullName" required></p>
        <p>Email: <input type='email' name="email"></p>
        <p><input type='submit' value="Submit"></p>
        </form>
        </div>`)();
        this.elem = createElementFromHtml(html);

        this.form = this.elem.querySelector('form');
        for (let prop in this.user) {
            if (this.form[prop]) {
                this.form[prop].value = this.user[prop];
            }
        }
        this.elem.addEventListener('submit', this);
    }

    destroy() {
        document.body.removeChild(document.body.querySelector('.user-form'));
    }

    handleEvent(event) {
        this['on' + event.type[0].toUpperCase() + event.type.slice(1)](event);
    }

    onSubmit(event) {
        for(let prop in this.user) {
            if (this.form[prop]) {
                this.user[prop] = this.form[prop].value;
            }
        }
        console.log(this.user);
        this.editUser(this.user);
        this.getElem().dispatchEvent(new CustomEvent('user-saved', {
            bubbles: true,
            detail: this.user._id
        }));
        event.preventDefault();
    }

    editUser(user) {
        let xhr = new XMLHttpRequest();
        xhr.open('PATCH', `http://test-api.javascript.ru/v1/ivanq/users/${user._id}`, true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        let body = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
            
        };
        //console.log("body" + JSON.stringify(body));
        xhr.send(JSON.stringify(body));

        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert(`Error: ${xhr.responseText}`);
            } else {
                alert('Ok!');
                //console.log(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            alert('Sorry error! Try again later');
        };

    }

}