import { ethers } from "./ethers-5.1.es.min.js"
import { abi, contractaddress } from "./constants.js"
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractaddress, abi, signer)
async function getusername() {
    if (typeof window.ethereum != "undefined") {
        try {
            const name = await contract.getusername()
            console.log(name)
            document.getElementById("username").innerHTML = name
        }
        catch (error) {
            console.log(error)
        }
    }
}
getusername()
async function _addfriend() {
    try {
        const address = document.getElementById("faddress").value
        const name = document.getElementById("fname").value
        const transactionresponse = await contract.addFriend(address, name)
        await listenforthetransaction(transactionresponse, provider)
        console.log("done!!!!!!")
        document.querySelectorAll("#finfo").innerHTML = `done!!!!!!`

    }
    catch (error) {
        console.log(error)
    }
}
function listenforthetransaction(transactionresponse, provider) {
    console.log(`mining tx:${transactionresponse.hash}.......`)
    return new Promise((resolve, request) => {
        provider.once(transactionresponse.hash, (txreceipt) => {
            console.log(`completed with ${txreceipt.confirmations} confirmations`)
            resolve()
        })
    })
}
const fsub = document.getElementById("finfo")
fsub.onclick = _addfriend



async function getmydost() {
    const address_ = await signer.getAddress()
    try {
        const _fnames = await contract.getmyfriend()
        console.log(_fnames)
        document.getElementById("friendslist").innerHTML = `${_fnames}`;
    }
    catch (error) {
        console.log(error)
    }
}
getmydost()
async function sendmsg() {
    const fadd = document.getElementById("__fa").value;
    const __message = document.getElementById("__fc").value;
    try {
        const txrs = await contract.sendmessage(fadd, __message)
        console.log(txrs)
        // const info
        // document.getElementById("content3").innerHTML = `${_fnames}`;
    }
    catch (error) {
        console.log(error)
    }
}
const fsub1 = document.getElementById("content2");
fsub1.onclick = sendmsg
var f = 1
async function messagesbtwtwo() {
    try {
        const _faddress = document.getElementById("chtr").value
        const txrs = await contract.viewmessagesbtwtwo(_faddress)
        console.log(txrs.length)
        // const info
        if (f === 1) {
            for (var i = 0; i < txrs.length; i++)
                document.getElementById("content3").innerHTML += `<p style="padding-top:10px">${txrs[i]}</p>`;
            f = 0;
        }
    }
    catch (error) {
        console.log(error)
    }
}
const chtrbtns = document.getElementById("chtrbtn");
chtrbtns.onclick = messagesbtwtwo