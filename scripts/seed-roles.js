const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.cfyadadozdwgjkpspiyi:HEjJarwsEuOeyj8w@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  try {
    // Insert default roles
    await pool.query(`
      INSERT INTO roles (id, name, created_at)
      VALUES (1, 'admin', NOW()), (2, 'member', NOW())
      ON CONFLICT (id) DO NOTHING
    `);
    console.log('✅ Roles seeded successfully');

    const result = await pool.query('SELECT * FROM roles');
    console.log('Roles:', result.rows);
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await pool.end();
  }
}

seed();
