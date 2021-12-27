Moralis.initialize('Xte7eoX2TWLkFBkwv70rHVQ7ETEdwwR5TEzIaG15');
Moralis.serverURL = 'https://yifrvq2jrble.usemoralis.com:2053/server';
// const CONTRACT_ADDRESS = 'contract_address';
// const contractAbi = {};

init = async () => {
    hideElement(userInfo)
    hideElement(createItemForm)
    window.web3 = await Moralis.Web3.enable();
    // window.contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    initUser()
}

initUser = async() => {
    if(await Moralis.User.current()) {
        hideElement(userConnectButton)
        showElement(userProfileButton)
        showElement(openCreateItemButton)
    } else {
        showElement(userConnectButton)
        hideElement(userProfileButton)
        hideElement(openCreateItemButton)
    }
}

login = async () => {
    try {
        await Moralis.Web3.authenticate();
        initUser()
    } catch (error) {
        // const code = error.code;
        // const message = error.message;
        alert(error)
    }
}

logout = async () => {
    await Moralis.User.logOut();
    hideElement(userInfo)
    initUser()
}

openUserInfo = async() => {
    user = await Moralis.User.current()
    if (user) {
        const email = user.get('email')
        if (email) {
            userEmailField.value = email
        } else {
            userEmailField.value = ''
        }

        userUsernameField.value = user.get('username')

        const userAvatar = user.get('avatar')
        if (userAvatar) {
            userAvatarImg.src = userAvatar.url()
            showElement(userAvatarImg)
        } else {
            hideElement(userAvatarImg)
        }

        showElement(userInfo)
    } else {
        login()
    }
}

saveUserInfo = async() => {
    user.set('email', userEmailField.value)
    user.set('username', userUsernameField.value)

    if (userAvatarFile.files.length > 0) {
        const avatar = new Moralis.File('avatar.jpg', userAvatarFile.files[0]);
        user.set('avatar', avatar)
    }

    await user.save()
    alert("User info saved successfully!!")
    openUserInfo()
}

hideElement = (element) => element.style.display = "none"
showElement = (element) => element.style.display = "block"

const userConnectButton = document.getElementById('btnConnect')
userConnectButton.onclick = login
const userProfileButton = document.getElementById('btnUserInfo')
userProfileButton.onclick = openUserInfo

const userInfo = document.getElementById('userInfo')
const userUsernameField = document.getElementById('txtUsername')
const userEmailField = document.getElementById('txtEmail')
const userAvatarImg = document.getElementById('imgAvatar')
const userAvatarFile = document.getElementById('fileAvatar')

document.getElementById('btnCloseUserInfo').onclick = () => hideElement(userInfo)
document.getElementById('btnLogout').onclick = logout
document.getElementById('btnSaveUserInfo').onclick = saveUserInfo

const createItemForm = document.getElementById('createItem')

const createItemNameField = document.getElementById('txtCreateItemName')
const createItemDescriptionField = document.getElementById('textCreateItemDescription')
const createItemPriceField = document.getElementById('numCreateItemPrice')
const createItemStatusField = document.getElementById('selectCreateItemStatus')
const createItemFile = document.getElementById('fileCreateItemFile')


const openCreateItemButton = document.getElementById('btnOpenCreateItem')
openCreateItemButton.onclick = () => showElement(createItemForm)
document.getElementById('btnCloseCreateItem').onclick = () => hideElement(createItemForm)


init();