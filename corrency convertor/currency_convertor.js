// const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";  
const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies";
const dropdownSelect = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");

const fromCurr=document.querySelector(".from select")

const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");

// console.log(btn)

for (let select of dropdownSelect) {
    for (countryCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = countryCode;
        newOption.value = countryCode;

        if (select.name === "from" && countryCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && countryCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (e) => {
        updateFlage(e.target);
    })
}
const updateFlage = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    upDateExchangrRate();
    
});
// 

const upDateExchangrRate=async()=>{
    let amountInputElem=document.querySelector("form input");
    let amountValue=amountInputElem.value;
    // console.log(amountValue)

    if(amountValue===""|| amountValue<1){
        amountValue=1;
        amountInputElem.value="1";
        console.log(amountValue)

     }
        // console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase());
     const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let froom=fromCurr.value.toLowerCase();
     let response= await fetch(URL);
     let data = await response.json();
     let rate=data[fromCurr.value.toLowerCase()]
     rate=rate[toCurr.value.toLowerCase()];
     
     finalamount=amountValue * rate;
     console.log(finalamount);
      
     msg.innerHTML=`${amountValue}${fromCurr.value}=${finalamount.toFixed(3)}${toCurr.value}`;     
}

window.addEventListener("load",()=>{
    upDateExchangrRate();
});