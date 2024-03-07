const qtyOfColumns = 14;
const qtyOfRows = 12;

const flexboxControl = (() => {
    const main = document.querySelector('main');

    const setFlexItemRadius = (item) => {
        const radius = window.innerWidth / qtyOfColumns;
        item.style.height = item.style.width = `${radius}px`;
    };

    const setFlexItemRadiusOnResize = () => {
        const flexItems = document.querySelectorAll('.flex-item');
        for (let i = 0; i < flexItems.length; i++) {
            setFlexItemRadius(flexItems[i]);
        }
    };

    const flexBoxInitialization = () => {
        for (let i = 0; i < qtyOfRows; i++) {
            const flexContainer = document.createElement('div');
            flexContainer.classList.add('flex-container');

            for (let j = 0; j < qtyOfColumns; j++) {
                const flexItem = document.createElement('div');
                flexItem.classList.add('flex-item');
                setFlexItemRadius(flexItem);

                const image = document.createElement('img');
                image.classList.add('round-image');

                if (j > 5 && j < 10) {
                    image.src = 'content/layer_1.png';
                } else if (j == 5 && i == 2) {
                    image.src = 'content/layer_1.png';
                } else {
                    image.src = 'content/layer_2.png';
                }

                flexItem.appendChild(image);
                flexContainer.appendChild(flexItem);
            }

            main.appendChild(flexContainer);
        }
    };

    return {
        flexBoxInitialization: flexBoxInitialization,
        setFlexItemRadiusOnResize: setFlexItemRadiusOnResize,
    };
})();

const flexboxImagesPositionControl = (() => {
    const flexContainers = document.getElementsByClassName('flex-container');

    const setLeftPosition = (elementsArray, leftPositionInit) => {
        let leftPosition = leftPositionInit;

        for (let i = 0; i < elementsArray.length; i++) {
            leftPosition -= 100;
            elementsArray[i].style.left = `${leftPosition}%`;
        }
    };

    const setTopPosition = (elementsArray, topPosition) => {
        for (let i = 0; i < elementsArray.length; i++) {
            elementsArray[i].style.top = `${topPosition}%`;
        }
    };

    const setPositions = () => {
        let topPosition = -15;

        for (let i = 0; i < flexContainers.length; i++) {
            const flexContainerItems = flexContainers[i].getElementsByClassName('flex-item');
            const flexContainerImages = flexContainers[i].getElementsByClassName('round-image');

            setLeftPosition(flexContainerImages, 5);
            setTopPosition(flexContainerImages, topPosition);
            topPosition -= 100;
        }
    };

    return { setPositions: setPositions };
})();

const lightsControl = (() => {
    const delayBeforeRemoveClass = 370 * qtyOfColumns;
    const loopInterval = delayBeforeRemoveClass * 2 + 1000;
    const qtyOfRandomLights = 100;

    const randomLights = () => {
        const flexItemImage = document.querySelectorAll('.flex-item');

        for (let i = 0; i < qtyOfRandomLights; i++) {
            const index = Math.ceil(Math.random() * (flexItemImage.length - 1));
            const pause = Math.ceil(Math.random() * delayBeforeRemoveClass);

            setTimeout(() => {
                flexItemImage[index].classList.add('yellow');
                setTimeout(() => {
                    flexItemImage[index].classList.remove('yellow');
                }, delayBeforeRemoveClass);
            }, pause);
        }
    };

    const diagonalLights = () => {
        const flexItemImage = document.querySelectorAll('.flex-item');

        for (let i = 0; i < qtyOfColumns * 2; i++) {
            setTimeout(() => {
                if (i < flexItemImage.length && !flexItemImage[i].classList.contains('yellow')) {
                    flexItemImage[i].classList.add('yellow');
                    setTimeout(() => {
                        flexItemImage[i].classList.remove('yellow');
                    }, delayBeforeRemoveClass);
                }

                for (let j = 1; j <= i; j++) {
                    const calculetedIndex = j * qtyOfColumns + (i - j);
                    if (
                        calculetedIndex < flexItemImage.length &&
                        !flexItemImage[calculetedIndex].classList.contains('yellow')
                    ) {
                        flexItemImage[calculetedIndex].classList.add('yellow');
                        setTimeout(() => {
                            flexItemImage[calculetedIndex].classList.remove('yellow');
                        }, delayBeforeRemoveClass);
                    }
                }
            }, (i * delayBeforeRemoveClass) / (qtyOfColumns * 2));
        }
    };

    const animationLoop = (loopInterval) => {
        randomLights();
        setTimeout(diagonalLights, loopInterval);
    };

    const startAnimation = () => {
        animationLoop(loopInterval);
        setInterval(() => {
            animationLoop(loopInterval);
        }, loopInterval * 2);
    };

    return { startAnimation: startAnimation };
})();

window.addEventListener('load', flexboxControl.flexBoxInitialization);
window.addEventListener('load', flexboxImagesPositionControl.setPositions);
window.addEventListener('load', lightsControl.startAnimation);
window.addEventListener('resize', flexboxControl.setFlexItemRadiusOnResize);
