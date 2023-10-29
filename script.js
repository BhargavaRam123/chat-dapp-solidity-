import { ethers } from "./ethers-5.1.es.min.js"
import { abi, contractaddress } from "./constants.js"
const connbtn = document.getElementById("connectbutton")
const createuserbutton = document.getElementById("createuserbtn")
connbtn.onclick = connect
createuserbutton.onclick = createuser
async function connect() {

    if (typeof window.ethereum != "undefined") {
        console.log("metask is there in your wallet")
        await window.ethereum.request({ method: "eth_requestAccounts" })
        document.getElementById("connectbutton").innerHTML = "connected!";
    } else {
        console.log("please install metamask")
    }
}
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractaddress, abi, signer)
async function checkuserexistsf() {
    if (typeof window.ethereum != "undefined") {
        try {
            const userval = await contract.checkuserexists(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
            // 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
            return userval
        }
        catch (error) {
            console.log(error)
        }
    }
}
async function createuser() {
    // if (checkuserexistsf() == false) {

    const str = document.getElementById("inputvalue").value
    if (typeof window.ethereum != "undefined") {
        try {
            const transactionresponse = await contract.createuser(str)
            await listenforthetransaction(transactionresponse, provider)
            console.log("done!!!!!!")
            document.getElementById("createuserbtn").innerHTML = `done!!!!!! click agian for next page`
            document.querySelector("a").href = "./index2.html"
        }
        catch (error) {
            console.log(error)
            document.getElementById("createuserbtn").innerHTML = `done!!!!!! click agian for next page`
            document.querySelector("a").href = "./index2.html"
        }
    }
    // }
    // else {
    //     // document.querySelector("a").href = "./index2.html"
    // }

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
