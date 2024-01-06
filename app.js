const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const fromcurr = document.querySelector(".from select");
  const tocurr = document.querySelector(".to select");
  const msg = document.querySelector('.msg');






const dropdowns = document.querySelectorAll('.dropdown select')
const btn = document.querySelector("form button")


for ( let select of dropdowns){
     for (currcode in countryList) { 
        let newoption = document.createElement("option");
        newoption.innerText= currcode;
        newoption.value =currcode;
        select.append(newoption)

         }

         select.addEventListener( "change", (evt) =>{ updateflag(evt.target)})

}



const updateflag  = (element) => {
 let currcode = element.value;
 let countryCode = countryList[currcode];
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;    / `` $ {}/ 
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
}


const updateExchangeRate = async() => {

  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if(amtval== ''|| amtval < 1){ amtval = 1; amount.value = 1;} 
  const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;  
    let response = await fetch(url);
    let data = await response.json(); 
    let rate = data[tocurr.value.toLowerCase()];  

    let finalamt = amtval*rate;
    msg.innerText = ` ${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`

}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  
});

window.addEventListener("load", ()=> { updateExchangeRate()})
