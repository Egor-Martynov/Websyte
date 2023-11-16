const buttons = [
    '.button1',
    '.button2',
    '.button3',
    '.button4',
    '.button5',
    '.button6'
];

const fetchOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

document.addEventListener('DOMContentLoaded', () => {

    switch (document.location.href.split('/').pop()) {

        case 'index.html':

            fetch(`/lamp/`, {
                ...fetchOptions,
                body: JSON.stringify({id: 'lamp1', state: false})
            });
            fetch(`/lamp/`, {
                ...fetchOptions,
                body: JSON.stringify({id: 'lamp2', state: false}),
            });
            fetch(`/lamp/`, {
                ...fetchOptions,
                body: JSON.stringify({id: 'lamp3', state: false})
            });
            fetch(`/lamp/`, {
                ...fetchOptions,
                body: JSON.stringify({id: 'lamp4', state: false}),
            });
            fetch(`/lamp/`, {
                ...fetchOptions,
                body: JSON.stringify({id: 'lamp5', state: false})
            });
            fetch(`/lamp/`, {
                ...fetchOptions,
                body: JSON.stringify({id: 'lamp6', state: false}),
            });

        break;
        
    }


    document.querySelectorAll(buttons.join(', '))
        .forEach(el => el.addEventListener('click', ({currentTarget}) => {
            const id = currentTarget.id;
            const isOn = currentTarget.classList.contains('on')

            currentTarget.classList[isOn ? 'remove' : 'add']('on');
            fetch(`/lamp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, state: !isOn})
            }).catch(e => console.error(e));
        }));
})