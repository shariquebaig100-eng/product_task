const db = require("../config/db");

exports.getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });
    res.json(result);
  });
};

exports.createCategory = (req, res) => {
  const { CategoryName } = req.body;

  if (!CategoryName || !CategoryName.trim()) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  db.query(
    "INSERT INTO categories (CategoryName) VALUES (?)",
    [CategoryName.trim()],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Category already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(201).json({
        message: 'Category added successfully',
        CategoryId: result.insertId
      });
    }
  );
};


exports.updateCategory = (req, res) => {
  db.query(
    "UPDATE categories SET CategoryName=? WHERE CategoryId=?",
    [req.body.CategoryName, req.params.id],
    () => res.json({ message: "Category updated successfully" })
  );
};

exports.deleteCategory = (req, res) => {
  db.query(
    "DELETE FROM categories WHERE CategoryId=?",
    [req.params.id],
    () => res.json({ message: "Category deleted successfully" })
  );
};
