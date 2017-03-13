const pdfRequest = (data, callback) => {
    fetch('http://localhost:3088/pdf/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.blob())
        .then(blob => callback(blob));
};

class Modal {
    constructor(overlay) {
        this.overlay = overlay;
        const closeButton = overlay.querySelector('.button-close')
        closeButton.addEventListener('click', this.close.bind(this));
        overlay.addEventListener('click', e => {
            if (e.srcElement.id === this.overlay.id) {
                this.close();
            }
        });
    }
    open() {
        this.overlay.classList.remove('is-hidden');
    }

    close() {
        this.overlay.classList.add('is-hidden');
    }
}

const makePdf = body => {
    pdfRequest({
        body: body,
        options: {
            orientation: 'landscape',
            'header-html': 'http://localhost:3088/client/header.html',
            'footer-html': 'http://localhost:3088/client/footer.html'
        }
    }, resp => download(resp, Date.now() + '.pdf'));
};

const onload = () => {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/html");
    const modal = new Modal(document.querySelector('.modal-overlay'));
    window.submit = () => makePdf(editor.getValue());
    window.preview = () => {
        document.querySelector('.modal-body').innerHTML = editor.getValue();
        modal.open();
    };
};
document.addEventListener("DOMContentLoaded", onload);
