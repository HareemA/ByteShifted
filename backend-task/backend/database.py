import psycopg2

PRODUCTS_TABLE = """
CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    number VARCHAR(50) UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    sales_price NUMERIC(10,2),
    cost_price NUMERIC(10,2),
    stock_quantity INTEGER,
    currency VARCHAR(10),
    unit VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
"""

PRODUCT_DIMENSIONS_TABLE = """
CREATE TABLE IF NOT EXISTS product_dimensions (
    id SERIAL PRIMARY KEY,
    product_number VARCHAR(50) UNIQUE REFERENCES products(number) ON DELETE CASCADE,
    weight NUMERIC(10,2),
    weight_unit VARCHAR(10),
    height NUMERIC(10,2),
    width NUMERIC(10,2),
    depth NUMERIC(10,2),
    size_unit VARCHAR(10)
);
"""

PRODUCT_PICTURES_TABLE = """
CREATE TABLE IF NOT EXISTS product_pictures (
    id SERIAL PRIMARY KEY,
    product_number VARCHAR(50) UNIQUE REFERENCES products(number) ON DELETE CASCADE,
    thumb TEXT,
    display TEXT,
    large TEXT,
    original TEXT
);
"""

def create_tables(db_connect):
    conn = db_connect
    cur = conn.cursor()
    cur.execute(PRODUCTS_TABLE)
    cur.execute(PRODUCT_DIMENSIONS_TABLE)
    cur.execute(PRODUCT_PICTURES_TABLE)
    conn.commit()
    cur.close()
    conn.close()
    print("Tables created if they didnt exist already.")
