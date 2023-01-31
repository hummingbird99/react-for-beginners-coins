import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [choosenCoin, setChoosenCoin] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (e) => {
    setMoney(() => e.target.value);
  };
  const onSelect = (e) => {
    setChoosenCoin(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Top-ranked Coins! {loading ? "" : `<${coins.length}>`}
      </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <div className={styles.box}>
            <label className={styles.label}>Amount you have: $</label>
            <input
              onChange={onChange}
              value={money}
              className={styles.input}
              type="number"
            ></input>
            <br />
            <label className={styles.label}>Choose coin: </label>
            <select onChange={onSelect} className={styles.select}>
              <option style={{ textAlign: "center" }}>
                ----- Choose options ------
              </option>
              {coins.map((coin) => (
                <option
                  key={coin.id}
                  value={[coin.name, coin.quotes.USD.price]}
                >
                  {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
                </option>
              ))}
            </select>
          </div>
          <hr className={styles.hr} />
          <div className={styles.result}>
            {choosenCoin !== "" ? (
              <strong>
                You can get {Math.floor(money / choosenCoin.split(",")[1])}{" "}
                {choosenCoin.split(",")[0]}(s)!
              </strong>
            ) : (
              <strong>Please fill out the amount.</strong>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
