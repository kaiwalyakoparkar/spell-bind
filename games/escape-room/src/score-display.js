function scoreDisplay(user) {
    const userNameNode = document.getElementById('user-name');
    userNameNode.textContent = user.name;

    const hpNode = document.getElementById('hp');
    hpNode.textContent = user.hp;

    const cpNode = document.getElementById('cp');
    cpNode.textContent = user.cp;
}

export default scoreDisplay;