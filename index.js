const changeThemeBtn = document.querySelector('#change-theme')

changeThemeBtn.addEventListener('change', function() {
    document.body.classList.toggle('dark')
})

let d1 = document.getElementById('d1')
let d2 = document.getElementById('d2')
let d3 = document.getElementById('d3')
let d4 = document.getElementById('d4')
let d5 = document.getElementById('d5')
let d6 = document.getElementById('d6')
let roll_btn = document.getElementById('roll_btn')
let restart_btn = document.getElementById('restart_game')

let dices_rules = document.getElementsByClassName('dice_rules')
let code_body = document.getElementById('the_body')
function change_dices() {

    let value1 = document.getElementById('d1').src[32]
    let value2 = document.getElementById('d2').src[32]
    let value3 = document.getElementById('d3').src[32]
    let value4 = document.getElementById('d4').src[32]
    let value5 = document.getElementById('d5').src[32]
    let value6 = document.getElementById('d6').src[32]
    let values = [value1, value2, value3, value4, value5, value6]

    if (!code_body.classList.contains('dark')) {

        /* LOGO */
        document.getElementById('logodice').src = `./assets/dm-logo.png`

        /* RULES DICES */
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`dr${i}`).src = `./assets/dm_${i}.png`
        }

        /* GAME DICES */
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`d${i}`). src = `./assets/dm_${values[i - 1]}.png`
        }

    } else {

        /* LOGO */
        document.getElementById('logodice').src = `./assets/lm-logo.png`

        /* RULES DICES */
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`dr${i}`).src = `./assets/lm_${i}.png`
        }

        /* GAME DICES */
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`d${i}`). src = `./assets/lm_${values[i - 1]}.png`
        }
    }
}

function random_number() {
    return ((parseInt(Math.random() * 6)) + 1)
}

function correspondent_dice(idx, num, ldmode) {
    document.getElementById(`d${idx}`).src = `./assets/${ldmode}_${num}.png`
}

function verify_mode() {
    if (!code_body.classList.contains('dark')) {
        return 'lm'
    } else {
        return 'dm'
    }
}


let p1 = 0
let p2 = 0
function sum_points(idx, num) {
    idx < 4 ? p1 += num : p2 += num
}

let score_p1 = 0
let score_p2 = 0
function score_count(p1, p2) {
    if (p1 > p2) {
        score_p2++
    } else if (p2 > p1) {
        score_p1++
    }
}

function show_points(p1, p2) {
    if (p1 > p2) {
        document.getElementById('span_points').innerHTML = `Player: ${p1} x Computer: ${p2} (score)`
    } else if (p2 > p1) {
        document.getElementById('span_points').innerHTML = `Player: ${p1} (score) x Computer: ${p2}`
    } else {
        document.getElementById('span_points').innerHTML = `Player: ${p1} x Computer: ${p2}`
    }
}

function show_score(score_p1, score_p2) {
    document.getElementById('span_score').innerHTML = `Score: Player ${score_p1} x ${score_p2} Computer`
}

function verify_victory(score_p1, score_p2) {
    if (score_p1 == 3 || score_p2 == 3) {
        roll_btn.setAttribute('disabled', true)
        restart_btn.removeAttribute('disabled')
        if (score_p1 > score_p2) {
            document.getElementById('player').innerHTML += ` >>>> WINNER!`
        } else {
            document.getElementById('computer').innerHTML += ` >>>> WINNER!`
        }
    }
}

roll_btn.addEventListener('click', function () {
    p1 = 0
    p2 = 0
    for (let i = 1; i <= 6; i++) {
        let number = random_number()
        let mode = verify_mode()
        correspondent_dice(i, number, mode)
        sum_points(i, number)
    }
    show_points(p1, p2)
    score_count(p1, p2)
    show_score(score_p1, score_p2)
    verify_victory(score_p1, score_p2)
})

function clean_all() {
    document.getElementById('player').innerHTML = 'Player'
    document.getElementById('computer').innerHTML = 'Computer'
    let ldmode = verify_mode()
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`d${i}`).src = `./assets/${ldmode}_6.png`
    }
    p1 = 0
    p2 = 0
    score_p1 = 0
    score_p2 = 0
    document.getElementById('span_points').innerHTML = 'Roll the dices first!'
    show_score(score_p1, score_p2)
}

restart_btn.addEventListener('click', function() {
    roll_btn.removeAttribute('disabled')
    this.setAttribute('disabled', true)
    clean_all()
})