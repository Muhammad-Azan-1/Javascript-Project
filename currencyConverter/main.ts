const selects = document.querySelectorAll("select");
const flagImg = document.querySelectorAll("img");
const pTag = document.querySelector(".box3 p") as HTMLParagraphElement;
let btn = document.querySelector('.btn') as HTMLButtonElement;
let input = document.querySelector('input') as HTMLInputElement;
let errorMsg = document.querySelector('.errorMsg') as HTMLParagraphElement

const countryList: { [key: string]: string } = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

let latestRate : string;
function CurrenciesOptions() {
  for (let select of selects) {
    for (let currCode in countryList) {
      const option = document.createElement("option");
      option.innerText = currCode;
      option.value = currCode;

      if (
        (select.id == "from" && option.value == "USD") ||
        (select.id == "to" && option.value == "PKR")
      ) {
        option.selected = true;
      }

      if (select.id == "to") {
        option.classList.add("to");
      } else {
        option.classList.add("from");
      }
      select.append(option);
    }

    // getting current option and sending it to changeflag function
    select.addEventListener("change", (e) => {
      const select = e.target as HTMLSelectElement;
      const selectedOption = select.options[select.selectedIndex];
      changeFlag(selectedOption);
    });
  }
}

CurrenciesOptions();

function changeFlag(currOption: HTMLOptionElement) {

    let currCurrency: string = currOption.value;
    let countryCode: string = countryList[currCurrency];
    const imgIndex =  currOption.className == 'from' ? 0 : 1
    flagImg[imgIndex]!.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    currencyRates(currOption);
}

function currencyRates(currOpt: HTMLOptionElement) {
  let fromCurrency = (
    document.querySelector("#from") as HTMLSelectElement
  ).value.toLocaleLowerCase();
  let toCurrency = (
    document.querySelector("#to") as HTMLSelectElement
  ).value.toLocaleLowerCase();


  const url = fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
  );
  url
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      latestRate  = Number(data[fromCurrency][toCurrency]).toFixed(2);
      pTag.innerText = `1 ${fromCurrency.toUpperCase()} = ${latestRate} ${toCurrency.toUpperCase()}`;
    })
     .catch((error)=>{
        pTag.innerText  = 'Something went wrong while fetching the current curreny rates'
     })
}

function changeCurrency() {
    let value = input.value
    console.log(value)
    if((value).trim() == '') showError('Please enter a amount first')
    else if(+value <= 0) showError('Ammount should be a positive number and must be greater then 0')
       
    if(latestRate){
        let fromCurrency = (document.querySelector("#from") as HTMLSelectElement).value.toLocaleLowerCase();
        let toCurrency = (document.querySelector("#to") as HTMLSelectElement).value.toLocaleLowerCase();
        let result  = +latestRate * +value
        pTag.innerText = `${value} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`;
        }
    
}


function showError(msg:string){
errorMsg.innerText = msg 
errorMsg.classList.remove('hide')
setTimeout(hideError , 3000) 
}

function hideError(){
     errorMsg.classList.add('hide')
}


btn.addEventListener('click' , changeCurrency)
