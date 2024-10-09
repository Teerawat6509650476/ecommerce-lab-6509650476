const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {
  // Write your test cases here
describe('GET /products', () => {
 it('should return all products', async () => {
   const res = await request(app).get('/products');
   expect(res.statusCode).toBe(200);
   expect(res.body.length).toBeGreaterThan(0);
   expect(res.body).toEqual(
     expect.arrayContaining([
       expect.objectContaining({
         id: expect.any(Number),
         name: expect.any(String),
         price: expect.any(Number),
         stock: expect.any(Number),
       }),
     ])
   );
 });
});

describe('GET /products/:id', () => {
 it('should return a product by ID', async () => {
   const res = await request(app).get('/products/1');
   expect(res.statusCode).toBe(200);
   expect(res.body).toHaveProperty('id', 1);
   expect(res.body).toHaveProperty('name', 'Laptop');
   expect(res.body).toHaveProperty('price', 1000);
   expect(res.body).toHaveProperty('stock', 5);
 });

 it('should return 404 if product not found', async () => {
   const res = await request(app).get('/products/999');
   expect(res.statusCode).toBe(404);
   expect(res.body).toHaveProperty('message', 'Product not found');
 });
});

describe('POST /products', () => {
 it('should add a new product', async () => {
   const newProduct = {
     name: 'Tablet',
     price: 300,
     stock: 15
   };

   const res = await request(app)
     .post('/products')
     .send(newProduct);
   
   expect(res.statusCode).toBe(201);
   expect(res.body).toHaveProperty('id');
   expect(res.body).toHaveProperty('name', 'Tablet');
   expect(res.body).toHaveProperty('price', 300);
   expect(res.body).toHaveProperty('stock', 15);
 });
});

describe('PUT /products/:id', () => {
 it('should update an existing product', async () => {
   const updatedProduct = {
     name: 'Updated Laptop',
     price: 1200,
     stock: 7
   };

   const res = await request(app)
     .put('/products/1')  // สมมติว่า id ของสินค้าคือ 1
     .send(updatedProduct);

   expect(res.statusCode).toBe(200);
   expect(res.body).toHaveProperty('name', 'Updated Laptop');
   expect(res.body).toHaveProperty('price', 1200);
   expect(res.body).toHaveProperty('stock', 7);
 });
 
 // ทดสอบว่า API จะคืนค่า 404 ถ้าสินค้าที่อัปเดตไม่พบในระบบ
 it('should return 404 if product not found', async () => {
   const updatedProduct = {
     name: 'Non-existent Product',
     price: 500,
     stock: 3
   };

   const res = await request(app)
     .put('/products/999')  // id ของสินค้าที่ไม่มีอยู่จริง
     .send(updatedProduct);

   expect(res.statusCode).toBe(404);
   expect(res.body).toHaveProperty('message', 'Product not found');
 });
});

describe('DELETE /products/:id', () => {
  // ทดสอบว่า API สามารถลบสินค้าได้
  it('should delete a product', async () => {
    const res = await request(app)
      .delete('/products/1');  // สมมติว่า id ของสินค้าคือ 1

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Product deleted');
  });

  // ทดสอบว่า API คืนค่า 404 ถ้าสินค้าที่ต้องการลบไม่พบในระบบ
  it('should return 404 if product not found', async () => {
    const res = await request(app)
      .delete('/products/999');  // id ของสินค้าที่ไม่มีอยู่จริง

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Product not found');
  });
});


});
