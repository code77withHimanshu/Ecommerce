// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection setup
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('MySQL Connected...');
});

// Middleware for authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer TOKEN'
    if (token == null) return res.sendStatus(401); // If no token, send 401 Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, send 403 Forbidden
        req.user = user;
        next();
    });
};

app.get('/auth/current_user', authenticateToken, (req, res) => {
    const userId = req.user.user_id; // Extract user_id from req.user
    
    // Query to fetch full user details
    const query = 'SELECT * FROM Users WHERE user_id = ?';

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).send('Error fetching user details');
        }

        if (results.length > 0) {
            res.json(results[0]); // Return the first result (user details)
        } else {
            res.status(404).send('User not found');
        }
    });
});

// Route to fetch products
app.get('/products', (req, res) => {
    // SQL query to join Products with Categories
    const query = `
        SELECT p.*, c.name AS category_name
        FROM Products p
        JOIN Categories c ON p.category_id = c.category_id
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Error fetching products');
        }
        res.json(results);
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM Products WHERE product_id = ?';
    
    connection.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product details:', err);
            return res.status(500).send('Error fetching product details');
        }
        
        if (results.length === 0) {
            return res.status(404).send('Product not found');
        }
        
        res.json(results[0]); // Return the first (and only) result
    });
});

app.post('/products', authenticateToken, (req, res) => {
    const { name, description, price, stock, category_id, image_url } = req.body;

    console.log(req.body); // Log to check if image_url is being received

    // Validate input
    if (!name || !description || !price || !stock || !category_id || !image_url) {
        return res.status(400).send('All fields are required');
    }

    // Insert product into the database
    const query = `
        INSERT INTO Products (name, description, price, stock, category_id, created_at, image_url)
        VALUES (?, ?, ?, ?, ?, NOW(), ?)`;
    const values = [name, description, price, stock, category_id, image_url];

    console.log("SQL Query:", query); // Log the query for debugging
    console.log("Values:", values);   // Log the values for debugging

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).send('Error adding product');
        }
        res.status(201).send('Product added successfully');
    });
});  

app.put('/products/:id', authenticateToken, (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock, category_id, image_url } = req.body;
  
    // Validate input
    if (!name && !description && !price && !stock && !category_id && !image_url) {
      return res.status(400).send('At least one field is required to update');
    }
  
    // Build the update query dynamically
    let updateFields = [];
    let values = [];
    
    if (name) {
      updateFields.push('name = ?');
      values.push(name);
    }
    if (description) {
      updateFields.push('description = ?');
      values.push(description);
    }
    if (price) {
      updateFields.push('price = ?');
      values.push(price);
    }
    if (stock) {
      updateFields.push('stock = ?');
      values.push(stock);
    }
    if (category_id) {
      updateFields.push('category_id = ?');
      values.push(category_id);
    }
    if (image_url) {
      updateFields.push('image_url = ?');
      values.push(image_url);
    }
    
    // Include the product ID in the values array
    values.push(productId);
  
    const query = `
      UPDATE Products
      SET ${updateFields.join(', ')}
      WHERE product_id = ?
    `;
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error updating product:', err);
        return res.status(500).send('Error updating product');
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send('Product not found');
      }
  
      res.status(200).send('Product updated successfully');
    });
  });

app.delete('/products/:id', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.id, 10);
  
    if (isNaN(productId)) {
      return res.status(400).send('Invalid product ID');
    }
  
    const query = 'DELETE FROM Products WHERE product_id = ?';
    connection.query(query, [productId], (err, results) => {
      if (err) {
        console.error('Error deleting product:', err);
        return res.status(500).send('Error deleting product');
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send('Product not found');
      }
  
      res.status(200).send('Product deleted successfully');
    });
  });
  

// Route to add items to cart
app.post('/cart', authenticateToken, (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.user_id;
    const query = `INSERT INTO Cart (user_id, product_id, quantity, added_at) VALUES (?, ?, ?, NOW())`;
    connection.query(query, [user_id, product_id, quantity], (err, results) => {
        if (err) {
            console.error('Error adding to cart:', err);
            return res.status(500).send('Error adding to cart');
        }
        res.status(201).send('Item added to cart');
    });
});

app.get('/cart', authenticateToken, (req, res) => {
    const user_id = req.user.user_id;

    if (!user_id) {
        return res.status(400).send('User ID is missing or invalid');
    }

    console.log('User ID:', user_id);

    // First query to get the cart items
    const query = 'SELECT * FROM Cart WHERE user_id = ?';
    connection.query(query, [user_id], (err, cartResults) => {
        if (err) {
            console.error('Error fetching cart:', err);
            return res.status(500).send('Error fetching cart');
        }

        if (cartResults.length === 0) {
            console.log('Cart is empty for user:', user_id);
            return res.status(404).send('Cart is empty');
        }

        console.log('Cart results:', cartResults);

        // Extract product_ids from cartResults
        const productIds = cartResults.map(item => item.product_id);

        // Second query to get product details
        const query1 = 'SELECT * FROM Products WHERE product_id IN (?)';
        connection.query(query1, [productIds], (err, productResults) => {
            if (err) {
                console.error('Error fetching product details:', err);
                return res.status(500).send('Error fetching product details');
            }

            // Merge cart items with product details
            const cartWithProductDetails = cartResults.map(cartItem => {
                const product = productResults.find(prod => prod.product_id === cartItem.product_id);
                return {
                    ...cartItem,
                    product_name: product.name,
                    product_description: product.description,
                    price: product.price,
                    imageUrl: product.image_url
                };
            });

            console.log('Cart with product details:', cartWithProductDetails);
            res.json(cartWithProductDetails);
        });
    });
});

// Route to remove an item from the cart
app.delete('/remove-from-cart/:productId', authenticateToken, (req, res) => {
    const user_id = req.user.user_id; // Extract user_id from authenticated user
    const productId = req.params.productId; // Extract productId from the URL parameters

    if (!user_id) {
        return res.status(400).send('User ID is missing or invalid');
    }

    const query = 'DELETE FROM Cart WHERE user_id = ? AND product_id = ?';
    connection.query(query, [user_id, productId], (err, result) => {
        if (err) {
            console.error('Error removing item from cart:', err);
            return res.status(500).send('Error removing item from cart');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Item not found in cart');
        }

        res.send('Item removed from cart');
    });
});

// Route to clear the cart after placing an order
app.delete('/clear-cart', authenticateToken, (req, res) => {
    const user_id = req.user.user_id; // Extract user ID from the authenticated token

    const query = 'DELETE FROM Cart WHERE user_id = ?';
    connection.query(query, [user_id], (err) => {
        if (err) {
            console.error('Error clearing cart:', err);
            return res.status(500).send('Error clearing cart');
        }
        res.status(204).send(); // Send a 204 No Content response if successful
    });
});


// Route to place an order
app.post('/orders', authenticateToken, (req, res) => {
    const user_id = req.user.user_id;
    const { items, total, status } = req.body; // items should be an array of { product_id, quantity, price }

    // Begin transaction
    connection.beginTransaction(err => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).send('Error placing order');
        }

        const insertOrderQuery = 'INSERT INTO Orders (user_id, total, status, created_at) VALUES (?, ?, ?, NOW())';
        connection.query(insertOrderQuery, [user_id, total, status], (err, results) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error inserting order:', err);
                    res.status(500).send('Error placing order');
                });
            }
            const order_id = results.insertId;

            // Insert order items
            const insertOrderItemsQuery = 'INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES ?';
            const orderItems = items.map(item => [order_id, item.product_id, item.quantity, item.price]);
            connection.query(insertOrderItemsQuery, [orderItems], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error inserting order items:', err);
                        res.status(500).send('Error placing order');
                    });
                }
                connection.commit(err => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).send('Error placing order');
                        });
                    }
                    res.status(201).send('Order placed successfully');
                });
            });
        });
    });
});

// Route to cancel an order
app.put('/orders/:order_id/cancel', authenticateToken, (req, res) => {
    const { order_id } = req.params;
    const user_id = req.user.user_id;

    // Query to check the current status of the order
    const checkStatusQuery = 'SELECT status FROM Orders WHERE order_id = ? AND user_id = ?';
    connection.query(checkStatusQuery, [order_id, user_id], (err, results) => {
        if (err) {
            console.error('Error checking order status:', err);
            return res.status(500).send('Error checking order status');
        }

        if (results.length === 0) {
            return res.status(404).send('Order not found');
        }

        const orderStatus = results[0].status;

        if (orderStatus !== 'pending') {
            return res.status(400).send('Only pending orders can be canceled');
        }

        // Query to update the status to 'canceled'
        const cancelOrderQuery = 'UPDATE Orders SET status = ? WHERE order_id = ? AND user_id = ?';
        connection.query(cancelOrderQuery, ['cancelled', order_id, user_id], (err) => {
            if (err) {
                console.error('Error canceling order:', err);
                return res.status(500).send('Error canceling order');
            }

            res.status(200).send('Order cancelled successfully');
        });
    });
});

app.put('/orders/:orderId/status', authenticateToken, async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body; // Expecting status in the request body

    // Validating the status
    const validStatuses = ['Pending', 'Shipped', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    // Update the order status in the database
    const query = 'UPDATE Orders SET status = ? WHERE order_id = ?';
    connection.query(query, [status, orderId], (err, results)=> {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).send('Error updating order status');
        }
        res.status(200).json({ message: 'Order status updated successfully' });
    });
});

app.get('/allorders', authenticateToken, (req, res) => {

    // First query to get the cart items
    const query = 'SELECT * FROM Orders';
    connection.query(query, (err, orderResults) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).send('Error fetching orders');
        }

        console.log('Order results:', orderResults);

        // Extract user_ids from cartResults
        const userIds = orderResults.map(item => item.user_id);

        // Second query to get product details
        const query1 = 'SELECT * FROM Users WHERE user_id IN (?)';
        connection.query(query1, [userIds], (err, userResults) => {
            if (err) {
                console.error('Error fetching user details:', err);
                return res.status(500).send('Error fetching user details');
            }

            // Merge cart items with product details
            const orderWithUserDetails = orderResults.map(orderItem => {
                const user = userResults.find(user => user.user_id === orderItem.user_id);
                return {
                    ...orderItem,
                    user_username: user.username,
                };
            });

            console.log('Order with product details:', orderWithUserDetails);
            res.json(orderWithUserDetails);
        });
    });
});

// Route to register a new user
app.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if the user already exists
      const checkUserQuery = 'SELECT * FROM Users WHERE email = ?';
      connection.query(checkUserQuery, [email], (err, results) => {
        if (err) {
          console.error('Error checking user:', err);
          return res.status(500).send('Error checking user');
        }
  
        if (results.length > 0) {
          return res.status(400).send('User already exists');
        }
  
        const query = `
          INSERT INTO Users (username, email, password, role, created_at) 
          VALUES (?, ?, ?, ?, NOW())`;
          
        connection.query(query, [username, email, hashedPassword, role], (err, results) => {
          if (err) {
            console.error('Error registering user:', err);
            return res.status(500).send('Error registering user');
          }
  
          const user_id = results.insertId;
          res.status(201).json({ message: 'User registered successfully', user_id });
        });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).send('Error registering user');
    }
}); 

// Route to login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Error logging in');
        }
        if (results.length === 0) return res.status(400).send('Invalid credentials');

        const user = results[0];
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.status(500).send('Error logging in');
            if (!match) return res.status(400).send('Invalid credentials');

            const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user });
        });
    });
});

app.put('/change-password', authenticateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user_id = req.user.user_id;
    
    // Query to fetch the current hashed password from the database
    const query = 'SELECT password FROM Users WHERE user_id = ?';
    
    connection.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching password:', err);
            return res.status(500).send('Error fetching password');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0];

        // Compare the old password with the stored hashed password
        bcrypt.compare(oldPassword, user.password, (err, match) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error comparing passwords');
            }

            if (!match) {
                return res.status(400).send('Incorrect password');
            }

            // Hash the new password
            bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing new password:', err);
                    return res.status(500).send('Error hashing new password');
                }

                // Query to update the password in the database
                const updateQuery = 'UPDATE Users SET password = ? WHERE user_id = ?';
                connection.query(updateQuery, [hashedPassword, user_id], (err) => {
                    if (err) {
                        console.error('Error updating password:', err);
                        return res.status(500).send('Error updating password');
                    }

                    return res.status(200).send('Password updated successfully');
                });
            });
        });
    });
});

// Route to get order history
app.get('/orders', authenticateToken, (req, res) => {
    const user_id = req.user.user_id;
    const queryOrders = 'SELECT * FROM Orders WHERE user_id = ?';

    connection.query(queryOrders, [user_id], (err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).send('Error fetching orders');
        }

        if (orders.length === 0) {
            return res.json([]); // No orders found for the user
        }

        // Fetch the products for each order
        const orderIds = orders.map(order => order.order_id);
        const queryOrderItems = 'SELECT * FROM OrderItems WHERE order_id IN (?)';

        connection.query(queryOrderItems, [orderIds], (err, orderItems) => {
            if (err) {
                console.error('Error fetching order items:', err);
                return res.status(500).send('Error fetching order items');
            }

            if (orderItems.length === 0) {
                // If there are no order items, return the orders with empty items array
                const ordersWithItems = orders.map(order => ({
                    ...order,
                    items: []
                }));
                return res.json(ordersWithItems);
            }

            // Fetch product details for all the order items
            const productIds = orderItems.map(item => item.product_id);
            const queryProducts = 'SELECT * FROM Products WHERE product_id IN (?)';

            connection.query(queryProducts, [productIds], (err, products) => {
                if (err) {
                    console.error('Error fetching products:', err);
                    return res.status(500).send('Error fetching products');
                }

                // Map order items to their respective orders with product details
                const ordersWithItems = orders.map(order => ({
                    ...order,
                    items: orderItems
                        .filter(item => item.order_id === order.order_id)
                        .map(item => ({
                            ...item,
                            product: products.find(product => product.product_id === item.product_id)
                        }))
                }));

                res.json(ordersWithItems);
            });
        });
    });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
