//анімація для секції about
function aboutAnimation() {
    const aboutSection = document.querySelector('.hero');
    const title = document.querySelector('.about-title');
    const text = document.querySelector('.hero-text');
    const callBtns = document.querySelectorAll('.call-btn');

    const sectionPostion = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 0.8;

    if (sectionPostion < screenPosition) {
        setTimeout(() => {
            title.style.transform = 'translateY(0)';
            title.style.opacity = '1';
        }, 1000);

        setTimeout(() => {
            text.style.transform = 'translateY(0)';
            text.style.opacity = '1';
        }, 1100);

        setTimeout(() => {
            callBtns.forEach(btn => {
                btn.style.transform = 'translateX(0)';
                btn.style.opacity = '1';
            });
        }, 1500);
    }
}
aboutAnimation();

//анімація для секції hero
function heroAnimation() {
    const heroSection = document.querySelector('.hero');
    const leftImgBlock = document.querySelector('.img-left');
    const rightImgBlock = document.querySelector('.img-right');
    const foundation = document.querySelector('.foundation')
    const title = document.querySelector('.hero-title');
    const text = document.querySelector('.hero-description');
    const subtitle = document.querySelector('.hero-subtitle');
    const subDescr = document.querySelector('.sub-descr');

    document.addEventListener('scroll', () => {
        const sectionPostion = heroSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 0.8;

        if (sectionPostion < screenPosition) {
            setTimeout(() => {
                leftImgBlock.style.transform = 'translateY(0)';
                leftImgBlock.style.opacity = '1';
            }, 800)
            setTimeout(() => {
                rightImgBlock.style.transform = 'translateY(0)';
                rightImgBlock.style.opacity = '1';
            }, 900)
            setTimeout(() => {
                foundation.style.transform = 'translateY(0)';
                foundation.style.opacity = '1';
            }, 900)
            setTimeout(() => {
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
            }, 1100)
            setTimeout(() => {
                text.style.transform = 'translateY(0)';
                text.style.opacity = '1';
            }, 1200)
            setTimeout(() => {
                subtitle.style.transform = 'translateY(0)';
                subtitle.style.opacity = '1';
            }, 1300)
            setTimeout(() => {
                subDescr.style.transform = 'translateY(0)';
                subDescr.style.opacity = '1';
            }, 1350)
        }
    })
};
heroAnimation()

//анімація для секції workprocess
function workAnim() {
    const workSection = document.querySelector('.workprocess');
    const item1 = document.querySelector('.col-3:first-of-type')
    const item2 = document.querySelector('.col-3:nth-child(2)')
    const item3 = document.querySelector('.col-3:nth-child(3)')
    const item4 = document.querySelector('.col-3:last-of-type')

    document.addEventListener('scroll', () => {
        const sectionPosition = workSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (sectionPosition < screenPosition) {
            setTimeout(() => {
                item1.style.transform = 'translateY(0)';
                item1.style.opacity = '1';
            }, 500)
            setTimeout(() => {
                item2.style.transform = 'translateY(0)';
                item2.style.opacity = '1';
            }, 800)
            setTimeout(() => {
                item3.style.transform = 'translateY(0)';
                item3.style.opacity = '1';
            }, 1100)
            setTimeout(() => {
                item4.style.transform = 'translateY(0)';
                item4.style.opacity = '1';
            }, 1400)
        }
    })
}
workAnim();

//анмімація для секції assortment
function assortAnim() {
    const workSection = document.querySelector('.assortment');
    const rocetImage = document.querySelector('.rocet-ico');
    const callBtn = document.querySelector('.call-button');
    // const carImage = document.querySelector('.car-delivery__ico');

    document.addEventListener('scroll', () => {
        const sectionPosition = workSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (sectionPosition < screenPosition) {
            setTimeout(() => {
                rocetImage.style.transform = 'rotateX(360deg)';
                rocetImage.style.transform = 'rotateY(360deg)';
                rocetImage.style.width = '250px';
                rocetImage.style.height = '200px';
                rocetImage.style.opacity = '1';
            }, 400);
            setTimeout(() => {
                callBtn.style.transform = 'translateX(0)';
                callBtn.style.opacity = '1';
            }, 900)
        }
    })
}
assortAnim();

//анімація для секції contacts

function contAnim() {
    const contactsSection = document.querySelector('.contacts');
    const item1 = document.querySelector('.office');
    const item2 = document.querySelector('.phone');
    const item3 = document.querySelector('.email');

    document.addEventListener('scroll', () => {
        const sectionPosition = contactsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if(sectionPosition < screenPosition){
            setTimeout(() => {
                item1.style.transform = 'translateY(0)';
                item1.style.opacity = '1';
            },500);
            setTimeout(() => {
                item2.style.transform = 'translateY(0)';
                item2.style.opacity = '1';
            },800);
            setTimeout(() => {
                item3.style.transform = 'translateY(0)';
                item3.style.opacity = '1';
            },1100);
        }
    })
}

contAnim();