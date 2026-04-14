let countryList={
    USD: "us", // United States
    INR: "in", // India
    EUR: "eu", // European Union
    JPY: "jp", // Japan
    GBP: "gb", // United Kingdom
    AUD: "au", // Australia
    CAD: "ca", // Canada
    CHF: "ch", // Switzerland
    CNY: "cn", // China
    HKD: "hk", // Hong Kong
    NZD: "nz", // New Zealand
    SGD: "sg", // Singapore
    KRW: "kr", // South Korea
    THB: "th", // Thailand
    AED: "ae", // UAE
    SAR: "sa", // Saudi Arabia
    MYR: "my", // Malaysia
    IDR: "id", // Indonesia
    PHP: "ph", // Philippines
    ZAR: "za", // South Africa
    RUB: "ru", // Russia
    BRL: "br", // Brazil
    MXN: "mx", // Mexico
    SEK: "se", // Sweden
    NOK: "no", // Norway
    DKK: "dk", // Denmark
    PLN: "pl", // Poland
    TRY: "tr", // Turkey
    EGP: "eg", // Egypt
    PKR: "pk", // Pakistan
    BDT: "bd", // Bangladesh
    LKR: "lk", // Sri Lanka
    NGN: "ng", // Nigeria
    KES: "ke", // Kenya
    VND: "vn", // Vietnam

};



window.addEventListener("load",()=>{
    fromFlag.src=`https://flagcdn.com/16x12/${countryList[fromSelect.value]}.png`;
    toFlag.src=`https://flagcdn.com/16x12/${countryList[toSelect.value]}.png`;
})
let btn=document.querySelector("#btn");
let div=document.querySelector("#output");
let optionFrom;
let val;
let optionTo;
div.innerHTML="";
let fromSelect=document.querySelector("#from");
let toSelect=document.querySelector("#to");
let fromFlag=document.querySelector("#fromflag");
let toFlag=document.querySelector("#toflag");
let code1;
let code2;


fromSelect.addEventListener("change",()=>{
    code1=countryList[fromSelect.value];
    fromFlag.src=`https://flagcdn.com/16x12/${code1}.png`;
})

toSelect.addEventListener("change",()=>{
    code2=countryList[toSelect.value];
    toFlag.src=`https://flagcdn.com/16x12/${code2}.png`;
})

for (let code in countryList){
    let option1=document.createElement("option");
    option1.value=code;
    option1.innerText=code;
    fromSelect.appendChild(option1);

    let option2=document.createElement("option");
    option2.value=code;
    option2.innerText=code;
    toSelect.appendChild(option2);

    fromSelect.value="USD";
    toSelect.value="INR";



}

async function CurrConv() {

    let res=await fetch(`https://open.er-api.com/v6/latest/${optionFrom}`);
    div.innerText="Loading.....";

    let data=await res.json();
    let rates=data.rates[optionTo];
    let mult=Number(val)*rates;
    div.innerText=`${val} ${optionFrom} is ${mult} ${optionTo}`;
    console.log(mult);
    
}


btn.addEventListener("click",()=>{

val=document.querySelector("#input").value;
optionFrom=document.querySelector("#from").value;
optionTo=document.querySelector("#to").value;

CurrConv();
})

// Remove from the bottom of the file