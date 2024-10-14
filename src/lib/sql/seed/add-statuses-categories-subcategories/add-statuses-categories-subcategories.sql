/*
  * NOTE: To run in Neon SQL editor, you MUST remove all comments
 */

-- Insert Statuses
INSERT INTO "Status" (id, name) VALUES
  (gen_random_uuid(), 'Open'),
  (gen_random_uuid(), 'Pending'),
  (gen_random_uuid(), 'Closed'),
  (gen_random_uuid(), 'Resolved');

-- Insert Categories
INSERT INTO "Category" (id, name) VALUES
  (gen_random_uuid(), 'Mobile Application Support'),
  (gen_random_uuid(), 'OS Support'),
  (gen_random_uuid(), 'Connections'),
  (gen_random_uuid(), 'Handheld Device Issue'),
  (gen_random_uuid(), 'Printer Issue'),
  (gen_random_uuid(), 'Depot Issue'),
  (gen_random_uuid(), 'VCAM'),
  (gen_random_uuid(), 'Middleware Support');

-- Retrieve Category IDs for SubCategory associations
WITH category_ids AS (
  SELECT id, name FROM "Category" WHERE name IN 
    ('Mobile Application Support', 'OS Support', 'Connections', 
    'Handheld Device Issue', 'Printer Issue', 'Depot Issue', 
    'VCAM', 'Middleware Support')
)
-- Insert SubCategories for each Category
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES
  -- SubCategories for Mobile Application Support
  (gen_random_uuid(), 'App Installation Issues', (SELECT id FROM category_ids WHERE name = 'Mobile Application Support')),
  (gen_random_uuid(), 'Login Problems', (SELECT id FROM category_ids WHERE name = 'Mobile Application Support')),
  (gen_random_uuid(), 'Crash Reports', (SELECT id FROM category_ids WHERE name = 'Mobile Application Support')),
  
  -- SubCategories for OS Support
  (gen_random_uuid(), 'Windows Update Issues', (SELECT id FROM category_ids WHERE name = 'OS Support')),
  (gen_random_uuid(), 'Mac OS Installation Problems', (SELECT id FROM category_ids WHERE name = 'OS Support')),
  (gen_random_uuid(), 'Linux Configuration Issues', (SELECT id FROM category_ids WHERE name = 'OS Support')),
  
  -- SubCategories for Connections
  (gen_random_uuid(), 'VPN Connection Problems', (SELECT id FROM category_ids WHERE name = 'Connections')),
  (gen_random_uuid(), 'Wi-Fi Connectivity', (SELECT id FROM category_ids WHERE name = 'Connections')),
  (gen_random_uuid(), 'Network Latency', (SELECT id FROM category_ids WHERE name = 'Connections')),
  
  -- SubCategories for Handheld Device Issue
  (gen_random_uuid(), 'Device Sync Problems', (SELECT id FROM category_ids WHERE name = 'Handheld Device Issue')),
  (gen_random_uuid(), 'Battery Drain Issues', (SELECT id FROM category_ids WHERE name = 'Handheld Device Issue')),
  (gen_random_uuid(), 'Touchscreen Malfunction', (SELECT id FROM category_ids WHERE name = 'Handheld Device Issue')),
  
  -- SubCategories for Printer Issue
  (gen_random_uuid(), 'Paper Jam', (SELECT id FROM category_ids WHERE name = 'Printer Issue')),
  (gen_random_uuid(), 'Driver Installation', (SELECT id FROM category_ids WHERE name = 'Printer Issue')),
  (gen_random_uuid(), 'Toner Issues', (SELECT id FROM category_ids WHERE name = 'Printer Issue')),
  
  -- SubCategories for Depot Issue
  (gen_random_uuid(), 'Depot Tracking Problems', (SELECT id FROM category_ids WHERE name = 'Depot Issue')),
  (gen_random_uuid(), 'Depot Inventory Issues', (SELECT id FROM category_ids WHERE name = 'Depot Issue')),
  (gen_random_uuid(), 'Depot Shipping Delays', (SELECT id FROM category_ids WHERE name = 'Depot Issue')),
  
  -- SubCategories for VCAM
  (gen_random_uuid(), 'VCAM Audio Issues', (SELECT id FROM category_ids WHERE name = 'VCAM')),
  (gen_random_uuid(), 'VCAM Connectivity Problems', (SELECT id FROM category_ids WHERE name = 'VCAM')),
  (gen_random_uuid(), 'VCAM Video Lag', (SELECT id FROM category_ids WHERE name = 'VCAM')),
  
  -- SubCategories for Middleware Support
  (gen_random_uuid(), 'API Authentication Problems', (SELECT id FROM category_ids WHERE name = 'Middleware Support')),
  (gen_random_uuid(), 'Service Timeout Issues', (SELECT id FROM category_ids WHERE name = 'Middleware Support')),
  (gen_random_uuid(), 'Message Queue Delays', (SELECT id FROM category_ids WHERE name = 'Middleware Support'));
