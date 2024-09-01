# Ecommerce
It is an Ecommerce store. This store is managing its products, user interactions, and backend processes effectively. 
It can be used both by customers and vendors. 
The customers can view products(added by vendors), add them to their cart, place an order etc.
The vendors can view products, add products, update products(like name, description, price, category, image etc.), delete products, manage orders by changing their status to pending, shipped, completed, cancelled etc

User can also change their password by clicking on the avatar.

There is a Search button and products are filtered by categories


### Payment Gateway Integration
Note: A payment gateway has not been integrated into this application. This decision was made due to the requirement of sharing sensitive bank account details, which I am not comfortable providing to payment gateways.

If the role or job requirements necessitate the inclusion of a payment gateway, I am prepared to implement it and will address this integration accordingly.


### Uploading Product Images
I have used image_url in Users table in MySql which stores the url of the image of a product. Therefore, while adding the product, vendors have to add image_url to upload product image. 

I could have also used file upload mechanism to upload product image but that would require a lot of changes in the configuration from your side. 

If the role or job requirements necessitate the inclusion of a payment gateway, I am prepared to implement it and will address this integration accordingly.

### Step-1
Clone the repository and open in VS code.
 - `git clone git@github.com:code77withHimanshu/Ecommerce.git`

Note: In order to access the `db.sql` file, import it in MySql Workbench. Then use the database `Ecommerce` to see all the tables.

### Step-2
Go to the backend folder and open .env file.
You can change the .env file according to your configuration.
Note: If you are using mysql port 3306(default port) then change the following .env file accordingly.

backend/.env
```markdown
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=tiger
DB_NAME=Ecommerce
PORT=5000
JWT_SECRET="Cron!#@$afxw"
```


### Step-3
Open the terminal and write the following commands

- `cd .\backend\`
- `npm install`
- `node server.js`

This will run the server on the local and you will see MySQL Connected...


### Step-4
Open another terminal and write the following commands

- `cd .\frontend\`
- `npm install`
- `npm start`

This will start the frontend on the local



### Step-5
Go to SignUp to create your own user(either a `Customer` or a `Vendor` by selecting the role) or Go to Login and access the dummy user i.e. 

For `Customers`:
Email: customer2@gmail.com
Password: 123


For `Vendors`:
Email: vendor2@gmail.com
Password: 123


Feel free to test all the features in the project. :)



It is meeting all the FrontEnd, BackEnd and Server-Side Logic Requirements as asked in the assignment. 


I have used `MySQL` for storing data. 

BackEnd Development with `Express.js`. 

Server-Side Logic with `Node.js`.

Frontend Development with `React.js`.
