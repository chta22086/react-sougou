import { useEffect, useState } from "react";

async function fetchProducts(category,keyword) {
  const response = await fetch('products.json');
  const data = await response.json();
  return data.filter((item) => {
   return(
    (category === 'all' || category === item.type) &&
    (!keyword || item.name.includes(keyword))
    );
  });
}

export default function App() {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchProducts("all");
      setProducts(data) 
    })()
  },[])
    return (
      <>
        <header>
          <h1>Japanese Animation</h1>
        </header>
        <div>
          <aside>
            <form onSubmit={async (event) => {
              event.preventDefault()
              const category = event.target.elements.category.value
              const keyword = event.target.elements.keyword.value
              const data = await fetchProducts(category,keyword)
              setProducts(data)
            }}>
              <div>
                <label htmlFor="category">Choose a category:</label>
                <select id="category" name='category'>
                  <option value="all">All</option>
                  <option value="ジャンプ">ジャンプ</option>
                  <option value="少年サンデー">少年サンデー</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchTerm">Enter search term:</label>
                <input
                 type="text"
                 id="searchTerm"
                 name="keyword"
                 placeholder="title"
                 />
              </div>
              <div>
                <button>Filter results</button>
              </div>
            </form>
          </aside>
          <main>
            {products.length ? products.map((product) => {
              return (
               <section key={product.name} className={product.type}>
                <h2>{product.name[0].toUpperCase()}
                {product.name.slice(1)}
                </h2>
                <p>${product.price}</p>
                <img src={ `images/${product.image}`} alt={product.name}/>
              </section>
              );
            }) : <p>No results to display!</p>}
          </main>
        </div>
        <footer>
          <p> 日本大学文理学部情報科学科Webプログラミングの演習課題 </p>
        </footer>
      </>
    );
  }