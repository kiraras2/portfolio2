var auto_redirect = localStorage.getItem('return_to');
if (auto_redirect) {
    localStorage.removeItem('return_to');
    window.location.href = auto_redirect;
}
else {
    $('#top-loading').addClass('d-none');
}

function onReadyHandler() {
    const elms = document.querySelectorAll('.js-shuffleHeadline');
    if (elms !== null) {
        elms.forEach((elm) => {
            const inner = elm.querySelector('span');
            inner.style.opacity = 0;
        });
    }
    setScrollObserver();
}

window.addEventListener('load', function () {
    onLoadHandler();
})

function onLoadHandler() {
    const elms = document.querySelectorAll('.js-shuffleHeadline');
    if (elms !== null) {
        const observer = new IntersectionObserver(startShuffle, {
            root: null,
            rootMargin: '-50px 0%',
            threshold: 1,
        });
        elms.forEach((elm) => {
            const inner = elm.querySelector('span');
            inner.style.opacity = '';
            inner.style.width = (inner.clientWidth + 12) + 'px';
            inner.style.textAlign = 'center';
            inner.textContent = '';
            observer.observe(elm);
        });
    }
}

function startShuffle(entries, observerStop) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }
        const letter = $(entry.target).children('span').attr('data-letters');
        setTimeout(function () {
            $(entry.target).children('span').shuffleLetters({
                text: letter
            });
        }, 500)
        entry.target.classList.add('is-display')
        observerStop.unobserve(entry.target);
    });
}

window.addEventListener('scroll', function () {
    onScrollHandler();
})

function onScrollHandler() {
    if (document.scrollingElement.scrollTop > 5) {
        document.querySelector('article').classList.remove('is-first');
    }
}

let scroll_top = 0;

function disableScrolling() {
    scroll_top = document.scrollingElement.scrollTop;
    window.document.body.classList.add('scroll-disabled');
    window.document.body.style.top = -1 * scroll_top + 'px';
}

function enableScrolling() {
    window.document.body.classList.remove('scroll-disabled');
    window.document.body.style.top = '';
    document.scrollingElement.scrollTop = scroll_top;
}

