CREATE TABLE categories (
  id TEXT PRIMARY KEY, icon TEXT NOT NULL, name TEXT NOT NULL
);
CREATE TABLE locations (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  description TEXT, tip TEXT, lat REAL NOT NULL, lng REAL NOT NULL,
  maps_url TEXT, transit TEXT, tags TEXT
);
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY, location_id INTEGER NOT NULL REFERENCES locations(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5), comment TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_locations_category ON locations(category_id);
