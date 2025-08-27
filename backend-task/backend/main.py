from flask import Flask, jsonify, request
import requests
import psycopg2
import os
from database import create_tables
import threading
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

load_dotenv()

RACKBEAT_API_KEY = os.getenv("RACKBEAT_API_KEY")

def get_db_connection():
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD")
        )
    except Exception as e:
        print(f"Database connection error: {e}")
        raise

def fetch_products_page(page=1, limit=20):
    try:
        headers = {"Authorization": f"Bearer {RACKBEAT_API_KEY}"}
        params = {"page": page, "limit": limit}
        response = requests.get(
            "https://app.rackbeat.com/api/products",
            headers=headers,
            params=params,
            timeout=15
        )

        if response.status_code not in [200, 206]:
            raise Exception(f"Rackbeat API failed: {response.status_code}")

        data = response.json()
        products = data.get("products", [])
        if not products:
            return 0

        conn = get_db_connection()
        cur = conn.cursor()

        for p in products:
            try:
                try:
                    cur.execute("""
                        INSERT INTO products (
                            number, name, description, sales_price, cost_price,
                            stock_quantity, currency, unit, created_at, updated_at
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (number) DO UPDATE SET
                            name = EXCLUDED.name,
                            description = EXCLUDED.description,
                            sales_price = EXCLUDED.sales_price,
                            cost_price = EXCLUDED.cost_price,
                            stock_quantity = EXCLUDED.stock_quantity,
                            currency = EXCLUDED.currency,
                            unit = EXCLUDED.unit,
                            updated_at = EXCLUDED.updated_at
                    """, (
                        p.get("number"),
                        p.get("name"),
                        p.get("description"),
                        p.get("sales_price"),
                        p.get("cost_price"),
                        p.get("stock_quantity"),
                        p.get("currency"),
                        p.get("unit"),
                        p.get("created_at"),
                        p.get("updated_at"),
                    ))
                    product_number = p.get("number") 
                except Exception as e:
                    print(f"[PRODUCT INSERT ERROR] Product {p.get('number')}: {e}")
                    conn.rollback()
                    continue  

                # Insert dimensions
                try:
                    dims = p.get("physical", {})
                    cur.execute("""
                        INSERT INTO product_dimensions (product_number, weight, weight_unit, height, width, depth, size_unit)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                         ON CONFLICT (product_number) DO UPDATE SET
                        weight = EXCLUDED.weight,
                        weight_unit = EXCLUDED.weight_unit,
                        height = EXCLUDED.height,
                        width = EXCLUDED.width,
                        depth = EXCLUDED.depth,
                        size_unit = EXCLUDED.size_unit
                    """, (
                        product_number,
                        dims.get("weight"),
                        dims.get("weight_unit"),
                        dims.get("height"),
                        dims.get("width"),
                        dims.get("depth"),
                        dims.get("size_unit"),
                    ))
                except Exception as e:
                    print(f"[DIMENSIONS INSERT ERROR] Product {product_number}: {e}")
                    conn.rollback()

                # Insert pictures
                try:
                    pics = p.get("pictures", {})
                    cur.execute("""
                    INSERT INTO product_pictures (
                        product_number, thumb, display, large, original
                    ) VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (product_number) DO UPDATE SET
                        thumb = EXCLUDED.thumb,
                        display = EXCLUDED.display,
                        large = EXCLUDED.large,
                        original = EXCLUDED.original
                """, (
                    product_number,
                    pics.get("thumb"),
                    pics.get("display"),
                    pics.get("large"),
                    pics.get("original"),
                ))
                except Exception as e:
                    print(f"[PICTURES INSERT ERROR] Product {product_number}: {e}")
                    conn.rollback()
            except Exception as e:
                print(f"Error inserting product {p.get('number')}: {e}")
                conn.rollback()
                continue

        conn.commit()
        return len(products)

    except requests.exceptions.RequestException as e:
        print(f"Network error fetching products: {e}")
        return 0
    except Exception as e:
        print(f"Unexpected error in fetch_products_page: {e}")
        return 0
    finally:
        try:
            if cur:
                cur.close()
            if conn:
                conn.close()
        except:
            pass

import math

def fetch_all_products(limit_per_page=20, total_limit=200):
    print("Starting background sync of products")
    total_pages = math.ceil(total_limit / limit_per_page)
    total_fetched = 0

    for page in range(1, total_pages + 1):
        batch_limit = limit_per_page
        if total_fetched + batch_limit > total_limit:
            batch_limit = total_limit - total_fetched

        try:
            count = fetch_products_page(page=page, limit=batch_limit)
            if count == 0:
                print(f"No products returned on page {page}, stopping.")
                break
            total_fetched += count
            print(f"Synced page {page}, {count} products")
        except Exception as e:
            print(f"Failed on page {page}: {e}")
            break

    print(f"Finished syncing {total_fetched} products.")

@app.route('/products', methods=['GET'])
def get_products():
    conn, cur = None, None
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        offset = (page - 1) * limit

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""SELECT number, name, sales_price, stock_quantity, description FROM products 
                       LIMIT %s OFFSET %s""", (limit, offset))
        rows = cur.fetchall()

        products = []
        for row in rows:
            products.append({
                "number": row[0],
                "name": row[1],
                "sales_price": float(row[2]),
                "stock_quantity": row[3],
                "description": row[4]
            })

        cur.execute("SELECT COUNT(*) FROM products")
        total_rows = cur.fetchone()[0]

        return jsonify({
            "page": page,
            "limit": limit,
            "products": products,
            "total": total_rows
        })

    except Exception as e:
        print(f"Error fetching products: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

@app.route('/product/<string:id>', methods=['GET'])
def get_product_by_id(id):
    conn, cur = None, None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""SELECT * FROM products WHERE number = %s""", (id,))
        row = cur.fetchone()

        if not row:
            return jsonify({"error": "Product not found"}), 404

        product = {
            "number": row[1],
            "name": row[2],
            "description": row[3],
            "sales_price": float(row[4]),
            "cost_price": row[5],
            "stock_quantity": row[6],
            "currency": row[7],
            "unit": row[8],
            "created_at": row[9],
            "updated_at": row[10],
        }

        cur.execute("""SELECT width, height, weight 
                       FROM product_dimensions 
                       WHERE product_number = %s""", (id,))
        dim = cur.fetchone()
        if dim:
            product["dimensions"] = {
               
                "width": dim[0],
                "height": dim[1],
                "weight": dim[2],
            }
        else:
            product["dimensions"] = None

        cur.execute("""SELECT display FROM product_pictures WHERE product_number = %s""", (id,))
        pics = cur.fetchall()
        product["pictures"] = pics[0] if pics else []

        return jsonify(product)

    except Exception as e:
        print(f"Error fetching product {id}: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    try:
        total = 15941
        limit_per_page = 20
        total_limit = 200
        create_tables(get_db_connection())
        threading.Thread(
            target=lambda: fetch_all_products(limit_per_page=limit_per_page, total_limit=total_limit),
            daemon=True
        ).start()
        app.run(debug=True)
    except Exception as e:
        print(f"Startup error: {e}")
