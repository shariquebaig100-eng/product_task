const db = require("../config/db");

exports.getProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  console.log('PAGE:', page);
  console.log('PAGE SIZE:', pageSize);
  console.log('OFFSET:', offset);

  const sql = `
    SELECT
      p.productId   AS ProductId,
      p.productName AS ProductName,
      c.categoryId  AS CategoryId,
      c.categoryName AS CategoryName
    FROM products p
    JOIN categories c ON p.categoryId = c.categoryId
    LIMIT ? OFFSET ?;
  `;

  db.query(sql, [pageSize, offset], (err, result) => {
    if (err) {
      console.error('❌ PRODUCT QUERY ERROR:', err);
      return res.status(500).json({
        message: 'Failed to load products',
        error: err.message
      });
    }

    res.json(result);
  });
};


exports.addProduct = (req, res) => {
  const { ProductName, CategoryId } = req.body;

  if (!ProductName || CategoryId === 0) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql =
    'INSERT INTO products (ProductName, CategoryId) VALUES (?, ?)';

  db.query(sql, [ProductName, CategoryId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });

    res.status(201).json({
      message: 'Product added successfully',
      ProductId: result.insertId
    });
  });
};


exports.updateProduct = (req, res) => {
  const { ProductName, CategoryId } = req.body;
  db.query(
    "UPDATE products SET ProductName=?, CategoryId=? WHERE ProductId=?",
    [ProductName, CategoryId, req.params.id],
    () => res.json({ message: "Product updated successfully" })

  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Product id is required' });
  }

  db.query(
    "DELETE FROM products WHERE ProductId = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
    }
  );
};

