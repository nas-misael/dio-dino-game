const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let isGameOver = false
let position = 0;

const handleKeyUp = (e) => {
    if(e.keyCode === 32 || e.keyCode === 38){
        if(!isJumping){
            jump()
        }
    }
}

const jump = () => {
    isJumping = true
    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval)
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 20)
        } else {
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)
}

const createCactus = () => {
    const cactus = document.createElement('div')
    let positionCactus = 1000
    let randomTime = Math.random() * 6000

    if(isGameOver) return

    cactus.classList.add('cactus')
    background.appendChild(cactus)
    cactus.style.left = positionCactus + 'px'

    let leftInterval = setInterval(() => {
        
        if(positionCactus < -60){
            clearInterval(leftInterval)
            background.removeChild(cactus)
        } else if(positionCactus > 0 && positionCactus < 60 && position < 60) {
            //Game Over
            clearInterval(leftInterval)
            isGameOver = true
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'
        }else {
            positionCactus -= 10
            cactus.style.left = positionCactus + 'px'
        }
    }, 20)

    setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keypress', handleKeyUp)