import "./cart.css";
export default function () {
  return (
    <section>
      <div id="cart-content">
        <img
          src="https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg"
          alt=""
        />
        <span id="cart-detail">
          <h3>Cart title</h3>
          <p>In Stock</p>
          <span>
            <input type="checkbox"></input>
            <label htmlFor="Quantiy">This will be a Gift</label>
          </span>
          <span>
            <label>Quantity:</label>
          <select name="Quantity" id="Quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option onClick={<input type="text"></input>} value="5+">5+</option><button onClick={<input type="text"></input>}/>
          </select>
          </span>
          <span>
          <button> Delete</button>
          <button> Save for Later</button>
          <button> See More Like This</button>
          <button> Share</button>
          </span>
        </span>
        <span id="cart-price">
          <h3>&#8377;10000</h3>
        </span>
      </div>
    </section>
  );
}
