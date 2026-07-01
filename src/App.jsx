import { useEffect, useState } from "react";
import flags from "./FlagsData";
import { resume } from "react-dom/server";
function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function getCurrencies() {
      const res = await fetch("/api/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    }

    getCurrencies();
  }, []);
  console.log(currencies);
  return (
    <div className="min-h-screen bg-lineart-to-br from-slate-50 via-white to-blue-100">
      <div className="flex justify-center items-center p-4">
        <MainApp currencies={currencies} />
      </div>
    </div>
  );
}

export default App;

const MainApp = ({ currencies }) => {
  const [value, setValue] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedValue, setConvertedValue] = useState();

  useEffect(
    function () {
      async function GetValue() {
        if (fromCurrency === toCurrency) {
          setConvertedValue(
            `${value} ${fromCurrency} is ${value} ${toCurrency}`,
          );
        }
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${value}&from=${fromCurrency}&to=${toCurrency}`,
        );
        const data = await res.json();
        console.log(data.rates);
        const country = Object.keys(data.rates);

        setConvertedValue(
          `${data.amount} ${data.base} is ${data.rates[toCurrency]} ${country}  `,
        );
      }
      GetValue();
    },
    [fromCurrency, toCurrency, value],
  );

  const indexOffrom = currencies.indexOf(fromCurrency);
  const indexOfTo = currencies.indexOf(toCurrency);

  return (
    <div
      className="
w-full
max-w-xl
bg-white
rounded-3xl
border
border-slate-200
p-5
transition-all
duration-300
hover:shadow-2xl
hover:shadow-blue-500/50
hover:-translate-y-1
mt-5
"
    >
      <AmountInput setValue={setValue} value={value} />
      <div
        className="
flex
flex-col
md:flex-row
justify-between
items-center
gap-6
w-full
mt-6
text-lg
font-semibold
text-slate-700
"
      >
        <FromCurrencySelector
          fromCurrency={fromCurrency}
          indexOffrom={indexOffrom}
          setFromCurrency={setFromCurrency}
          currencies={currencies}
        />
        <ToCurrencySelector
          toCurrency={toCurrency}
          indexOfTo={indexOfTo}
          setToCurrency={setToCurrency}
          currencies={currencies}
        />
      </div>
      <div
        className="
w-full
mt-6
flex
justify-center
items-center
p-6
min-h-30
rounded-3xl
bg-blue-50
border
border-blue-100
"
      >
        <ConversionResult convertedValue={convertedValue} />
      </div>
    </div>
  );
};

const AmountInput = ({ setValue, value }) => {
  return (
    <input
      type="text"
      className="
w-full
p-4
text-xl
rounded-2xl
bg-slate-100
border
border-slate-300
text-slate-800
focus:ring-2
focus:ring-blue-500
outline-none
"
      placeholder="Enter Digits"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

const FromCurrencySelector = ({
  fromCurrency,
  indexOffrom,
  setFromCurrency,
  currencies,
}) => {
  return (
    <div className="flex items-center gap-1">
      <img
        src={`https://flagsapi.com/${flags[indexOffrom]}/shiny/64.png`}
        alt={fromCurrency}
        className="w-10 h-10 md:w-12 md:h-12"
      />
      <select
        name=""
        id=""
        onChange={(e) => setFromCurrency(e.target.value)}
        value={fromCurrency}
        className="
cursor-pointer
bg-white
border
border-slate-300
rounded-xl
px-3
py-2
text-slate-700
"
      >
        {currencies.map((cur, i) => (
          <option
            className="text-black bg-amber-100 rounded-4xl cursor-pointer"
            key={i}
            value={cur}
          >
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
};

const ToCurrencySelector = ({
  indexOfTo,
  toCurrency,
  setToCurrency,
  currencies,
}) => {
  return (
    <div className="flex items-center gap-1">
      <img
        src={`https://flagsapi.com/${flags[indexOfTo]}/shiny/64.png`}
        alt={toCurrency}
        className="w-10 h-10 md:w-12 md:h-12"
      />
      <select
        name=""
        id=""
        onChange={(e) => setToCurrency(e.target.value)}
        value={toCurrency}
        className="
cursor-pointer
bg-white
border
border-slate-300
rounded-xl
px-3
py-2
text-slate-700
"
      >
        {currencies.map((cur, i) => (
          <option
            className="text-black bg-amber-100 rounded-4xl cursor-pointer"
            key={i}
            value={cur}
          >
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
};

const ConversionResult = ({ convertedValue }) => {
  return (
    <h3 className="text-center text-lg md:text-2xl font-bold text-blue-800">
      {convertedValue}
    </h3>
  );
};
