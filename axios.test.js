const pruebasAxios = require("./axios");
const assert = require("assert").strict;

describe("pruebaMocha", function () {
  it("should list all products", async function () {
      const client = new pruebasAxios();
      const products = await client.getProducts()
      console.log(products)
      assert.strictEqual(products.length, 5)
  })
})

