let swup = new Swup();

// butter.init();

function init() {

    // Butter.js

    setTimeout(() => {
        butter.init();
    }, 0);

    // Navigation

    let getNavigation = document.querySelector('.navigation');
    let getNavigationLinks = getNavigation.querySelectorAll('.navigation__menu-link');

    for(let link of getNavigationLinks) {
        link.addEventListener('mouseover',alterLinkColors);
        link.addEventListener('mouseleave', function() {
            alterLinkColors(true);
        });
    }

    function alterLinkColors(isOut) {
        if (typeof isOut === 'undefined' || isOut instanceof MouseEvent) isOut = false;

        if(!isOut) {
            for(let link of getNavigationLinks) {
                link.classList.add('is-inactive');
            }
            this.classList.remove('is-inactive');
        }
        else {
            for(let link of getNavigationLinks) {
                link.classList.remove('is-inactive');
            }
        }
    }

    window.addEventListener('scroll', function() {
        navigationDetachment();
        updateProgressBar();
    });

    function navigationDetachment() {
        window.scrollY > 0 ? getNavigation.classList.add('is-detached') : getNavigation.classList.remove('is-detached');
    }

    function updateProgressBar() {
        const progressBar = document.querySelector('.navigation__progress-bar');
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    }

}

window.onload = function() {
    setTimeout(function() {
        init();
    }, 0);
};

swup.on('willReplaceContent', function() {
    butter.cancel();
});

swup.on('contentReplaced', function() {
    window.scrollTo(0, 0);
    butter.cancel();
    init();
})